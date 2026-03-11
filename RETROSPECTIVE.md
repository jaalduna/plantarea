# Plantarea - Sprint Retrospective

## Sprint 0: Project Scaffolding

### What was done
- Frontend: Vite + React + TypeScript + Tailwind v4 + shadcn/ui
- Backend: FastAPI + SQLAlchemy + SQLite + Poetry
- Full routing structure (storefront, vivero panel, admin panel)
- API contract with all endpoints
- Seed data with 6 Chilean nurseries and 29 products
- All code compiles and runs

### Decisions made
- **Tailwind v4** with @tailwindcss/vite plugin (import-based, no config file)
- **shadcn/ui Nova preset** with Radix components and Geist font
- **Green primary color** (#16a34a) for plant marketplace branding
- **CLP integer prices** (no decimals, Chilean standard)
- **SQLite** for simplicity in MVP phase
- **Multi-nursery cart** with automatic order splitting per nursery
- **Spanish UI** since target market is Chile

### What's next
- Authentication (nursery login, buyer accounts)
- Image upload (product photos)
- Payment integration (Transbank/MercadoPago)
- Email notifications (order confirmation)
- Real nursery onboarding flow
