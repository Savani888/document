from typing import List, Dict
import re


def extract_timeline(texts: List[str]) -> List[Dict]:
    events = []
    date_re = re.compile(r'\b(\d{4}|\d{1,2}/\d{1,2}/\d{2,4})\b')
    for t in texts:
        lines = t.split('\n')
        for l in lines:
            if date_re.search(l):
                events.append({'text': l.strip(), 'date': date_re.search(l).group(0)})
    # sort by date string (best-effort)
    return sorted(events, key=lambda e: e.get('date'))
