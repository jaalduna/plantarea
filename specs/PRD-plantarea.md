# PRD: Plantarea - Marketplace de Viveros Productores

**Slug**: `plantarea`
**Status**: approved
**Created**: 2026-03-11
**Author**: jaalduna

---

## Vision

Plantarea es el marketplace que conecta directamente a viveros productores con compradores de plantas en Chile. Hoy, 120+ viveros operan subastas y ventas a traves de grupos de WhatsApp -- un canal que funciona pero no escala: sin catalogo centralizado, sin historial de precios, sin reputacion verificable, sin logistica coordinada. Plantarea reemplaza ese flujo informal por una plataforma donde los productores publican su inventario vivo, los compradores buscan y compran con confianza, y la plataforma facilita la transaccion de principio a fin.

El estado final: cualquier persona en Chile que busque plantas -- desde alguien que quiere un limonero para su patio hasta una inmobiliaria que necesita 500 palmeras para un proyecto -- encuentra en Plantarea la oferta mas completa de viveros productores, con precios transparentes, disponibilidad en tiempo real y despacho coordinado.

## Problem Statement

Los viveros productores chilenos venden principalmente a traves de WhatsApp, ferias y visitas presenciales. Esto genera multiples problemas:

- **Para los viveros**: No tienen presencia digital propia. Dependen de grupos de WhatsApp donde sus publicaciones se pierden en el scroll. No hay forma de construir reputacion, recibir resenas, ni mostrar un catalogo organizado. Las consultas de precio son repetitivas y manuales.
- **Para compradores particulares**: No saben que viveros existen, que tienen disponible, ni como comparar precios. Deben recorrer fisicamente o preguntar en grupos de WhatsApp para cada necesidad.
- **Para proyectos grandes (inmobiliarias/licitaciones)**: Necesitan cotizaciones formales, volumenes garantizados y trazabilidad. El proceso actual es llamar vivero por vivero, pedir listas en PDF o Excel, y consolidar manualmente.

El grupo de WhatsApp actual con 120 viveros valida la demanda: hay transacciones activas, pero el canal limita el crecimiento.

## Modelo de Negocio

### Propuesta: Freemium + Comision Escalonada

Se propone un modelo hibrido que minimiza la barrera de entrada para los viveros (ya acostumbrados a vender gratis por WhatsApp) y monetiza conforme la plataforma genera valor real.

#### Capa Gratuita (Viveros)
- Publicar hasta 30 productos con fotos y precio
- Perfil basico del vivero (ubicacion, contacto, descripcion)
- Recibir mensajes de compradores
- Aparecer en busquedas organicas

#### Capa Premium - "Vivero Pro" ($29.990 CLP/mes)
- Publicaciones ilimitadas
- Estadisticas de visitas, productos mas vistos, conversion
- Posicionamiento destacado en busqueda
- Catalogo descargable en PDF (para cotizaciones formales)
- Badge "Vivero Verificado"
- Notificaciones de licitaciones relevantes

#### Comision por Transaccion
- **0% comision** en los primeros 3 meses (periodo de adopcion)
- **5% comision** sobre ventas procesadas a traves de la plataforma (post-adopcion)
- **3% comision** para suscriptores Pro
- La comision aplica solo cuando el pago se procesa via Plantarea (los acuerdos directos no se comisionan)

#### Ingresos Adicionales (Fase 2+)
- **Publicidad nativa**: Viveros pagan por aparecer en banners dentro de categorias relevantes
- **Licitaciones premium**: Inmobiliarias y municipios pagan por publicar requerimientos a toda la red de viveros
- **Logistica coordinada**: Margen sobre despacho (alianza con transportistas especializados en plantas)

### Proyeccion de Adopcion

| Fase | Viveros Activos | Modelo | Ingreso Estimado/mes |
|------|----------------|--------|---------------------|
| MVP (mes 1-3) | 30-50 | Solo gratuito | $0 (adopcion) |
| Crecimiento (mes 4-8) | 80-120 | Freemium + 5% comision | $500K-1.5M CLP |
| Consolidacion (mes 9-12) | 150+ | Full model | $2M-5M CLP |

## Goals & Success Metrics

| Goal | Metric | Target | Método de Medición |
|------|--------|--------|-------------------|
| Migrar viveros de WhatsApp a plataforma | Viveros registrados con al menos 5 productos publicados | 50 viveros en 3 meses | Dashboard admin: conteo de viveros con ≥5 productos activos |
| Generar transacciones en plataforma | Pedidos completados por mes | 100 pedidos/mes al mes 6 | Panel admin: pedidos con estado "entregado" o "completado" por mes |
| Retencion de viveros | Viveros activos (publicaron o respondieron en ultimos 30 dias) | >70% retencion mensual | Query mensual: viveros con actividad (login, edicion, respuesta) en ultimos 30 dias / total registrados |
| Satisfaccion comprador | NPS de compradores post-compra | >40 NPS | Encuesta por email automatica 3 dias post-entrega |
| Revenue | MRR (Monthly Recurring Revenue) | $1M CLP al mes 8 | Sumatoria mensual: suscripciones Pro + comisiones cobradas via pasarela de pago |

