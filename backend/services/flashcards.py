from typing import List, Dict
import re


def _sentences_from_text(text: str):
    # crude sentence splitter
    parts = re.split(r'(?<=[.!?])\s+', text)
    return [p.strip() for p in parts if p.strip()]


def generate_flashcards(texts: List[str], max_cards: int = 20) -> List[Dict]:
    cards = []
    for t in texts:
        sents = _sentences_from_text(t)
        for s in sents:
            if len(cards) >= max_cards:
                return cards
            # use first clause as question and rest as answer (very naive)
            parts = s.split(',')
            if len(parts) >= 2:
                q = parts[0]
                a = ','.join(parts[1:]).strip()
            else:
                q = 'What is this sentence about?'
                a = s
            cards.append({'question': q[:200], 'answer': a[:1000]})
    return cards
