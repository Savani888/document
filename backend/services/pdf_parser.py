from typing import List

try:
    import fitz  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    fitz = None

try:
    import pdfplumber  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    pdfplumber = None


def extract_text_from_pdf(path: str) -> List[str]:
    """Extract text per page. Tries PyMuPDF, then pdfplumber, then a stub fallback."""
    pages: List[str] = []

    if fitz is not None:
        try:
            doc = fitz.open(path)
            for p in doc:
                txt = p.get_text("text")
                pages.append(txt.strip())
            if pages:
                return pages
        except Exception:
            pass

    if pdfplumber is not None:
        try:
            with pdfplumber.open(path) as pdf:
                for p in pdf.pages:
                    pages.append((p.extract_text() or "").strip())
            if pages:
                return pages
        except Exception:
            pass

    return ["PDF text could not be extracted in this environment. Install PyMuPDF/pdfplumber for full extraction."]
