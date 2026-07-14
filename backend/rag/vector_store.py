import faiss
import numpy as np
import json
from typing import List, Tuple
from pathlib import Path

from ..config import FAISS_INDEX_DIR
from ..services.embeddings import embed_texts

INDEX_PATH = Path(FAISS_INDEX_DIR)
INDEX_PATH.mkdir(parents=True, exist_ok=True)
INDEX_FILE = INDEX_PATH / 'index.faiss'
METADATA_FILE = INDEX_PATH / 'metadata.json'


def _load_metadata() -> List[dict]:
    if METADATA_FILE.exists():
        with METADATA_FILE.open('r', encoding='utf-8') as f:
            return json.load(f)
    return []


def _save_metadata(meta: List[dict]):
    with METADATA_FILE.open('w', encoding='utf-8') as f:
        json.dump(meta, f, ensure_ascii=False)


def index_documents(doc_id: str, chunks: List[dict]):
    """Index a list of chunks. Each chunk should be a dict with at least `text` and `page`."""
    texts = [c['text'] for c in chunks]
    embs = embed_texts(texts)
    dim = embs.shape[1]

    # load or create index
    if INDEX_FILE.exists():
        index = faiss.read_index(str(INDEX_FILE))
        # if dim mismatch, rebuild index (simple approach)
        if getattr(index, 'd', None) != dim:
            index = faiss.IndexFlatL2(dim)
    else:
        index = faiss.IndexFlatL2(dim)

    index.add(embs)
    faiss.write_index(index, str(INDEX_FILE))

    # append metadata
    meta = _load_metadata()
    start_id = len(meta)
    for i, c in enumerate(chunks):
        meta.append({
            'id': start_id + i,
            'doc_id': doc_id,
            'page': c.get('page'),
            'text': c.get('text')
        })
    _save_metadata(meta)


def search(query: str, k: int = 5) -> Tuple[List[dict], List[float]]:
    """Return list of metadata dicts and distances for the query."""
    if not INDEX_FILE.exists():
        return [], []
    q_emb = embed_texts([query])
    index = faiss.read_index(str(INDEX_FILE))
    D, I = index.search(q_emb, k)
    ids = I[0].tolist()
    dists = D[0].tolist()
    meta = _load_metadata()
    results = [meta[i] if i < len(meta) else {} for i in ids]
    return results, dists
