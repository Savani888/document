from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ENV_LOCATIONS = [
    BASE_DIR / '.env',
    BASE_DIR / 'api' / '.env',
    BASE_DIR.parent / '.env',
    BASE_DIR.parent / 'api' / '.env',
]
for env_path in ENV_LOCATIONS:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        break

STORAGE_DIR = Path(os.getenv('STORAGE_DIR', BASE_DIR / 'storage'))
FAISS_INDEX_DIR = Path(os.getenv('FAISS_INDEX_DIR', BASE_DIR / 'faiss_index'))
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

STORAGE_DIR.mkdir(parents=True, exist_ok=True)
FAISS_INDEX_DIR.mkdir(parents=True, exist_ok=True)
