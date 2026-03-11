# Plantarea

Marketplace connecting plant nurseries (viveros) with buyers in Chile.

## Quick Start

### Backend

```bash
cd backend
poetry install
poetry run uvicorn plantarea.main:app --reload
```

API available at http://localhost:8000. Docs at http://localhost:8000/docs.

The database is auto-created and seeded on first startup.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at http://localhost:5173. API requests are proxied to the backend.

## Architecture

- **Frontend**: React + TypeScript + Vite, Tailwind v4, shadcn/ui, TanStack Query
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy, SQLite

## Structure

```
plantarea/
  frontend/         # React SPA
    src/
      components/   # UI components (ui/, layout/, storefront/, vivero/, admin/)
      pages/        # Route pages (storefront/, vivero/, admin/)
      hooks/        # Custom React hooks
      lib/          # API client, utilities
      types/        # TypeScript interfaces
  backend/          # FastAPI API
    src/plantarea/
      api/          # Route handlers
      models/       # SQLAlchemy models
      schemas/      # Pydantic schemas
      config/       # YAML config loader
      seed/         # Seed data
```
