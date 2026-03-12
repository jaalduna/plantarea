# Plantarea — Guia de Instalacion (macOS)

## Requisitos previos

- **macOS** 12+ (Monterey o superior)
- **Homebrew** — gestor de paquetes para macOS
- Conexion a internet (para descargar dependencias)

## Instalacion rapida (automatica)

```bash
chmod +x setup.sh
./setup.sh
```

El script instala todo lo necesario, levanta backend y frontend, y abre el navegador.

## Instalacion manual (paso a paso)

### 1. Instalar herramientas base

```bash
# Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python 3.11+ y Node.js 20+
brew install python@3.11 node

# Poetry (gestor de dependencias Python)
brew install poetry
```

### 2. Backend (FastAPI + SQLite)

```bash
cd plantarea/backend

# Crear entorno virtual e instalar dependencias
poetry install

# Ejecutar el servidor (puerto 8000)
poetry run uvicorn plantarea.main:app --host 0.0.0.0 --port 8000 --reload
```

Verificar que funciona:
```bash
curl http://localhost:8000/health
# Respuesta esperada: {"status":"ok","service":"plantarea"}
```

### 3. Frontend (React + Vite)

En otra terminal:

```bash
cd plantarea/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (puerto 5173)
npm run dev
```

### 4. Abrir la aplicacion

- **Storefront (compradores)**: http://localhost:5173
- **Panel vivero**: http://localhost:5173/vivero
- **Panel admin**: http://localhost:5173/admin
- **API docs**: http://localhost:8000/docs

## Estructura del proyecto

```
plantarea/
├── backend/                  # FastAPI + SQLAlchemy + SQLite
│   ├── src/plantarea/
│   │   ├── api/              # Endpoints REST
│   │   ├── models/           # Modelos SQLAlchemy + DB
│   │   ├── schemas/          # Schemas Pydantic
│   │   ├── config/           # Configuracion (config.yaml)
│   │   ├── seed/             # Datos de prueba
│   │   └── main.py           # Entry point FastAPI
│   ├── config.yaml           # Configuracion del servidor
│   └── pyproject.toml        # Dependencias Python
│
├── frontend/                 # React + TypeScript + Vite + Tailwind + shadcn/ui
│   ├── src/
│   │   ├── components/       # Componentes UI (storefront, vivero, admin)
│   │   ├── pages/            # Paginas por seccion
│   │   ├── hooks/            # Custom hooks (React Query)
│   │   ├── types/            # TypeScript types
│   │   └── lib/              # Utilidades y API client
│   └── package.json          # Dependencias Node.js
│
└── specs/                    # PRD y documentacion de producto
```

## Notas

- El backend usa **SQLite** con datos de prueba pre-cargados (viveros, plantas, pedidos).
- El frontend hace proxy de `/api` al backend via Vite — no necesitas configurar CORS manualmente.
- La base de datos se crea automaticamente en `plantarea/backend/plantarea.db` al iniciar el servidor.

## Solucion de problemas

| Problema | Solucion |
|----------|---------|
| `python3.11: command not found` | `brew install python@3.11` y reiniciar terminal |
| `poetry: command not found` | `brew install poetry` o `pipx install poetry` |
| `npm: command not found` | `brew install node` |
| Puerto 8000 ocupado | `lsof -i :8000` para ver que lo usa, o cambiar puerto en `config.yaml` |
| Puerto 5173 ocupado | Vite usa el siguiente disponible automaticamente |
| Error CORS | Verifica que backend corre en :8000 y frontend en :5173 |
