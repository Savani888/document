import fitz
import pdfplumber
from typing import List


def extract_text_from_pdf(path: str) -> List[str]:
    """Extract text per page. Tries PyMuPDF then falls back to pdfplumber."""
    pages = []
    try:
        doc = fitz.open(path)
        for p in doc:
            txt = p.get_text("text")
            pages.append(txt.strip())
        if pages:
            return pages
    except Exception:
        pass

    # fallback
    try:
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                pages.append(p.extract_text() or "")
    except Exception:
        pass
    return pages
