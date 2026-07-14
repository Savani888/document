from typing import List, Tuple, Dict
from .vector_store import search
from ..services.llm import answer_query


def retrieve_context(query: str, k: int = 5) -> List[Tuple[dict, float]]:
    results, dists = search(query, k=k)
    return list(zip(results, dists))


def answer_from_context(query: str, contexts: List[Dict]) -> str:
    context_text = [c for c in contexts if c and c.get('text')]
    if not context_text:
        return "I couldn't find this information in the uploaded document."
    return answer_query(query, context_text)
