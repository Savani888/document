from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from fastapi.responses import JSONResponse
from pathlib import Path
from typing import Optional
import shutil

from backend.services.pdf_parser import extract_text_from_pdf
from backend.ocr.ocr import ocr_image
from backend.rag.vector_store import index_documents, search
from backend.utils.chunk import chunk_text
from backend.models.schemas import SummaryRequest, SummaryResponse
from backend.rag.qa import retrieve_context, answer_from_context
from backend.services.llm import summarize_document
from backend.services.insights import extract_insights

app = FastAPI(title="Document Intelligence API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("./storage")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get('/health')
async def health():
    return JSONResponse(content={'status': 'ok'})


@app.post('/upload')
async def upload(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    allowed_types = ("application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp")
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a PDF or image (PNG, JPG, WEBP)."
        )

    dest = UPLOAD_DIR / file.filename
    with dest.open('wb') as f:
        shutil.copyfileobj(file.file, f)

    if file.content_type == "application/pdf":
        pages = extract_text_from_pdf(str(dest))
        text = "\n\n".join(pages)
    else:
        text = ocr_image(str(dest))
        pages = [text]

    if not text.strip():
        raise HTTPException(status_code=422, detail="Could not extract any text from the file.")

    chunks = chunk_text(text)
    index_documents(file.filename, chunks)

    word_count = len(text.split())
    return {
        "filename": file.filename,
        "pages": len(pages),
        "word_count": word_count,
    }


@app.post('/summary', response_model=SummaryResponse)
async def summary(req: SummaryRequest = Body(...)):
    length = req.length
    top_k = req.top_k
    prompt = "summarize the entire document comprehensively"
    contexts = retrieve_context(prompt, k=top_k)
    metas = [c[0] for c in contexts]
    summary_text = summarize_document(length, metas)
    sources = [m.get('page') for m, _ in contexts if m and 'page' in m]
    return SummaryResponse(length=length, summary=summary_text, sources=list(dict.fromkeys(sources)))


@app.get('/insights')
async def insights_endpoint():
    """Return word count, reading time, and top words from the indexed document content."""
    from backend.rag.vector_store import _load_metadata

    meta = _load_metadata()
    if not meta:
        return JSONResponse(content={
            "word_count": 0,
            "reading_time_min": 0,
            "top_words": [],
            "message": "No document indexed yet. Upload a document first."
        })

    texts = [m.get('text', '') for m in meta if m.get('text')]
    result = extract_insights(texts)
    return JSONResponse(content=result)


@app.get('/improvements')
async def improvements(doc_id: Optional[str] = None):
    """Return improvement suggestions based on the indexed document content."""
    from backend.rag.vector_store import _load_metadata
    from backend.services.llm import _get_response, _build_context

    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]

    if not meta:
        return JSONResponse(content={"suggestions": [], "message": "No document indexed yet. Upload a document first."})

    context_text = _build_context(meta[:20])
    prompt = (
        "You are a professional writing and content coach. Analyze the document excerpt below and provide "
        "5 to 8 specific, actionable improvement suggestions. Focus on: clarity, structure, completeness, "
        "grammar, tone, and any missing information. Format each suggestion as a numbered point with a short "
        "bold title followed by a concise explanation.\n\n"
        f"Document excerpt:\n{context_text}\n\nImprovement Suggestions:"
    )
    result = _get_response(prompt, max_output_tokens=800)
    if not result:
        return JSONResponse(content={"suggestions": [], "message": "Could not generate suggestions. Check your Gemini API key."})

    lines = [l.strip() for l in result.strip().split('\n') if l.strip()]
    return JSONResponse(content={"suggestions": lines})


@app.post('/chat')
async def chat(query: str = Body(..., embed=True), top_k: int = Body(5, embed=True)):
    """Answer a question about the uploaded document."""
    contexts = retrieve_context(query, k=top_k)
    metas = [c[0] for c in contexts]
    answer = answer_from_context(query, metas)
    sources = [m.get('page') for m, _ in contexts if m and 'page' in m]
    return {"answer": answer, "sources": list(dict.fromkeys(sources))}


@app.get('/documents')
async def documents():
    from backend.rag.vector_store import _load_metadata
    meta = _load_metadata()
    docs = {}
    for item in meta:
        doc_id = item.get('doc_id')
        if not doc_id:
            continue
        docs.setdefault(doc_id, {'doc_id': doc_id, 'chunk_count': 0, 'pages': set()})
        docs[doc_id]['chunk_count'] += 1
        page = item.get('page')
        if page is not None:
            docs[doc_id]['pages'].add(page)

    return JSONResponse(content=[
        {'doc_id': d['doc_id'], 'chunk_count': d['chunk_count'], 'pages': sorted(list(d['pages']))}
        for d in docs.values()
    ])
