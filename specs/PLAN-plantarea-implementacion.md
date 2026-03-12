# Plan de Implementacion: Plantarea

**Creado**: 2026-03-11
**PRD**: `PRD-plantarea.md`
**Horizonte**: 12 meses (Mes 0 = pre-desarrollo, Mes 1 = lanzamiento desarrollo)

---

## Resumen Ejecutivo

El plan se organiza en **5 etapas** que cubren desde la validacion con los viveros actuales hasta la monetizacion completa. Cada etapa tiene entregables concretos, criterios de exito y decisiones clave que tomar antes de avanzar.

---

## Etapa 0: Validacion y Preparacion (Semanas 1-3)

**Objetivo**: Validar supuestos criticos del PRD antes de escribir codigo.

### 0.1 Encuesta a viveros del grupo WhatsApp
- Crear un Google Form corto (5-7 preguntas) y distribuirlo en el grupo
- Preguntas clave:
  - Tienen RUT de empresa o persona natural?
  - Cuantas especies/productos manejan?
  - Usan algun sistema para registrar ventas?
  - Manejan despacho propio? Hasta que distancia?
  - Pagarian una suscripcion mensual por visibilidad online? Cuanto?
  - Que les frustra mas de vender por WhatsApp?
- **Criterio de exito**: 40+ respuestas, >60% con interes en plataforma

### 0.2 Investigacion regulatoria
- Consultar SAG sobre regulaciones de venta online de plantas vivas
- Verificar si se requiere certificacion fitosanitaria para despacho inter-regional
- Revisar normativa SII para marketplace (retencion de impuestos, boleta electronica)
- **Entregable**: Documento de 1 pagina con restricciones legales y como afectan el MVP

### 0.3 Evaluacion de pasarela de pago
- Comparar Mercado Pago vs Transbank (Webpay):
  - Facilidad de integracion (API, SDK, sandbox)
  - Comision por transaccion
  - Tiempo de liquidacion
  - Requisitos legales para operar (SII, cuenta bancaria empresa)
- **Decision**: Elegir pasarela antes de empezar desarrollo
- **Recomendacion preliminar**: Mercado Pago (menor barrera de entrada, no requiere contrato con Transbank)

### 0.4 Infraestructura base
- Registrar dominio `plantarea.cl` (y `.com` si disponible)
- Crear cuentas en servicios cloud:
  - GitHub (repositorio)
  - Cloudinary (imagenes, tier gratuito: 25GB)
  - Railway o Fly.io (hosting backend + frontend)
- Crear cuenta de pasarela de pago en modo sandbox
- **Costo estimado**: ~$15.000 CLP/mes (dominio + hosting basico)

### 0.5 Definir taxonomia de productos
- Crear la lista inicial de categorias basada en lo que se vende en el grupo:
  - Costaneras / Cerco vivo
  - Ornamentales (flor, follaje)
  - Frutales
  - Palmeras
  - Arboles nativos
  - Plantas de interior
  - Suculentas y cactus
  - Cesped y cubresuelos
- Definir atributos por producto: nombre comun, nombre cientifico (opcional), tamano, formato (bolsa/contenedor/raiz desnuda), precio
- **Entregable**: YAML de categorias y atributos (`config/categories.yaml`)

**Gate de decision**: Con los resultados de la encuesta y la evaluacion regulatoria, decidir GO/NO-GO para el desarrollo.

---

## Etapa 1: MVP — Core Marketplace (Semanas 4-12)

**Objetivo**: Plataforma funcional donde viveros publican y compradores compran.
**Features**: F-01, F-02, F-03, F-04, F-05, F-06, F-07

### Sprint 1 (Sem 4-5): Fundaciones

**Backend**:
- Setup del proyecto (FastAPI + Poetry + SQLite)
- Modelo de datos: User, Nursery, Product, Category, ProductImage
- Auth: registro/login con JWT (email + password)
- Endpoint de registro diferenciado: comprador vs vivero
- CRUD basico de categorias (seed desde YAML)

**Frontend**:
- Setup del proyecto (Vite + React + TypeScript + Tailwind + shadcn/ui)
- Layout base mobile-first (header, nav, footer)
- Paginas de registro y login
- Routing basico

**Entregable**: Usuario puede registrarse como comprador o vivero y hacer login.

### Sprint 2 (Sem 6-7): Catalogo del Vivero