## Target Users

| User Type | Description | Primary Need |
|-----------|-------------|-------------|
| **Comprador particular** | Persona que busca plantas para su hogar, jardin o terraza. No experto, decide por estetica y precio. | Encontrar plantas con fotos claras, precios transparentes y despacho a domicilio |
| **Vivero productor** | Productor de plantas (no intermediario). Opera en terreno propio, 120+ activos en WhatsApp. Vende costaneras, ornamentales, frutales, palmeras. | Mostrar su catalogo, recibir pedidos sin perder tiempo en consultas repetitivas |
| **Paisajista** | Profesional que ejecuta proyectos de paisajismo para particulares. Compra en volumen medio. | Cotizar rapidamente multiples especies con disponibilidad real |
| **Inmobiliaria** (Fase 2) | Empresa que desarrolla proyectos habitacionales y requiere paisajismo a gran escala. | Solicitar cotizaciones formales con volumen, plazos y garantias |
| **Entidad licitante** (Fase 3) | Municipio, corporacion o gobierno que licita proyectos de areas verdes. | Publicar requerimientos y recibir ofertas de multiples viveros |

## User Stories

> Format: As a [user type], I want [action] so that [benefit].

1. **US-01**: Como comprador particular, quiero buscar plantas por tipo (frutal, ornamental, palmera) y ver fotos con precios, para decidir que comprar sin tener que preguntar uno por uno.
2. **US-02**: Como comprador particular, quiero agregar plantas de un vivero a un carrito y pagar en linea, para recibir mi pedido sin tener que coordinar por WhatsApp.
3. **US-03**: Como vivero productor, quiero publicar mis plantas con fotos, precio y stock disponible, para que los compradores me encuentren sin depender de WhatsApp.
4. **US-04**: Como vivero productor, quiero recibir notificaciones de nuevos pedidos y gestionar mis ventas desde el celular, para no perder oportunidades.
5. **US-05**: Como vivero productor, quiero ver estadisticas de mis productos (visitas, consultas, ventas), para entender que se vende mas y ajustar mi oferta.
6. **US-06**: Como comprador particular, quiero ver la reputacion del vivero (resenas, calificaciones), para comprar con confianza.
7. **US-07**: Como comprador particular, quiero filtrar viveros por cercania a mi ubicacion, para reducir costos de despacho o retirar en persona.
8. **US-08**: Como paisajista, quiero solicitar una cotizacion por multiples especies y cantidades a varios viveros simultaneamente, para comparar ofertas rapidamente.
9. **US-09**: Como vivero productor, quiero generar un catalogo PDF de mis productos, para enviarlo a clientes corporativos o inmobiliarias.
10. **US-10**: Como administrador de Plantarea, quiero un dashboard con metricas de uso, transacciones y revenue, para monitorear la salud del negocio.
11. **US-11**: Como vivero productor, quiero importar mis productos desde fotos y descripciones que ya tengo en WhatsApp, para no tener que cargar todo manualmente desde cero.
12. **US-12**: Como comprador particular, quiero que las paginas de productos aparezcan en Google cuando busco "comprar plantas online Chile", para encontrar Plantarea sin conocerla de antes.

## Proposed Solution

Plantarea es una aplicacion web responsive (mobile-first) con dos interfaces principales:

1. **Storefront para compradores**: Catalogo con busqueda, filtros por categoria/ubicacion/precio, fichas de producto con fotos, perfil de vivero con resenas, carrito multi-vivero y checkout con Webpay/Mercado Pago.

2. **Panel de vivero**: Dashboard para que cada productor gestione su catalogo (CRUD de productos con fotos), vea pedidos entrantes, gestione stock y consulte estadisticas basicas.

3. **Panel admin**: Metricas de negocio, gestion de viveros, moderacion de contenido.

La arquitectura sigue el stack definido: **React + TypeScript + Vite + Tailwind + shadcn/ui** en frontend, **FastAPI + SQLAlchemy** en backend, desplegable inicialmente como monolito con separacion clara para escalar. El MVP usa **SQLite** por simplicidad; se migrara a **PostgreSQL** cuando el volumen de escrituras concurrentes lo requiera (ver Etapa 5 del plan de implementacion).

Para descubrimiento orgánico, las páginas de producto y perfil de vivero deben ser indexables por buscadores. Se implementará SSR o SSG para estas rutas públicas, con datos estructurados (JSON-LD schema.org/Product) y sitemap automático.

