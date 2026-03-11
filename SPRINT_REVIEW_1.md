# Sprint 1 Review - Plantarea Marketplace

**Date**: 2026-03-11
**Sprint Goal**: Crear mockup funcional del marketplace Plantarea
**Status**: completed

## Delivered

| Story | Description | Demo Notes |
|-------|-------------|------------|
| S1-001 | Arquitectura y scaffolding completo | Frontend (36 archivos) + Backend (16 archivos) |
| S1-004 | Home page con hero, productos y viveros destacados | http://localhost:5173/ |
| S1-005 | Catálogo con búsqueda y filtros por categoría | http://localhost:5173/catalogo |
| S1-006 | Ficha de producto con imagen, precio, stock, carrito | http://localhost:5173/producto/1 |
| S1-007 | Perfil de vivero con cover, productos y reseñas | http://localhost:5173/viveros/1 |
| S1-008 | Carrito multi-vivero con checkout | http://localhost:5173/carrito |
| S1-009 | Dashboard de vivero con stats | http://localhost:5173/vivero |
| S1-010 | Gestión de productos del vivero | http://localhost:5173/vivero/productos |
| S1-011 | Dashboard admin con métricas | http://localhost:5173/admin |
| S1-012 | API REST completa (22 endpoints) | http://localhost:8000/docs |
| S1-013 | Seed data: 6 viveros, 29 productos, 14 reseñas | Datos chilenos realistas |
| S1-016 | UX fixes: color verde, diacríticos, imágenes | Review de 11 páginas completado |

## Technical Summary

- **Frontend**: React 19 + TypeScript + Vite 7 + Tailwind v4 + shadcn/ui
  - 10 páginas (6 storefront, 4 vivero panel, 3 admin panel)
  - 3 layouts (Storefront, Vivero, Admin)
  - 5 custom hooks (useProducts, useNurseries, useCart, useOrders, useCategories)
  - Integración con backend via React Query + Axios + Vite proxy
- **Backend**: FastAPI + SQLAlchemy + SQLite
  - 6 modelos (Category, Nursery, Product, Order, OrderItem, Review)
  - 22 endpoints REST con filtros, paginación y CRUD completo
  - Seed automático en startup
- **Datos**: 6 viveros chilenos, 29 productos de plantas, 8 categorías, 14 reseñas

## How to Run

```bash
# Backend (terminal 1)
cd plantarea/backend
poetry install
poetry run uvicorn plantarea.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend (terminal 2)
cd plantarea/frontend
npm install
npm run dev -- --host 0.0.0.0
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Pages Available

| Page | URL | Description |
|------|-----|-------------|
| Home | / | Hero, productos destacados, viveros destacados |
| Catálogo | /catalogo | Grid de productos, búsqueda, filtros por categoría |
| Producto | /producto/:id | Ficha detallada, selector cantidad, agregar al carrito |
| Viveros | /viveros | Lista de viveros con cards |
| Perfil vivero | /viveros/:id | Cover, info, productos, reseñas |
| Carrito | /carrito | Items por vivero, totales, checkout |
| Dashboard vivero | /vivero | Stats, pedidos recientes |
| Productos vivero | /vivero/productos | Tabla de gestión de productos |
| Pedidos vivero | /vivero/pedidos | Lista de pedidos |
| Estadísticas | /vivero/estadisticas | Métricas del vivero |
| Admin Dashboard | /admin | KPIs del negocio |
| Admin Viveros | /admin/viveros | Gestión de viveros |
| Admin Moderación | /admin/moderacion | Moderación de contenido |

## Questions for PO

1. Las imágenes actuales son placeholders (picsum.photos). ¿Quieres que usemos imágenes reales de plantas en el siguiente sprint?
2. El carrito es solo client-side (se pierde al refrescar). ¿Lo persistimos en localStorage para el próximo sprint?
3. No hay autenticación. ¿Implementamos login para viveros en Sprint 2?
4. ¿Prioridad para Sprint 2: pulir UI (hero con foto, related products, etc.) o funcionalidad (auth, persistencia, checkout real)?
