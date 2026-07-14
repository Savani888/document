import easyocr
from typing import List

reader = easyocr.Reader(['en'], gpu=False)


def ocr_image(path: str) -> str:
    """Basic OCR wrapper using EasyOCR."""
    result = reader.readtext(path, detail=0)
    return "\n".join(result)
