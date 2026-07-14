from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
from services.pdf_parser import extract_text_from_pdf
from ocr.ocr import ocr_image
from rag.vector_store import index_documents, search
from utils.chunk import chunk_text
from models.schemas import ChatRequest, ChatResponse, SummaryRequest, SummaryResponse
from rag.qa import retrieve_context, answer_from_context
from fastapi import Body
from fastapi.responses import JSONResponse
from services.flashcards import generate_flashcards
from services.quiz import generate_quiz
from services.timeline import extract_timeline
from services.insights import extract_insights
from typing import Optional

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

@app.post('/upload')
async def upload(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    dest = UPLOAD_DIR / file.filename
    with dest.open('wb') as f:
        shutil.copyfileobj(file.file, f)

    # Basic file handling: PDF or image
    if file.content_type in ("application/pdf",):
        pages = extract_text_from_pdf(str(dest))
        text = "\n\n".join(pages)
    elif file.content_type.startswith("image/"):
        text = ocr_image(str(dest))
        pages = [text]
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Chunk and index
    chunks = chunk_text(text)
    index_documents(file.filename, chunks)

    return {"filename": file.filename, "pages": len(pages)}


@app.post('/chat', response_model=ChatResponse)
async def chat(body: ChatRequest):
    query = body.query
    top_k = body.top_k or 5
    contexts = retrieve_context(query, k=top_k)
    # contexts is list of (meta_dict, distance)
    metas = [c[0] for c in contexts]
    answer = answer_from_context(query, metas)
    sources = []
    for m, d in contexts:
        if m and 'page' in m:
            sources.append(m.get('page'))
    return ChatResponse(answer=answer, sources=list(dict.fromkeys(sources)))


@app.post('/summary', response_model=SummaryResponse)
async def summary(req: SummaryRequest = Body(...)):
    # For now, create a summary by retrieving top chunks for a generic prompt
    length = req.length
    top_k = req.top_k
    # Use a simple default prompt for summarization retrieval
    prompt = "summarize the document"
    contexts = retrieve_context(prompt, k=top_k)
    metas = [c[0] for c in contexts]
    summary_text = answer_from_context(prompt, metas)
    sources = [m.get('page') for m, _ in contexts if m and 'page' in m]
    return SummaryResponse(length=length, summary=summary_text, sources=list(dict.fromkeys(sources)))


@app.get('/metadata')
async def metadata(doc_id: Optional[str] = None):
    # Return stored metadata entries; optional filtering by doc_id
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]
    return JSONResponse(content=meta)


@app.get('/flashcards')
async def flashcards(doc_id: Optional[str] = None, top_k: int = 20):
    # Generate flashcards from top chunks
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]
    texts = [m.get('text','') for m in meta][:top_k]
    cards = generate_flashcards(texts)
    return JSONResponse(content=cards)


@app.get('/quiz')
async def quiz(doc_id: Optional[str] = None, count: int = 5):
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]
    texts = [m.get('text','') for m in meta]
    quiz = generate_quiz(texts, count=count)
    return JSONResponse(content=quiz)


@app.get('/timeline')
async def timeline(doc_id: Optional[str] = None):
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]
    texts = [m.get('text','') for m in meta]
    events = extract_timeline(texts)
    return JSONResponse(content=events)


@app.get('/insights')
async def insights(doc_id: Optional[str] = None):
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    if doc_id:
        meta = [m for m in meta if m.get('doc_id') == doc_id]
    texts = [m.get('text','') for m in meta]
    data = extract_insights(texts)
    return JSONResponse(content=data)


@app.post('/export')
async def export(format: str = Body('md')):
    # Export last indexed document summary as markdown or txt
    from rag.vector_store import _load_metadata
    meta = _load_metadata()
    texts = [m.get('text','') for m in meta]
    content = "\n\n".join(texts[:50])
    if format == 'txt':
        return JSONResponse(content={'format':'txt','content':content})
    # default markdown
    md = f"# Exported Document\n\n{content}"
    return JSONResponse(content={'format':'md','content':md})
