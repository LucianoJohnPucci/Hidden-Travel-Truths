# Hidden Travel Truths

A monorepo for a modern travel insights app, featuring a Python FastAPI backend and a Node.js Next.js frontend. Ready for deployment on railway.app.

## Structure

- `backend/`: FastAPI backend (Python)
- `frontend/`: Next.js frontend (Node.js)

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## Deployment

This repository is ready for deployment on [railway.app](https://railway.app/). Configure your services for both backend and frontend. See their documentation for monorepo setups.

---
