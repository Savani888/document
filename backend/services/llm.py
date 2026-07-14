from typing import List

from ..config import GEMINI_API_KEY

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None


def _genai_available() -> bool:
    return genai is not None and bool(GEMINI_API_KEY)


def _create_client():
    return genai.Client(api_key=GEMINI_API_KEY)


def _parse_response(response) -> str:
    if not response:
        return ''
    if getattr(response, 'text', None):
        return response.text
    if getattr(response, 'candidates', None):
        for candidate in response.candidates:
            content = getattr(candidate, 'content', None)
            if not content:
                continue
            if isinstance(content, list):
                parts = []
                for item in content:
                    text = getattr(item, 'text', None)
                    if text:
                        parts.append(text)
                if parts:
                    return ''.join(parts)
            text_attr = getattr(content, 'text', None)
            if text_attr:
                return text_attr
    return ''


def _get_response(prompt: str, max_output_tokens: int = 700) -> str:
    if not _genai_available():
        return ''
    try:
        client = _create_client()
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                maxOutputTokens=max_output_tokens,
            ),
        )
        return _parse_response(response)
    except Exception:
        return ''


def _build_context(contexts: List[dict]) -> str:
    segments = []
    for c in contexts:
        if not c:
            continue
        page = c.get('page', 'Unknown')
        text = c.get('text', '').strip()
        if not text:
            continue
        segments.append(f'Page {page}: {text}')
    return '\n\n'.join(segments)


def answer_query(query: str, contexts: List[dict]) -> str:
    context_text = _build_context(contexts)
    if not context_text:
        return "I couldn't find this information in the uploaded document."
    prompt = (
        "You are a document assistant. Use only the information provided in the context below to answer the user's question. "
        "If the answer is not contained in the context, say 'I couldn't find this information in the uploaded document.' Do not hallucinate. "
        "Cite the page numbers when relevant in brackets, like [Page 4].\n\n"
        f"Context:\n{context_text}\n\n"
        f"Question: {query}\n\nAnswer:"
    )
    response = _get_response(prompt, max_output_tokens=700)
    return response.strip() or "I couldn't find this information in the uploaded document."


def summarize_document(length: str, contexts: List[dict]) -> str:
    context_text = _build_context(contexts)
    if not context_text:
        return "I couldn't find enough document text to summarize."
    brief = {
        'short': 'brief',
        'medium': 'balanced',
        'long': 'detailed'
    }.get(length, 'balanced')
    prompt = (
        "You are a document analyst. Summarize the document using only the context below. "
        "Provide an Overview, Key Takeaways, Important Facts, and Conclusion. "
        "Do not invent content beyond the provided text. If the context has fewer details, be honest about what is present. "
        f"Write a {brief} summary.\n\nContext:\n{context_text}\n\nSummary:"
    )
    response = _get_response(prompt, max_output_tokens=900)
    return response.strip() or "I couldn't find enough document text to summarize."