**Backend**:
- CRUD completo de productos (nombre, descripcion, precio, stock, categoria, tamano)
- Upload de imagenes a Cloudinary (max 5 por producto)
- Endpoint de perfil de vivero (editar nombre, descripcion, ubicacion, logo)
- Validaciones de negocio (precio > 0, stock >= 0, al menos 1 imagen)

**Frontend**:
- Panel de vivero: formulario de perfil (nombre, ubicacion en mapa, descripcion, logo)
- Panel de vivero: lista de mis productos con CRUD
- Formulario de producto con drag-and-drop de imagenes
- Vista previa del producto

**Entregable**: Vivero puede completar su perfil y publicar productos con fotos.

### Sprint 3 (Sem 8-9): Storefront y Busqueda

**Backend**:
- Listado publico de productos con paginacion
- Busqueda full-text (SQLite FTS5)
- Filtros: categoria, rango de precio, region/comuna
- Ficha de producto con detalle + datos del vivero
- Listado de viveros con perfil publico

**Frontend**:
- Homepage con categorias destacadas y productos recientes
- Pagina de busqueda con filtros laterales (mobile: bottom sheet)
- Ficha de producto (galeria de fotos, info del vivero, boton agregar al carrito)
- Pagina de perfil publico del vivero (productos, ubicacion)

**Entregable**: Comprador puede explorar el catalogo, buscar plantas y ver fichas de producto.

### Sprint 4 (Sem 10-11): Carrito, Checkout y Pagos

**Backend**:
- Carrito de compras (sesion o persistido en DB)
- Logica multi-vivero: agrupar items por vivero, calcular subtotales
- Integracion Mercado Pago (o Webpay): crear preferencia de pago, webhook de confirmacion
- Modelo de Orden: status (pendiente, pagado, confirmado, despachado, entregado)
- Endpoint de creacion de orden post-pago

**Frontend**:
- Carrito: lista de items agrupados por vivero, editar cantidades, eliminar
- Checkout: resumen de orden, seleccion de metodo de entrega (retiro en vivero / despacho)
- Integracion con SDK de Mercado Pago (redirect o modal)
- Pagina de confirmacion post-pago

**Entregable**: Comprador puede agregar al carrito, pagar online y generar una orden.

### Sprint 5 (Sem 12): Pedidos y Notificaciones

**Backend**:
- Panel de pedidos para vivero (lista de ordenes recibidas, cambiar estado)
- Panel de pedidos para comprador (historial de compras, tracking de estado)
- Notificaciones por email (confirmacion de compra, nuevo pedido para vivero, cambio de estado)
- API de webhook para actualizar estado de pago

**Frontend**:
- Panel vivero: lista de pedidos con filtro por estado, detalle de orden, boton para marcar como despachado
- Panel comprador: mis compras, detalle de orden, estado actual
- Notificaciones en la UI (badge con contador)

**Entregable**: Flujo completo de compra-venta funcional. **MVP listo para testing.**

### Testing y QA del MVP (Sem 12-13)
- Testing interno con 3-5 viveros del grupo WhatsApp (beta cerrada)
- Flujo completo: publicar producto -> buscar -> comprar -> pagar -> gestionar pedido
- Fix de bugs criticos
- Testing de pagos en sandbox y luego en produccion con transacciones reales pequenas

**Gate de decision**: MVP funciona end-to-end con viveros reales? GO para lanzamiento.

---

## Etapa 2: Lanzamiento y Adopcion (Semanas 13-20)

**Objetivo**: Migrar 50 viveros del grupo WhatsApp y conseguir las primeras 100 transacciones.

### 2.1 Onboarding de viveros (Sem 13-16)

**Estrategia de lanzamiento escalonado**:
- **Semana 13**: Invitar a 10 viveros "champions" (los mas activos en WhatsApp) para beta publica
- **Semana 14-15**: Ampliar a 30 viveros, ofrecer soporte 1:1 para cargar catalogo
- **Semana 16**: Abrir registro a todos los viveros del grupo

**Soporte de onboarding**:
- Crear video tutorial de 3 min: "Como publicar tu primera planta en Plantarea"
- Preparar guia paso a paso en PDF/WhatsApp
- Ofrecer carga asistida: vivero envia fotos por WhatsApp, equipo Plantarea las sube
- Linea de WhatsApp de soporte para viveros

**Meta**: 50 viveros con al menos 5 productos cada uno = 250+ productos en catalogo.

### 2.2 Adquisicion de compradores (Sem 14-20)

