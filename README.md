# NotebookLM-inspired Document Intelligence Assistant\n\nThis repository contains a starter scaffold for a document intelligence application (frontend + backend).\n\n## Structure\n- `backend/` - FastAPI backend with OCR, PDF parsing, FAISS vector store scaffold\n- `frontend/` - Next.js (App Router) TypeScript frontend scaffold\n\n## Quickstart\nBackend:\n```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```
Frontend:\n```bash
cd frontend
npm install
npm run dev
```
\n## Environment Variables\n- `GEMINI_API_KEY` - API key for Gemini models/embeddings\n- `FAISS_INDEX_DIR` - optional path for faiss index\n- `STORAGE_DIR` - where uploads are saved\n- `NEXT_PUBLIC_API_URL` - set in frontend to point to backend (e.g., http://localhost:8000)\n\n## Notes\nThis scaffold focuses on modularity and is intentionally minimal. Replace placeholder embedding and LLM calls with your preferred integration (Gemini Embeddings + Gemini Flash for LLM responses) and add authentication, persistence, and production hardening before deploying.\n