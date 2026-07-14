from pydantic import BaseModel
from typing import List, Optional

class UploadResponse(BaseModel):
    filename: str
    pages: int

class ChatRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class ChatResponse(BaseModel):
    answer: str
    sources: List[int]


class SummaryRequest(BaseModel):
    length: str = "short"  # short|medium|long
    top_k: int = 8


class SummaryResponse(BaseModel):
    length: str
    summary: str
    sources: List[int]
