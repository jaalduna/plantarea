#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Plantarea — Script de instalación
# Instala dependencias de backend (Poetry) y frontend (npm)
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Plantarea — Instalación ==="
echo ""

# --- Verificar prerequisitos ---
check_cmd() {
  if ! command -v "$1" &>/dev/null; then
    echo "ERROR: '$1' no está instalado. Instálalo antes de continuar."
    exit 1
  fi
}

check_cmd python3
check_cmd poetry
check_cmd node
check_cmd npm

echo "Prerequisitos OK: python3, poetry, node, npm"
echo ""

# --- Backend ---
echo "--- Instalando Backend (Poetry) ---"
cd "$SCRIPT_DIR/backend"
poetry install --no-interaction
echo "Backend instalado."
echo ""

# --- Frontend ---
echo "--- Instalando Frontend (npm) ---"
cd "$SCRIPT_DIR/frontend"
npm install
echo "Frontend instalado."
echo ""

echo "=== Instalación completa ==="
echo ""
echo "Para levantar la aplicación:"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd $(basename "$SCRIPT_DIR")/backend"
echo "    poetry run uvicorn plantarea.main:app --reload --port 8000"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd $(basename "$SCRIPT_DIR")/frontend"
echo "    npm run dev"
echo ""
echo "  Backend API:  http://localhost:8000"
echo "  Frontend:     http://localhost:5173"
echo "  API Docs:     http://localhost:8000/docs"
