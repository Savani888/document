from typing import List, Dict
import random
import re


def _sentences(text: str):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()]


def generate_quiz(texts: List[str], count: int = 5) -> List[Dict]:
    sentences = []
    for t in texts:
        sentences.extend(_sentences(t))
    if not sentences:
        return []
    selected = random.sample(sentences, min(count, len(sentences)))
    quiz = []
    for s in selected:
        words = [w for w in s.split() if len(w) > 3]
        if not words:
            continue
        answer = random.choice(words)
        prompt = s.replace(answer, '_____')
        # generate options
        options = [answer]
        while len(options) < 4:
            opts = random.choice(words)
            if opts not in options:
                options.append(opts)
        random.shuffle(options)
        quiz.append({'question': prompt[:300], 'options': options, 'answer': answer})
    return quiz
