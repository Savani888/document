from typing import List, Dict
import re
from collections import Counter


def extract_insights(texts: List[str]) -> Dict:
    full = '\n'.join(texts)
    words = re.findall(r"\b\w{3,}\b", full.lower())
    common = Counter(words).most_common(20)
    word_counts = [{'word': w, 'count': c} for w, c in common]
    reading_time_min = max(1, int(len(words) / 200))
    return {
        'word_count': len(words),
        'reading_time_min': reading_time_min,
        'top_words': word_counts
    }
