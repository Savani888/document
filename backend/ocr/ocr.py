from __future__ import annotations

import os
from typing import Optional

# Optional deps
try:
    import easyocr  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    easyocr = None

try:
    import pytesseract  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    pytesseract = None

try:
    from PIL import Image, ImageOps  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    Image = None
    ImageOps = None


def _init_easyocr_reader():
    """Initialize EasyOCR only when explicitly enabled.

    This prevents expensive first-request model init/download during interactive uploads.
    """

    if easyocr is None:
        return None

    if os.environ.get("ENABLE_EASYOCR", "").lower() not in {"1", "true", "yes", "on"}:
        return None

    try:
        return easyocr.Reader(["en"], gpu=False)
    except Exception:
        return None


_reader = _init_easyocr_reader()


def _fast_preprocess(img):
    """Aggressive preprocessing aimed at speed.

    Trade-off: lower accuracy/recall in exchange for much faster OCR.
    """

    # Hard downscale by longest edge
    max_side = int(os.environ.get("OCR_FAST_MAX_SIDE", "1200"))
    w, h = img.size
    if max(w, h) > max_side:
        scale = max_side / float(max(w, h))
        img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))))

    # Grayscale + normalize contrast
    if ImageOps is not None:
        img = ImageOps.grayscale(img)
        img = ImageOps.autocontrast(img)
    else:
        img = img.convert("L")

    # Quick threshold binarization
    thresh = int(os.environ.get("OCR_FAST_THRESH", "180"))
    img = img.point(lambda p: 255 if p > thresh else 0)

    return img


def ocr_image(path: str, *, fast: bool = True) -> str:
    """OCR image text extraction.

    FAST mode (default):
      - pytesseract + aggressive preprocessing
      - easyocr is optional behind ENABLE_EASYOCR

    NON-fast:
      - easyocr (if enabled)
      - then pytesseract (no aggressive preprocessing)

    Returns a string (may be empty). Caller decides whether to treat empty text as an error.
    """

    if pytesseract is None or Image is None:
        return (
            "OCR is unavailable in this environment. Install either easyocr OR "
            "pytesseract + Pillow (and ensure the Tesseract binary is installed)."
        )

    # 1) Fast path -> always try pytesseract first (usually faster + no DL model warmup)
    try:
        with Image.open(path) as raw:
            if fast:
                img = _fast_preprocess(raw)
            else:
                img = raw

            config = os.environ.get("OCR_TESSERACT_CONFIG", "--psm 6")
            text = pytesseract.image_to_string(img, config=config)
            cleaned = (text or "").strip()
            if cleaned:
                return cleaned
    except Exception:
        pass

    # 2) Optional EasyOCR fallback
    if _reader is not None:
        try:
            result = _reader.readtext(path, detail=0)
            return "\n".join([r for r in result if str(r).strip()])
        except Exception:
            pass

    return ""

