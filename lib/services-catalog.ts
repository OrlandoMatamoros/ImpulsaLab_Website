/**
 * CATÁLOGO CANÓNICO DE SERVICIOS — IMPULSA LAB 2026
 *
 * Fuente única de verdad para precios y nombres en el sitio web.
 * Derivado de:
 *   OneDrive/Impulsa Lab/01_Catalogo_y_Servicios/Catalogo_Maestro/
 *   BIBLIA_SERVICIOS_IMPULSA_2026.md (v1.2, 2026-05-22)
 *
 * v1.2: charm pricing global (todo termina en 7) + decisiones del
 * brainstorm eje por eje. FIN-001 → Tablero Financiero Inteligente;
 * PRD-001 → Captura Automática de Facturas de Proveedores; AUTO-002 →
 * Automatización Agéntica a Medida; Academy a 2 dimensiones; MKT-011
 * eliminado, MKT-020 archivado; +OPS-001 Investigador de Mercado Semanal.
 *
 * REGLAS:
 *  - Todos los precios y nombres salen de la biblia. NO inventar números.
 *  - `precioAncla` = el string público "desde $X" aprobado por Orlando
 *    (puede diferir del facturable real interno; ver biblia §4).
 *  - `setup` / `recurring` = números base en USD para cálculos internos
 *    (null cuando no aplica). Para tiers múltiples se documenta en
 *    `descripcionCorta` y se usa el tier de entrada en `setup`/`recurring`.
 *  - Este archivo lo leen las páginas de /servicios en Fase 3.
 *
 * NO editar precios aquí sin actualizar primero la biblia (y subir versión).
 */

export type Segmento = 'micro' | 'pequena' | 'ambos';

export type CategoriaServicio =
  | 'web'
  | 'marketing'
  | 'automatizacion'
  | 'chatbot'
  | 'finanzas'
  | 'consultoria'
  | 'capacitacion'
  | 'seo'
  | 'mantenimiento'
  | 'operaciones'
  | 'producto';

export interface Servicio {
  /** SKU estable de la biblia (referencia cruzada facturación/propuestas/sitio). */
  sku: string;
  /** Nombre comercial del servicio. */
  nombre: string;
  /** Categoría para agrupar en el sitio. */
  categoria: CategoriaServicio;
  /** Segmento objetivo. */
  segmento: Segmento;
  /** String público "desde $X" aprobado (biblia §4). */
  precioAncla: string;
  /** Fee de setup base en USD (null si no aplica / recurring puro). */
  setup: number | null;
  /** Mensualidad base en USD (null si no aplica / one-time puro). */
  recurring: number | null;
  /** Descripción corta para tarjetas/listas. */
  descripcionCorta: string;
}

/**
 * SERVICIOS FACTURABLES (line-items de la biblia §6 + §8).
 * Se incluyen los servicios principales; los add-ons granulares
 * (WEB-004..008, WEB-025..028, BOT-003) quedan documentados en la biblia
 * pero no se exponen como tarjetas públicas independientes.
 */
