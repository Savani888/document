from typing import List


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[dict]:
    """Simple whitespace-based chunker that returns dicts with text and metadata."""
    words = text.split()
    chunks = []
    i = 0
    page = 1
    while i < len(words):
        chunk_words = words[i:i+chunk_size]
        chunk_text = " ".join(chunk_words)
        chunks.append({"text": chunk_text, "page": page})
        i += chunk_size - overlap
        page += 1
    return chunks