### Key Capabilities

1. **CAP-01**: Catalogo de productos con busqueda full-text, filtros por categoria, rango de precio y ubicacion geografica
2. **CAP-02**: Gestion de inventario para viveros (alta/baja/modificacion de productos con imagenes)
3. **CAP-03**: Sistema de pedidos con carrito por vivero y notificaciones (multi-vivero en Fase 2)
4. **CAP-04**: Pasarela de pago integrada (Webpay y/o Mercado Pago)
5. **CAP-05**: Sistema de reputacion (resenas y calificaciones por vivero)
6. **CAP-06**: Geolocalizacion de viveros y busqueda por cercania
7. **CAP-07**: Panel de vivero con estadisticas de productos y ventas
8. **CAP-08**: Panel admin con metricas de negocio y moderacion
9. **CAP-09**: Generacion de catalogo PDF para viveros Pro
10. **CAP-10**: Sistema de cotizaciones para compradores B2B (paisajistas)
11. **CAP-11**: Onboarding asistido desde WhatsApp (importacion de productos desde fotos/texto)
12. **CAP-12**: SEO y paginas de producto indexables (SSR/SSG, datos estructurados, sitemap)

## Scope

### In Scope
- Marketplace web responsive (mobile-first) para compra/venta de plantas
- Registro y onboarding de viveros productores
- Catalogo de productos con imagenes, precios y stock
- Busqueda y filtros (categoria, precio, ubicacion)
- Carrito de compras por vivero individual y checkout con pago en linea
- Opciones de entrega por vivero (retiro en vivero, despacho propio con costo, radio de cobertura)
- Panel de gestion para viveros
- Sistema de resenas y calificaciones
- Panel administrativo basico
- Modelo freemium + comision

### Out of Scope
- App nativa (iOS/Android) -- se evaluara post-MVP segun traccion
- Logistica centralizada por Plantarea -- cada vivero configura sus opciones de entrega (retiro, despacho propio, radio de cobertura). Logistica gestionada por la plataforma se evalua en Fase 2
- Subasta en tiempo real -- se mantiene como venta a precio fijo para el MVP
- Modulo de licitaciones formales -- Fase 3
- Integracion con SII/facturacion electronica -- Fase 2
- Internacionalizacion -- solo Chile

### Future Considerations
- Subasta en tiempo real (reemplazar la dinamica de WhatsApp con mejor UX)
- Logistica integrada (alianza con transportistas especializados en plantas)
- API publica para integracion con sistemas de inmobiliarias
- App nativa si la traccion lo justifica
- Expansion a otros paises de Latam

## System Context

Plantarea es un sistema nuevo sin dependencias de sistemas existentes. Se integrara con servicios externos para pagos y almacenamiento de imagenes.

```
[Vivero Productor] --publica productos--> [Plantarea Web App] <--busca y compra-- [Comprador]
                                                  |
                                          [FastAPI Backend]
                                         /        |        \
                           [PostgreSQL DB]  [Webpay/MP]  [Cloudinary/S3]
                                                          (imagenes)
```

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Viveros no migran de WhatsApp (resistencia al cambio) | High | High | Periodo gratuito, onboarding asistido, importacion bulk de catalogo desde fotos de WhatsApp |
| Compradores no llegan a la plataforma (chicken-and-egg) | High | Med | Lanzar con catalogo pre-cargado de 30+ viveros, SEO agresivo en "comprar plantas online Chile" |
| Viveros prefieren cerrar tratos fuera de plataforma (evadir comision) | Med | High | Comision baja (5%), valor agregado real (reputacion, estadisticas, visibilidad), no depender solo de comision |
| Complejidad logistica de plantas vivas (danos en transporte) | Med | Med | Fuera de scope en MVP; viveros manejan su despacho. Fase 2 evalua alianzas |
| Estacionalidad del mercado de plantas | Med | High | Diversificar categorias (interior, exterior, frutal, ornamental) y apuntar a paisajistas con demanda constante |
| Competencia de Marketplace genericos (MercadoLibre, Yapo) | Med | Low | Especializacion vertical: busqueda por especie, info de cuidado, reputacion especializada |

## Assumptions

- Los 120 viveros del grupo de WhatsApp son early adopters potenciales y al menos 30-50 migraran en los primeros 3 meses
- Los viveros tienen smartphones con camara para tomar fotos de sus productos
- El publico objetivo (compradores particulares en Chile) esta dispuesto a comprar plantas online
- Webpay o Mercado Pago estan disponibles como pasarela de pago sin requerimientos complejos de integracion
- SQLite es suficiente para el volumen de MVP; migrar a PostgreSQL manejado (Supabase free tier o Railway) cuando se necesiten escrituras concurrentes
- Los viveros estan dispuestos a manejar su propio despacho inicialmente