**Canal organico (costo $0)**:
- SEO: optimizar paginas de categoria para "comprar [tipo de planta] online Chile"
- Contenido: crear fichas de cuidado por especie (trae trafico de busqueda)
- Compartir en redes sociales: Instagram, Facebook grupos de jardineria

**Canal directo (bajo costo)**:
- Los propios viveros comparten su perfil de Plantarea con sus clientes actuales
- Publicar en el grupo de WhatsApp con link a la plataforma
- Google My Business para cada vivero (mejora busqueda local)

**Canal pagado (si el presupuesto lo permite)**:
- Google Ads en keywords de alta intencion: "vivero cerca de mi", "comprar plantas online"
- Instagram Ads segmentados por interes en jardineria
- **Presupuesto sugerido**: $200.000-500.000 CLP/mes

**Meta**: 500 visitantes unicos/semana al mes 2, tasa de conversion 2-3%.

### 2.3 Feedback loop (continuo)

- Encuesta post-compra automatica (NPS + 2 preguntas abiertas)
- Reunion semanal con 2-3 viveros para feedback cualitativo
- Analytics basico: productos mas vistos, tasa de abandono de carrito, tiempo en sitio
- Priorizar bugs y mejoras basado en feedback real

---

## Etapa 3: Vivero Experience — Fase 2 (Semanas 17-28)

**Objetivo**: Retener viveros con herramientas de gestion y generar confianza en compradores.
**Features**: F-08, F-09, F-10, F-11

### Sprint 6-7 (Sem 17-20): Panel de Vivero Avanzado (F-08)
- Dashboard con metricas: productos publicados, visitas, pedidos, ingresos
- Graficos de tendencia (ventas ultimos 30 dias, productos mas vendidos)
- Gestion de stock con alertas de stock bajo
- Exportar ventas a CSV

### Sprint 8 (Sem 21-22): Resenas y Reputacion (F-09)
- Compradores pueden dejar resena (1-5 estrellas + texto) despues de recibir pedido
- Score promedio visible en perfil de vivero y en resultados de busqueda
- Vivero puede responder resenas
- Moderacion basica (reportar resenas inapropiadas)

### Sprint 9 (Sem 23-24): Geolocalizacion (F-10)
- Viveros ingresan su ubicacion exacta (mapa interactivo)
- Busqueda "viveros cerca de mi" con radio configurable
- Filtro por region/comuna en catalogo
- Estimacion de distancia en ficha de producto

### Sprint 10 (Sem 25-28): Panel Admin (F-11)
- Dashboard de negocio: viveros activos, transacciones, GMV, revenue
- Gestion de viveros: aprobar/suspender, ver actividad
- Moderacion de productos y resenas
- Configuracion de categorias y atributos

**Gate de decision**: Los viveros usan el panel? El NPS mejora con resenas? Activar comision del 5%.

---

## Etapa 4: Monetizacion y B2B — Fase 3 (Semanas 29-40)

**Objetivo**: Activar revenue y abrir segmento B2B.
**Features**: F-12, F-13, F-14

### 4.1 Activacion de comision (Sem 29)
- Activar 5% comision sobre transacciones (3% para Pro)
- Comunicar a viveros con 30 dias de anticipacion
- Implementar logica de retencion automatica en el pago
- Dashboard de comisiones para admin

### Sprint 11-12 (Sem 29-32): Suscripcion Vivero Pro (F-12)
- Pagina de planes (Gratuito vs Pro)
- Pago recurrente mensual via Mercado Pago
- Activacion/desactivacion de beneficios Pro
- Productos ilimitados, badge verificado, posicion destacada
- Facturacion (boleta o factura segun RUT)

### Sprint 13 (Sem 33-34): Catalogo PDF (F-13)
- Generacion automatica de catalogo PDF desde productos del vivero
- Personalizado con logo y datos de contacto del vivero
- Descargable desde panel de vivero (solo Pro)
- Compartible por link publico

### Sprint 14-15 (Sem 35-40): Cotizaciones B2B (F-14)
- Registro de usuario tipo "paisajista/empresa"
- Formulario de solicitud de cotizacion (lista de especies + cantidades)
- Distribucion automatica a viveros que tienen esos productos
- Panel de cotizaciones recibidas para el comprador B2B
- Panel de cotizaciones enviadas para el vivero

---

## Etapa 5: Crecimiento y Escalabilidad (Mes 10-12)

**Objetivo**: Escalar la operacion, optimizar unit economics, preparar siguiente ronda.