export const SERVICIOS: Servicio[] = [
  // ── 6.1 Web / Marketing ────────────────────────────────────────────
  {
    sku: 'WEB-001',
    nombre: 'Landing Express (GBP)',
    categoria: 'web',
    segmento: 'micro',
    precioAncla: 'desde $197',
    setup: 197,
    recurring: 15,
    descripcionCorta:
      'Presencia Web nivel 1. Landing de una página como destino para Google Business Profile. Puerta de entrada.',
  },
  {
    sku: 'WEB-003',
    nombre: 'Landing Page Profesional (5 secciones)',
    categoria: 'web',
    segmento: 'micro',
    precioAncla: 'desde $697',
    setup: 797,
    recurring: null,
    descripcionCorta:
      'Presencia Web nivel 2. Landing de una página, 5 secciones, diseño responsive a medida orientado a conversión.',
  },
  {
    sku: 'WEB-010',
    nombre: 'Website Profesional (hasta 10 páginas)',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $2,497',
    setup: 2997,
    recurring: null,
    descripcionCorta:
      'Presencia Web nivel 3. Sitio completo multi-página con navegación, blog, booking y pagos. Presencia digital integral.',
  },
  {
    sku: 'WEB-020',
    nombre: 'App Web Básica (hasta 3 módulos)',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $4,997',
    setup: 4997,
    recurring: null,
    descripcionCorta:
      'Presencia Web nivel 4. Software a medida acotado: dashboard, CRM o facturación con login y base de datos. Hasta 3 módulos.',
  },
  {
    sku: 'WEB-021',
    nombre: 'Marketplace / MVP',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $11,997',
    setup: 11997,
    recurring: null,
    descripcionCorta:
      'Presencia Web nivel 5. Plataforma multi-módulo con pagos y roles de usuario (tipo marketplace o MVP de producto).',
  },
  {
    sku: 'MKT-001',
    nombre: 'Configuración Redes Sociales (SOLO setup)',
    categoria: 'marketing',
    segmento: 'ambos',
    precioAncla: '$647',
    setup: 647,
    recurring: null,
    descripcionCorta:
      'SOLO setup: Meta Business Suite + 3 plataformas (IG + FB + GBP) + bios + 5 posts iniciales, listo para que tú lo manejes. NO incluye gestión.',
  },
  {
    sku: 'MKT-002',
    nombre: 'Identidad de Marca / Branding',
    categoria: 'marketing',
    segmento: 'ambos',
    precioAncla: 'desde $497',
    setup: 497,
    recurring: null,
    descripcionCorta:
      'Logo, paleta de colores, tipografía y diseño de etiquetas/empaques para tu marca.',
  },
  {
    sku: 'MKT-005',
    nombre: 'Google Business Profile Setup',
    categoria: 'marketing',
    segmento: 'micro',
    precioAncla: '$197',
    setup: 197,
    recurring: null,
    descripcionCorta:
      'Creación y optimización de la ficha de Google Business Profile.',
  },
  {
    sku: 'MKT-010',
    nombre: 'Automatización Social (auto-posting)',
    categoria: 'marketing',
    segmento: 'ambos',
    precioAncla: 'desde $197/mes',
    setup: 797,
    recurring: 197,
    descripcionCorta:
      'Workflow de generación IA + scheduling + posting automático multi-canal. Build inicial opcional.',
  },
  // MKT-011 (Gestión de Redes Administrada) ELIMINADO en v1.2 — no hay personal
  // para sostener gestión. La config inicial se ofrece como SOLO setup (MKT-001).
  // MKT-020 (Email Marketing) ARCHIVADO en v1.2 al backlog futuro (biblia §6.2).

  // ── 6.2 Automatización / Workflows (Nivel 1) ───────────────────────
  {
    sku: 'AUTO-002',
    nombre: 'Automatización Agéntica a Medida',
    categoria: 'automatizacion',
    segmento: 'ambos',
    precioAncla: 'setup desde $747 + retainer',
    setup: 747,
    recurring: 137,
    descripcionCorta:
      'Producto estrella: sistema agéntico scoped por diagnóstico (calificación de leads, cotizaciones, ops multi-sistema, documentos). Los flujos lineales son features, no producto. Retainer = operación.',
  },
  {
    sku: 'AUTO-010',
    nombre: 'Suite Automatización (3–5 workflows)',
    categoria: 'automatizacion',
    segmento: 'pequena',
    precioAncla: 'desde $1,997',
    setup: 1997,
    recurring: 357,
    descripcionCorta:
      'Diagnóstico + 3 a 5 workflows + dashboard + capacitación. Retainer SUP-010 $357/mes.',
  },
  {
    sku: 'AUTO-020',
    nombre: 'Suite Automatización Completa (6–10 workflows)',
    categoria: 'automatizacion',
    segmento: 'pequena',
    precioAncla: 'desde $3,997',
    setup: 3997,
    recurring: 717,
    descripcionCorta:
      'Auditoría + 6 a 10 workflows + chatbot + social media + soporte. Retainer SUP-020 $717/mes.',
  },
  // AUTO-001 (Workflow Individual N1) ahora es componente interno de cotización,
  // no tarjeta pública (flujos lineales commoditizados por MCP nativo, v1.2).
  // AUTO-003 (Workflow N1.5 IA puntual) idem — componente interno.
  // AUTO-030 (Sistema Reviews Automatizado) ARCHIVADO standalone en v1.2 (backlog).

  // ── 6.7 Operaciones (agéntico recurrente) ──────────────────────────
  {
    sku: 'OPS-001',
    nombre: 'Investigador de Mercado Semanal',
    categoria: 'operaciones',
    segmento: 'ambos',
    precioAncla: 'desde $97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Agente semanal que investiga tu nicho + tus 2 productos bandera → análisis de mercado al correo (tendencias, competencia, precios). $97/mes (entrada) / $147/mes (profundo). Señal pública curada + síntesis IA.',
  },

  // ── 6.3 Chatbots / Agentes IA (Nivel 2) ────────────────────────────
  {
    sku: 'BOT-001',
    nombre: 'Chatbot Express (plantilla WhatsApp)',
    categoria: 'chatbot',
    segmento: 'micro',
    precioAncla: '$597 + $297/mes',
    setup: 597,
    recurring: 297,
    descripcionCorta:
      'BOT Express (micro): plantilla WhatsApp FAQ + captura de lead. Setup rápido. Retainer $297/mes.',
  },
  {
    sku: 'BOT-002',
    nombre: 'Chatbot / Agente IA Custom Agéntico',
    categoria: 'chatbot',
    segmento: 'pequena',
    precioAncla: '$1,497 + $437/mes',
    setup: 1497,
    recurring: 437,
    descripcionCorta:
      'Agente IA agéntico a medida: RAG + agendamiento en vivo contra calendario + multimodal + integraciones. Ideal dental/estético. Retainer $437/mes.',
  },
  {
    sku: 'BOT-004',
    nombre: 'AI Chatbot Web',
    categoria: 'chatbot',
    segmento: 'ambos',
    precioAncla: 'desde $2,497 + $437/mes',
    setup: 2497,
    recurring: 437,
    descripcionCorta:
      'Chatbot IA embebido en el sitio web con knowledge base y escalación. Retainer $437/mes.',
  },
  {
    sku: 'BOT-VOZ',
    nombre: 'Voz / Llamadas IA (referido)',
    categoria: 'chatbot',
    segmento: 'ambos',
    precioAncla: 'integración + retainer',
    setup: null,
    recurring: null,
    descripcionCorta:
      'Integración y gestión sobre plataformas de terceros (Synthflow / Goodcall, ideal dental). NO se construye infra de voz; se integra y se gestiona.',
  },

  // ── 6.4 Finanzas ───────────────────────────────────────────────────
  {
    sku: 'FIN-001',
    nombre: 'Tablero Financiero Inteligente',
    categoria: 'finanzas',
    segmento: 'pequena',
    precioAncla: 'setup desde $997 + $147/mes',
    setup: 997,
    recurring: 147,
    descripcionCorta:
      'Bundle done-for-you de 3 capas: integración de datos + dashboard IA + asesoría. Visibilidad financiera diaria (refresh diario). NO es SOMATT (self-serve, marca aparte) ni un sistema contable completo. $147/mes (1h) o $197/mes (90min).',
  },

  // ── 6.5 Consultoría ────────────────────────────────────────────────
  {
    sku: 'CON-001',
    nombre: 'Consultoría Digital (por hora)',
    categoria: 'consultoria',
    segmento: 'ambos',
    precioAncla: '$197/hr',
    setup: 197,
    recurring: null,
    descripcionCorta: 'Sesión de consultoría 1-on-1 por hora.',
  },
  {
    sku: 'CON-002',
    nombre: 'Diagnóstico de Automatización IA',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: '$497 one-shot + retainer desde $1,497/mes',
    setup: 497,
    recurring: 1497,
    descripcionCorta:
      'One-shot $497: descubrimiento 90 min + auditoría + hoja de ruta priorizada + presentación. Acreditable a un proyecto. Retainer opcional.',
  },
  {
    sku: 'CON-010',
    nombre: 'Auditoría Presencia Digital',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: 'desde $1,497',
    setup: 1497,
    recurring: null,
    descripcionCorta:
      'Análisis completo de presencia digital + reporte + plan de acción.',
  },
  {
    sku: 'CON-020',
    nombre: 'Plan de Negocios Profesional',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: 'desde $4,997',
    setup: 4997,
    recurring: null,
    descripcionCorta:
      'Plan de negocios completo con análisis de mercado y proyecciones financieras.',
  },
  {
    sku: 'CON-030',
    nombre: 'Diagnóstico 3D (lead magnet)',
    categoria: 'consultoria',
    segmento: 'ambos',
    precioAncla: 'Gratis',
    setup: 0,
    recurring: null,
    descripcionCorta:
      'Evaluación gratuita de 30 min (Finanzas / Ops / Marketing). Lead magnet.',
  },

  // ── 6.6 Academy / Capacitación (2 dimensiones: 1-on-1 vs empresa) ───
  {
    sku: 'CAP-002',
    nombre: 'Academy — Sesión Esencial (1-on-1, 3h)',
    categoria: 'capacitacion',
    segmento: 'ambos',
    precioAncla: '$297',
    setup: 297,
    recurring: null,
    descripcionCorta:
      'Sesión privada 1-on-1 de 3h: configurar cuentas IA (Claude/Gemini) + Projects + NotebookLM + fundamentos + casos prácticos de tu negocio.',
  },
  {
    sku: 'CAP-003',
    nombre: 'Academy — Intensivo Personalizado (1-on-1, 6h)',
    categoria: 'capacitacion',
    segmento: 'ambos',
    precioAncla: '$497',
    setup: 497,
    recurring: null,
    descripcionCorta:
      'Sesión/multi-sesión 1-on-1 de 6h: lo de la Sesión Esencial + automatización + arquitectura de workflows + (premium opcional) terminal/Claude Code con MCPs.',
  },
  {
    sku: 'CAP-001',
    nombre: 'Academy — Taller Empresarial (grupo, flat)',
    categoria: 'capacitacion',
    segmento: 'pequena',
    precioAncla: '$1,497 (flat, no por persona)',
    setup: 1497,
    recurring: null,
    descripcionCorta:
      'Taller de capacitación en IA para todo el equipo/staff, precio flat por taller.',
  },

  // ── 6.7 SEO / Monitoreo ────────────────────────────────────────────
  {
    sku: 'SEO-001',
    nombre: 'SEO Local (setup + retainer)',
    categoria: 'seo',
    segmento: 'ambos',
    precioAncla: 'setup $397 + $127/mes',
    setup: 397,
    recurring: 127,
    descripcionCorta:
      'Optimización de SEO local (keywords, on-page, GBP) + monitoreo y mantenimiento continuo = SEO Sentinel aplicado. NO es campaña activa de contenido/links.',
  },

  // ── 6.8 Mantenimiento (retainers hosting/soporte) ──────────────────
  {
    sku: 'MNT-000',
    nombre: 'Mantenimiento Essentials (base)',
    categoria: 'mantenimiento',
    segmento: 'micro',
    precioAncla: '$97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Base sin asesoría: monitoreo + arreglo de APIs cuando se rompen + ajustes menores, hosting, SSL, uptime. Tier real de entrada.',
  },
  {
    sku: 'MNT-001',
    nombre: 'Mantenimiento Standard (base)',
    categoria: 'mantenimiento',
    segmento: 'micro',
    precioAncla: '$147/mes',
    setup: null,
    recurring: 147,
    descripcionCorta:
      'Base sin asesoría: workflow completo + soporte, hosting Vercel, SSL, monitoreo, 2 ajustes/mes, soporte por ticket.',
  },
  {
    sku: 'MNT-002',
    nombre: 'Add-on Asesoría/Revisión (1h)',
    categoria: 'mantenimiento',
    segmento: 'ambos',
    precioAncla: '+$147/mes',
    setup: null,
    recurring: 147,
    descripcionCorta:
      'Add-on de 1h de asesoría/revisión mensual sobre el mantenimiento base.',
  },
  {
    sku: 'MNT-003',
    nombre: 'Add-on Asesoría/Revisión (90min)',
    categoria: 'mantenimiento',
    segmento: 'ambos',
    precioAncla: '+$197/mes',
    setup: null,
    recurring: 197,
    descripcionCorta:
      'Add-on de 90min de asesoría/revisión mensual sobre el mantenimiento base.',
  },
  {
    sku: 'MNT-010',
    nombre: 'Mantenimiento Web Growth',
    categoria: 'mantenimiento',
    segmento: 'pequena',
    precioAncla: '$347/mes',
    setup: null,
    recurring: 347,
    descripcionCorta: 'Standard + 5 ajustes/mes + analytics mensual.',
  },
  {
    sku: 'MNT-020',
    nombre: 'Mantenimiento App Scale',
    categoria: 'mantenimiento',
    segmento: 'pequena',
    precioAncla: '$727/mes',
    setup: null,
    recurring: 727,
    descripcionCorta: 'Growth + DB + updates + ajustes ilimitados.',
  },
];

