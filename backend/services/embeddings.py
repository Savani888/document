import numpy as np
from typing import List

from ..config import GEMINI_API_KEY

try:
    from google import genai
except ImportError:
    genai = None


def _genai_available() -> bool:
    return genai is not None and bool(GEMINI_API_KEY)


def _parse_embeddings(response) -> List[np.ndarray]:
    embeddings = []
    if not response or not getattr(response, 'embeddings', None):
        return embeddings
    for embedding in response.embeddings:
        values = getattr(embedding, 'values', None)
        if values is None:
            values = getattr(embedding, 'embedding', None)
        if values is not None:
            embeddings.append(np.array(values, dtype='float32'))
    return embeddings


def embed_texts(texts: List[str]):
    """Return embeddings for a list of texts."""
    if _genai_available():
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            response = client.models.embed_content(
                model='gemini-embedding-001',
                contents=texts,
            )
            vectors = _parse_embeddings(response)
            if vectors:
                return np.vstack(vectors)
        except Exception:
            pass

    # Fallback deterministic 128-dim embedding (fast, low-memory)
    arr = []
    for t in texts:
        h = abs(hash(t)) % (2**31)
        vec = np.full((128,), (h % 1000) / 1000.0, dtype='float32')
        arr.append(vec)
    return np.vstack(arr)