## Dependencies

- **Pasarela de pago**: Integracion con Webpay (Transbank) o Mercado Pago para procesar pagos en CLP
- **Almacenamiento de imagenes**: Servicio de almacenamiento de imagenes (Cloudinary, S3 o similar)
- **Hosting**: Servicio de hosting para backend y frontend (Railway, Fly.io, o VPS)
- **Dominio**: Registro de dominio plantarea.cl
- **Grupo de WhatsApp**: Canal actual para reclutar viveros early adopters y validar features

## Feature Breakdown

> These are candidate features that will each become a separate spec (via `/spec`).

| # | Feature | Priority | Complexity | Spec |
|---|---------|----------|-----------|------|
| F-01 | Registro y autenticacion de usuarios (compradores y viveros) | Must-have | M | -- |
| F-02 | Onboarding de vivero (perfil, ubicacion, descripcion, logo) | Must-have | S | -- |
| F-03 | CRUD de productos con imagenes (catalogo del vivero) | Must-have | L | -- |
| F-04 | Catalogo publico con busqueda y filtros | Must-have | L | -- |
| F-05 | Carrito de compras por vivero y checkout | Must-have | M | -- |
| F-06 | Integracion pasarela de pago (Webpay/Mercado Pago) | Must-have | L | -- |
| F-07 | Sistema de pedidos y notificaciones | Must-have | M | -- |
| F-08 | Panel de vivero (dashboard, pedidos, estadisticas) | Should-have | L | -- |
| F-09 | Sistema de resenas y calificaciones | Should-have | M | -- |
| F-10 | Busqueda por geolocalizacion / cercania | Should-have | M | -- |
| F-11 | Panel admin (metricas, moderacion, gestion) | Should-have | M | -- |
| F-12 | Suscripcion Vivero Pro + facturacion | Nice-to-have | L | -- |
| F-13 | Generacion de catalogo PDF | Nice-to-have | S | -- |
| F-14 | Cotizaciones B2B para paisajistas | Nice-to-have | L | -- |
| F-15 | Onboarding asistido desde WhatsApp (importacion de catalogo) | Must-have | M | -- |
| F-16 | SEO: paginas indexables, datos estructurados, sitemap | Should-have | M | -- |
| F-17 | Opciones de entrega por vivero (retiro, despacho, radio) | Must-have | S | -- |
| F-18 | Carrito multi-vivero (split de pedidos y pagos) | Nice-to-have | XL | -- |

## Timeline & Phases

| Phase | Features | Description |
|-------|----------|-------------|
| Phase 1 -- MVP | F-01, F-02, F-03, F-04, F-05, F-06, F-07, F-15, F-17 | Core marketplace: viveros publican (con onboarding desde WhatsApp), compradores buscan, compran y pagan por vivero individual. Cada vivero configura sus opciones de entrega. |
| Phase 2 -- Vivero Experience | F-08, F-09, F-10, F-11, F-16, F-18 | Panel vivero con estadisticas, resenas, geolocalizacion, panel admin, SEO para descubrimiento organico, y carrito multi-vivero. |
| Phase 3 -- Monetizacion & B2B | F-12, F-13, F-14 | Modelo de suscripcion Pro, herramientas B2B para paisajistas e inmobiliarias, generacion de catalogos. |

## Open Questions

### Bloqueantes (responder antes de iniciar desarrollo)

1. **[BLOQUEANTE]** Hay regulaciones especificas para la venta online de plantas vivas en Chile (SAG, fitosanitarias)? Si existen restricciones, podrian cambiar el scope o requerir certificaciones previas.
2. **[BLOQUEANTE]** Los viveros tienen RUT de empresa o la mayoria opera informalmente? Esto afecta directamente el modelo de comision, la integracion con pasarela de pago y la facturacion.

### Estratégicas (responder antes de Fase 2)

3. **[PENDIENTE]** Estrategia anti-desintermediación y descuentos B2B para paisajistas. Análisis completo en [`PENDIENTE-retencion-desintermediacion.md`](PENDIENTE-retencion-desintermediacion.md). Requiere decisión sobre: nivel de visibilidad del contacto directo del vivero, modelo de descuentos paisajista-vivero, y priorización (Fase 1 o 2).

### Importantes (responder durante Fase 1)

4. Transbank (Webpay) vs Mercado Pago: cual es mas facil de integrar y tiene menores comisiones para este volumen?
5. Que tan dispuestos estan los viveros a autogestionar sus publicaciones, o necesitaran un equipo de onboarding que les cargue el catalogo?
6. Existe alguna taxonomia o clasificacion estandar de plantas que debiese usar el catalogo (ej: nombre cientifico + nombre comun)?