### 5.1 Optimizacion tecnica
- Evaluar migracion de SQLite a PostgreSQL si el volumen lo requiere
- CDN para imagenes (si Cloudinary free tier se queda corto)
- Caching de busquedas frecuentes
- Monitoreo y alertas (uptime, errores, latencia)

### 5.2 Expansion de oferta
- Agregar categorias: insumos de jardineria, maceteros, tierra, fertilizantes
- Permitir que viveros vendan servicios (instalacion, paisajismo, mantenimiento)
- Alianzas con transportistas especializados (despacho coordinado)

### 5.3 Evaluacion de canal mobile
- Analizar metricas de uso mobile vs desktop
- Si >70% mobile: evaluar PWA mejorada o app nativa (React Native)
- Decision basada en datos, no en supuestos

### 5.4 Preparacion para escalar
- Documentar procesos de onboarding para nuevas regiones
- Evaluar expansion a ciudades fuera de RM
- Preparar pitch deck si se busca inversion (metricas reales de 9-12 meses)

---

## Resumen de Costos Estimados

| Item | Costo Mensual | Notas |
|------|--------------|-------|
| Dominio plantarea.cl | ~$8.000 CLP/ano | NIC Chile |
| Hosting (Railway/Fly.io) | $10.000-25.000 CLP | Tier starter, escala con uso |
| Cloudinary (imagenes) | $0-15.000 CLP | Free tier cubre inicio |
| Mercado Pago | 3.49% + IVA por tx | Lo paga el comprador o se absorbe |
| Google Workspace (email) | $5.000 CLP | plantarea.cl email |
| Marketing digital | $200.000-500.000 CLP | Opcional, Fase 2+ |
| **Total MVP (sin marketing)** | **~$30.000-50.000 CLP/mes** | |

---

## Dependencias Criticas y Orden de Resolucion

| # | Dependencia | Resolver antes de | Responsable |
|---|------------|-------------------|-------------|
| 1 | Resultado encuesta a viveros | Iniciar desarrollo (Etapa 1) | PO |
| 2 | Definicion legal (SAG, SII) | Integrar pagos (Sprint 4) | PO + abogado |
| 3 | Cuenta Mercado Pago produccion | Testing de pagos (Sprint 4) | PO |
| 4 | Categorias y atributos YAML | Sprint 1 (seed de datos) | PO + viveros |
| 5 | 10 viveros champions confirmados | Lanzamiento beta (Etapa 2) | PO |
| 6 | Contenido de fotos/productos | Lanzamiento publico | Viveros + equipo |

---

## Calendario Visual

```
Sem  1─3   ███ Etapa 0: Validacion y prep
Sem  4─5   ██  Sprint 1: Fundaciones (auth, setup)
Sem  6─7   ██  Sprint 2: Catalogo vivero (CRUD productos)
Sem  8─9   ██  Sprint 3: Storefront (busqueda, filtros)
Sem 10─11  ██  Sprint 4: Carrito, checkout, pagos
Sem 12─13  ██  Sprint 5: Pedidos + QA + beta cerrada
            ─── MVP LISTO ───
Sem 13─16  ████ Etapa 2: Onboarding 50 viveros
Sem 14─20  ███████ Adquisicion compradores
Sem 17─20  ████ Sprint 6-7: Panel vivero avanzado
Sem 21─22  ██  Sprint 8: Resenas
Sem 23─24  ██  Sprint 9: Geolocalizacion
Sem 25─28  ████ Sprint 10: Admin panel
            ─── ACTIVAR COMISION 5% ───
Sem 29─32  ████ Sprint 11-12: Vivero Pro (suscripcion)
Sem 33─34  ██  Sprint 13: Catalogo PDF
Sem 35─40  ██████ Sprint 14-15: Cotizaciones B2B
Sem 40─48  █████████ Etapa 5: Crecimiento y escala
```

---

## Checklist de Decisiones Pendientes

- [ ] GO/NO-GO post encuesta a viveros
- [ ] Mercado Pago vs Transbank
- [ ] Necesidad de constituir empresa (SpA) para operar marketplace
- [ ] Politica de devolucion/reclamos (plantas vivas son perecibles)
- [ ] Precio final de suscripcion Pro (validar con viveros)
- [ ] Modelo de despacho: solo retiro, despacho por vivero, o ambos
- [ ] Taxonomia final de categorias (validar con viveros del grupo)
