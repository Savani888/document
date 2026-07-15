from typing import Optional

# Prefer EasyOCR (quality for many scan types), then fall back to Tesseract.
try:
    import easyocr  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    easyocr = None

try:
    import pytesseract  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    pytesseract = None

try:
    from PIL import Image  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    Image = None


_reader = None
if easyocr is not None:
    try:
        _reader = easyocr.Reader(["en"], gpu=False)
    except Exception:  # pragma: no cover - optional dependency
        _reader = None


def ocr_image(path: str) -> str:
    """OCR image text extraction.

    Order:
    1) EasyOCR (if installed)
    2) Tesseract via pytesseract + PIL (if installed)

    Returns a string. Caller decides whether to treat empty text as an error.
    """

    # 1) EasyOCR
    if _reader is not None:
        try:
            result = _reader.readtext(path, detail=0)
            return "\n".join([r for r in result if str(r).strip()])
        except Exception:
            pass

    # 2) Tesseract
    if pytesseract is not None and Image is not None:
        try:
            with Image.open(path) as img:
                text = pytesseract.image_to_string(img)
            return (text or "").strip()
        except Exception:
            pass

    return (
        "OCR is unavailable in this environment. Install either easyocr OR "
        "pytesseract + Pillow (and ensure the Tesseract binary is installed)."
    )

