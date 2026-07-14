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

    if fitz is not None:
        try:
            doc = fitz.open(path)
            pages: List[str] = [p.get_text("text").strip() for p in doc]
            doc.close()
            if any(pages):  # at least one page has real text
                return pages
        except Exception:
            pass

    if pdfplumber is not None:
        try:
            with pdfplumber.open(path) as pdf:
                pages = [(p.extract_text() or "").strip() for p in pdf.pages]
            if any(pages):  # at least one page has real text
                return pages
        except Exception:
            pass

    # Both libraries are installed but the PDF has no extractable text
    # (e.g. a scanned image-only PDF). Return an informative message so
    # the user knows to use OCR instead of a plain upload.
    return [
        "This PDF appears to contain only scanned images with no embedded text. "
        "Please use the OCR upload endpoint or convert the PDF to a text-based format."
    ]
