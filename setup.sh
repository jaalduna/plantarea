#!/usr/bin/env bash
# =============================================================================
# Plantarea — Script de instalacion y ejecucion para macOS
# =============================================================================
set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() { echo -e "\n${BLUE}==>${NC} $1"; }
print_ok()   { echo -e "${GREEN}  ✓${NC} $1"; }
print_warn() { echo -e "${YELLOW}  !${NC} $1"; }
print_err()  { echo -e "${RED}  ✗${NC} $1"; }

# Directorio raiz del proyecto (donde esta este script)
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# ─────────────────────────────────────────────────────────────────────────────
# 1. Verificar / instalar prerequisitos
# ─────────────────────────────────────────────────────────────────────────────
print_step "Verificando prerequisitos..."

# Homebrew
if ! command -v brew &>/dev/null; then
    print_warn "Homebrew no encontrado. Instalando..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Agregar brew al PATH para Apple Silicon
    if [[ -f /opt/homebrew/bin/brew ]]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    print_ok "Homebrew instalado"
fi

# Python 3.11+
PYTHON_CMD=""
for cmd in python3.13 python3.12 python3.11 python3; do
    if command -v "$cmd" &>/dev/null; then
        py_version=$("$cmd" --version 2>&1 | grep -oE '[0-9]+\.[0-9]+')
        major=$(echo "$py_version" | cut -d. -f1)
        minor=$(echo "$py_version" | cut -d. -f2)
        if [[ "$major" -ge 3 && "$minor" -ge 11 ]]; then
            PYTHON_CMD="$cmd"
            break
        fi
    fi
done

if [[ -z "$PYTHON_CMD" ]]; then
    print_warn "Python 3.11+ no encontrado. Instalando..."
    brew install python@3.11
    PYTHON_CMD="python3.11"
else
    print_ok "Python: $($PYTHON_CMD --version)"
fi

# Node.js 20+
if ! command -v node &>/dev/null; then
    print_warn "Node.js no encontrado. Instalando..."
    brew install node
else
    node_major=$(node --version | grep -oE '^v[0-9]+' | tr -d 'v')
    if [[ "$node_major" -lt 20 ]]; then
        print_warn "Node.js $node_major detectado (requiere 20+). Actualizando..."
        brew upgrade node
    else
        print_ok "Node.js: $(node --version)"
    fi
fi

# Poetry
if ! command -v poetry &>/dev/null; then
    print_warn "Poetry no encontrado. Instalando..."
    brew install poetry
else
    print_ok "Poetry: $(poetry --version)"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 2. Instalar dependencias del backend
# ─────────────────────────────────────────────────────────────────────────────
print_step "Instalando dependencias del backend..."

cd "$BACKEND_DIR"
poetry install --no-interaction
print_ok "Backend listo"

# ─────────────────────────────────────────────────────────────────────────────
# 3. Instalar dependencias del frontend
# ─────────────────────────────────────────────────────────────────────────────
print_step "Instalando dependencias del frontend..."

cd "$FRONTEND_DIR"
npm install
print_ok "Frontend listo"

# ─────────────────────────────────────────────────────────────────────────────
# 4. Levantar backend y frontend
# ─────────────────────────────────────────────────────────────────────────────
print_step "Levantando servicios..."

# Función de limpieza al salir
cleanup() {
    echo ""
    print_step "Deteniendo servicios..."
    if [[ -n "${BACKEND_PID:-}" ]]; then
        kill "$BACKEND_PID" 2>/dev/null && print_ok "Backend detenido"
    fi
    if [[ -n "${FRONTEND_PID:-}" ]]; then
        kill "$FRONTEND_PID" 2>/dev/null && print_ok "Frontend detenido"
    fi
    exit 0
}
trap cleanup SIGINT SIGTERM

# Backend (FastAPI en puerto 8000)
cd "$BACKEND_DIR"
poetry run uvicorn plantarea.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
print_ok "Backend iniciado (PID: $BACKEND_PID, puerto 8000)"

# Esperar a que el backend responda
print_step "Esperando que el backend responda..."
for i in $(seq 1 15); do
    if curl -s http://localhost:8000/health &>/dev/null; then
        print_ok "Backend respondiendo en http://localhost:8000"
        break
    fi
    if [[ $i -eq 15 ]]; then
        print_err "Backend no respondió después de 15 segundos"
        print_warn "Revisa los logs arriba para ver el error"
        cleanup
    fi
    sleep 1
done

# Frontend (Vite en puerto 5173)
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!
print_ok "Frontend iniciado (PID: $FRONTEND_PID, puerto 5173)"

# Esperar un momento para que Vite inicie
sleep 3

# ─────────────────────────────────────────────────────────────────────────────
# 5. Abrir navegador
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Plantarea está corriendo${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Storefront:    ${BLUE}http://localhost:5173${NC}"
echo -e "  Panel Vivero:  ${BLUE}http://localhost:5173/vivero${NC}"
echo -e "  Panel Admin:   ${BLUE}http://localhost:5173/admin${NC}"
echo -e "  API Docs:      ${BLUE}http://localhost:8000/docs${NC}"
echo ""
echo -e "  Presiona ${YELLOW}Ctrl+C${NC} para detener todo."
echo ""

# Abrir navegador (macOS)
if command -v open &>/dev/null; then
    open "http://localhost:5173"
fi

# Mantener el script vivo
wait