/**
 * PRODUCTOS RECURRENTES EMPAQUETADOS (#1–14) — biblia §7.
 * Templates de n8n empaquetados (subconjunto recurrente del catálogo).
 * `setup`/`recurring` reflejan el tier de entrada; el rango va en
 * `precioAncla` y `descripcionCorta`.
 */
export const PRODUCTOS: Servicio[] = [
  {
    sku: 'PRD-001',
    nombre: 'Captura Automática de Facturas de Proveedores',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: '$97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Un asistente de IA lee las facturas que te envían tus proveedores, extrae los datos (proveedor, monto, fecha, categoría) y los registra en tu Excel. NO genera facturas — organiza las que recibes. En producción.',
  },
  {
    sku: 'PRD-002',
    nombre: 'Lead Capture & Auto-Response',
    categoria: 'producto',
    segmento: 'micro',
    precioAncla: 'desde $97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Captura leads de formularios/canales y responde automáticamente. $97–197/mes. Template listo.',
  },
  {
    sku: 'PRD-003',
    nombre: 'WhatsApp AI Customer Service Bot',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $297/mes',
    setup: null,
    recurring: 297,
    descripcionCorta:
      'Atención al cliente conversacional 24/7. $297–497/mes. En producción (3 instancias activas).',
  },
  {
    sku: 'PRD-004',
    nombre: 'Daily Digest Agent v2',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $297/mes',
    setup: null,
    recurring: 297,
    descripcionCorta:
      'Resumen diario inteligente de métricas/inbox. $297–497/mes. Template v2.',
  },
  {
    sku: 'PRD-005',
    nombre: 'Appointment Scheduler Agent v2',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $297/mes',
    setup: null,
    recurring: 297,
    descripcionCorta:
      'Agenda citas y envía recordatorios. $297–497/mes. Template v2.',
  },
  {
    sku: 'PRD-006',
    nombre: 'Review & Reputation Manager v2',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $297/mes',
    setup: null,
    recurring: 297,
    descripcionCorta:
      'Monitorea y responde reviews, solicita nuevas. $297–497/mes. Template v2.',
  },
  {
    sku: 'PRD-007',
    nombre: 'AI Financial Dashboard Updater',
    categoria: 'producto',
    segmento: 'pequena',
    precioAncla: 'desde $697/mes',
    setup: null,
    recurring: 697,
    descripcionCorta:
      'Actualiza un dashboard financiero. $697–997/mes. Diseñado. No confundir con FIN-001 (proyecto) ni SOMATT (SaaS).',
  },
  {
    sku: 'PRD-008',
    nombre: 'Medical Bill Auditor (Colombia)',
    categoria: 'producto',
    segmento: 'pequena',
    precioAncla: 'por volumen',
    setup: null,
    recurring: null,
    descripcionCorta: 'Audita facturas médicas. Pricing por volumen. En discovery.',
  },
  {
    sku: 'PRD-009',
    nombre: 'Security Monitor',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $147/mes',
    setup: null,
    recurring: 147,
    descripcionCorta:
      'Scan semanal externo de headers de seguridad + reporte priorizado. $147 / $297 / $497/mes (3 tiers). Producción interna.',
  },
  {
    sku: 'PRD-010',
    nombre: 'Performance / UX Monitor',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: '$97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Scan semanal con PageSpeed Insights + Core Web Vitals + reporte con fixes Next.js. $97/mes. Diseñado.',
  },
  {
    sku: 'PRD-011',
    nombre: 'SEO Sentinel',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $127/mes',
    setup: null,
    recurring: 127,
    descripcionCorta:
      'Ingiere alertas reales de GSC, las correlaciona y produce fix Next.js. Single $127 / Multi $297 / Agency $597/mes. Diseñado.',
  },
  {
    sku: 'PRD-012',
    nombre: 'Brand / Investor Readiness Audit',
    categoria: 'producto',
    segmento: 'pequena',
    precioAncla: '$497 one-shot + $97/mes',
    setup: 497,
    recurring: 97,
    descripcionCorta:
      'Audita propiedades públicas contra el pitch del founder y produce checklist due-diligence. Retainer quincenal $97/mes. Diseñado.',
  },
  {
    sku: 'PRD-013',
    nombre: 'Investor Pipeline Builder',
    categoria: 'producto',
    segmento: 'pequena',
    precioAncla: '$297/mes',
    setup: null,
    recurring: 297,
    descripcionCorta:
      'Drafts semanales de emails fríos a inversionistas target (nunca envía sin OK). $297/mes. Diseñado.',
  },
  {
    sku: 'PRD-014',
    nombre: 'Cold Outreach Engine',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $197/mes',
    setup: null,
    recurring: 197,
    descripcionCorta:
      'Drafts diarios de emails fríos a prospectos B2B que matchean el ICP (nunca envía sin OK). Starter $197 / Growth $397 / Agency $797/mes. Diseñado.',
  },
];

/** Catálogo completo (facturables + productos empaquetados). */
export const CATALOGO: Servicio[] = [...SERVICIOS, ...PRODUCTOS];

/** Lookup por SKU. */
export function getServicioPorSku(sku: string): Servicio | undefined {
  return CATALOGO.find((s) => s.sku === sku);
}

/** Filtra por categoría. */
export function getServiciosPorCategoria(
  categoria: CategoriaServicio
): Servicio[] {
  return CATALOGO.filter((s) => s.categoria === categoria);
}
