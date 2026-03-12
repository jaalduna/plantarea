# Pendiente: Retención, Desintermediación y Descuentos B2B

**Status**: pendiente de decisión
**Creado**: 2026-03-11
**Contexto**: El PO planteó dos miedos estratégicos que requieren decisión antes de avanzar con Fase 2.

---

## Problema 1: Compradores se van directo al vivero (desintermediación)

El comprador descubre al vivero en Plantarea, obtiene su nombre/ubicación, y luego lo contacta por WhatsApp o lo visita directamente, saltándose la plataforma y su comisión.

### Estrategias analizadas

| Estrategia | Descripción | Efectividad | Complejidad |
|---|---|---|---|
| **Comunicación gestionada** | No exponer teléfono/email del vivero hasta que el pedido esté confirmado y pagado. Chat dentro de la plataforma | Alta | M |
| **Valor solo en-plataforma** | Garantía de compra, protección al comprador, tracking, historial, reseñas verificadas (solo compradores reales pueden dejar reseña) | Alta | M-L |
| **No depender de la comisión** | Revenue principal de suscripciones Vivero Pro ($29.990/mes), no de comisiones por transacción. La desintermediación duele menos | Media-Alta | S |
| **Programa de lealtad/puntos** | Comprar vía Plantarea acumula puntos canjeables por descuentos. Incentiva al comprador a quedarse | Media | M |
| **Facilidad > esfuerzo** | Hacer que comprar por la plataforma sea tan fácil que no valga la pena coordinar por WhatsApp | Media | — (es diseño, no feature) |

### Preguntas abiertas

- ¿La comunicación gestionada es viable? ¿Los viveros esperan que su contacto sea visible públicamente?
- ¿Combinar varias estrategias (comunicación gestionada + valor en-plataforma + suscripción como revenue principal)?
- ¿Qué tan agresiva debe ser la plataforma en "esconder" el contacto directo vs. ser transparente y competir por conveniencia?

---

## Problema 2: Descuentos exclusivos paisajista-vivero

Los paisajistas tienen acuerdos de descuento preexistentes con viveros específicos (ej: -20% por volumen). Si la plataforma no soporta esto, empuja activamente a los paisajistas FUERA de Plantarea.

### Soluciones analizadas

| Solución | Descripción | Complejidad | Fase sugerida |
|---|---|---|---|
| **Códigos de descuento por vivero** | El vivero genera códigos y los comparte con sus paisajistas. Se aplican en checkout | S | MVP/Fase 1 |
| **Precios convenio** | El vivero crea "listas de precios" privadas para paisajistas verificados. El paisajista ve precio con descuento al estar logueado | M | Fase 2 |
| **Relaciones B2B formalizadas** | El paisajista "se vincula" a un vivero. El vivero aprueba y asigna nivel de descuento (bronce/plata/oro o % específico) | L | Fase 2-3 |
| **Cotización privada** | El paisajista pide cotización, el vivero responde con precios especiales. Se convierte en pedido si acepta. (Ya contemplado en F-14) | M | Fase 3 |

### Preguntas abiertas

- ¿El modelo de descuentos debe ser controlado solo por el vivero, o los paisajistas también pueden solicitar/negociar?
- ¿Código de descuento simple es suficiente para el MVP, o los paisajistas necesitan ver su precio especial directamente en el catálogo?
- ¿Cuántos paisajistas tienen este tipo de acuerdos actualmente? ¿Es un caso frecuente o excepcional?

---

## Decisión requerida

Antes de incorporar esto al PRD como features formales, el PO necesita decidir:

1. **Nivel de agresividad anti-desintermediación**: ¿Transparente (mostrar contacto, competir por valor) o gestionado (ocultar contacto, forzar canal)?
2. **Modelo de descuentos B2B**: ¿Códigos simples (rápido) o precios convenio (robusto)?
3. **Prioridad**: ¿Esto entra en Fase 1 (MVP) o Fase 2?
