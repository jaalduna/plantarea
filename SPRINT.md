# Sprint 1 - Plantarea Marketplace

**Started**: 2026-03-11
**Status**: completed
**Goal**: Crear mockup funcional del marketplace Plantarea con datos de ejemplo, mostrando las vistas principales: storefront (catálogo, búsqueda, fichas de producto, perfil de vivero), panel de vivero y panel admin.

## Backlog

| ID | Story | Priority | Status | Assignee | Notes |
|----|-------|----------|--------|----------|-------|
| S1-001 | Diseño de arquitectura y estructura del proyecto | high | done | architect | Estructura completa, API contract, tipos TS |
| S1-002 | Scaffolding frontend (React + Vite + Tailwind + shadcn/ui) | high | done | architect | 36 archivos, 10 páginas, 5 hooks, 3 layouts |
| S1-003 | Scaffolding backend (FastAPI + SQLite) | high | done | architect | 16 archivos, 22 endpoints, 6 modelos |
| S1-004 | Storefront: página home con catálogo de plantas | high | done | frontend-dev | Hero, value props, productos y viveros destacados |
| S1-005 | Storefront: búsqueda y filtros (categoría, precio) | high | done | frontend-dev | Búsqueda full-text, filtros por categoría, paginación |
| S1-006 | Storefront: ficha de producto detallada | high | done | frontend-dev | Imagen, precio, stock, selector de cantidad, agregar al carrito |
| S1-007 | Storefront: perfil de vivero con productos y reseñas | high | done | frontend-dev | Cover image, info, grid de productos, reseñas con estrellas |
| S1-008 | Storefront: carrito de compras multi-vivero | med | done | frontend-dev | Items agrupados por vivero, totales, formulario checkout |
| S1-009 | Panel de vivero: dashboard con estadísticas | med | done | frontend-dev | 4 stat cards, pedidos recientes |
| S1-010 | Panel de vivero: CRUD de productos | med | done | frontend-dev | Tabla de productos con acciones |
| S1-011 | Panel admin: dashboard de métricas del negocio | low | done | frontend-dev | KPIs, listado de viveros, moderación |
| S1-012 | API endpoints: productos, viveros, categorías, pedidos | high | done | backend-dev | 22 rutas REST, filtros, paginación |
| S1-013 | Seed data: viveros y productos chilenos realistas | high | done | backend-dev | 6 viveros, 29 productos, 14 reseñas, 8 categorías |
| S1-014 | Integración frontend-backend | high | done | frontend-dev | Vite proxy, React Query, todos los hooks conectados |
| S1-015 | Levantar aplicación completa | high | done | deployer | Backend :8000, Frontend :5173, ambos corriendo |
| S1-016 | UX Review + corrección de issues críticos | high | done | ux-designer + frontend-dev | Color verde, diacríticos, títulos, nav activa, imágenes |

## Architecture Decisions

- Frontend: React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 + shadcn/ui (Nova/Radix)
- Backend: Python 3.11 + FastAPI + SQLAlchemy + SQLite
- Imágenes: picsum.photos para mockup (100% confiable)
- Color primario: oklch(0.51 0.17 145) (#16a34a verde)
- API proxy: Vite dev server proxy /api → localhost:8000
- Estado del carrito: client-side (React state en useCart hook)

## Definition of Done

- [x] Code implemented and working
- [x] Frontend y backend levantados sin errores
- [x] Navegación completa entre todas las vistas
- [x] Datos de ejemplo realistas (plantas chilenas)
- [x] UX Review realizado y issues críticos corregidos
- [ ] Tests (pendiente para Sprint 2)
- [ ] Code review formal (pendiente para Sprint 2)
- [x] README con instrucciones de setup

## Daily Log

### 2026-03-11
- Sprint 1 iniciado: mockup funcional de Plantarea
- Arquitecto diseñó y scaffoldeó proyecto completo (frontend + backend)
- Backend-dev verificó API: 29 productos, 6 viveros, 8 categorías funcionando
- Frontend-dev verificó build: 0 errores TypeScript
- UX Designer hizo review completo (11 páginas): encontró 4 críticos, 8 mayores, 7 menores
- Frontend-dev corrigió: color verde, títulos de página, nav activa, diacríticos españoles, tamaño botón carrito
- Backend-dev corrigió: URLs de imágenes (picsum.photos), cover images para viveros
- UX Designer verificó correcciones: verde ✅, diacríticos ✅, imágenes ✅
- Sprint completado: aplicación funcionando en localhost:5173 + localhost:8000
