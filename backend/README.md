# Backend - Document Intelligence API

Minimal FastAPI backend scaffold.

## Endpoints
- POST `/upload` - form file upload
- GET `/metadata` - list indexed chunks and metadata
- GET `/flashcards` - generate flashcards from document
- GET `/quiz` - generate simple MCQ quiz
- GET `/timeline` - extract dated events
- GET `/insights` - basic insights (word counts, reading time)
- POST `/export` - export collected text as markdown or txt

## Env
- `GEMINI_API_KEY` - for embeddings/LM (placeholder)
- `FAISS_INDEX_DIR` - where to store FAISS index
- `STORAGE_DIR` - where to save uploaded files

Install: `pip install -r requirements.txt`
Run: `uvicorn backend.main:app --reload --port 8000`
