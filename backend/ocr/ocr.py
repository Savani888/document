from typing import List

try:
    import easyocr  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    easyocr = None

reader = None
if easyocr is not None:
    try:
        reader = easyocr.Reader(['en'], gpu=False)
    except Exception:  # pragma: no cover - optional dependency
        reader = None


def ocr_image(path: str) -> str:
    """Basic OCR wrapper using EasyOCR when available, otherwise a stub message."""
    if reader is None:
        return "OCR is unavailable in this environment. Install easyocr for image text extraction."

    result = reader.readtext(path, detail=0)
    return "\n".join(result)
