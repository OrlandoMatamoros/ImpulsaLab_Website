/**
 * CATÁLOGO CANÓNICO DE SERVICIOS — IMPULSA LAB 2026
 *
 * Fuente única de verdad para precios y nombres en el sitio web.
 * Derivado de:
 *   OneDrive/Impulsa Lab/01_Catalogo_y_Servicios/Catalogo_Maestro/
 *   BIBLIA_SERVICIOS_IMPULSA_2026.md (v1.1 SELLADA, 2026-05-22)
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
    precioAncla: 'desde $200',
    setup: 200,
    recurring: 15,
    descripcionCorta:
      'Landing de una página como destino para Google Business Profile. Puerta de entrada (no se publica sola).',
  },
  {
    sku: 'WEB-003',
    nombre: 'Landing Page Profesional (5 secciones)',
    categoria: 'web',
    segmento: 'micro',
    precioAncla: 'desde $700',
    setup: 800,
    recurring: null,
    descripcionCorta:
      'Landing de una página, 5 secciones, diseño responsive a medida orientado a conversión. No es un website.',
  },
  {
    sku: 'WEB-010',
    nombre: 'Website Profesional (hasta 10 páginas)',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $2,500',
    setup: 3000,
    recurring: null,
    descripcionCorta:
      'Sitio completo multi-página con navegación, blog, booking y pagos. Presencia digital integral.',
  },
  {
    sku: 'WEB-020',
    nombre: 'App Web Básica (hasta 3 módulos)',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $5,000',
    setup: 5000,
    recurring: null,
    descripcionCorta:
      'Software a medida acotado: dashboard, CRM o facturación con login y base de datos. Hasta 3 módulos.',
  },
  {
    sku: 'WEB-021',
    nombre: 'Marketplace / MVP',
    categoria: 'web',
    segmento: 'pequena',
    precioAncla: 'desde $12,000',
    setup: 12000,
    recurring: null,
    descripcionCorta:
      'Plataforma multi-módulo con pagos y roles de usuario (tipo marketplace o MVP de producto).',
  },
  {
    sku: 'MKT-001',
    nombre: 'Configuración Redes Sociales (3 plataformas)',
    categoria: 'marketing',
    segmento: 'ambos',
    precioAncla: 'desde $650',
    setup: 650,
    recurring: null,
    descripcionCorta:
      'Setup de Instagram + Facebook + GBP con branding y 5 posts iniciales.',
  },
  {
    sku: 'MKT-005',
    nombre: 'Google Business Profile Setup',
    categoria: 'marketing',
    segmento: 'micro',
    precioAncla: 'desde $200',
    setup: 200,
    recurring: null,
    descripcionCorta:
      'Creación y optimización de la ficha de Google Business Profile.',
  },
  {
    sku: 'MKT-010',
    nombre: 'Automatización Social (auto-posting)',
    categoria: 'marketing',
    segmento: 'ambos',
    precioAncla: 'desde $196/mes',
    setup: 800,
    recurring: 196,
    descripcionCorta:
      'Workflow de generación IA + scheduling + posting automático multi-canal. Build inicial opcional.',
  },
  {
    sku: 'MKT-011',
    nombre: 'Gestión de Redes Administrada',
    categoria: 'marketing',
    segmento: 'pequena',
    precioAncla: 'desde $700/mes',
    setup: null,
    recurring: 700,
    descripcionCorta:
      'Servicio gestionado: creación de contenido bilingüe, calendario editorial, posteo y reporte mensual.',
  },
  {
    sku: 'MKT-020',
    nombre: 'Email Marketing (3 secuencias)',
    categoria: 'marketing',
    segmento: 'pequena',
    precioAncla: 'desde $1,000',
    setup: 1000,
    recurring: null,
    descripcionCorta:
      'Templates + 3 secuencias automatizadas + segmentación.',
  },

  // ── 6.2 Automatización / Workflows (Nivel 1) ───────────────────────
  {
    sku: 'AUTO-001',
    nombre: 'Workflow Individual (Nivel 1)',
    categoria: 'automatizacion',
    segmento: 'ambos',
    precioAncla: 'desde $400',
    setup: 400,
    recurring: 134,
    descripcionCorta:
      'Un workflow lineal sin IA (trigger → acción → resultado), vendido suelto. Retainer opcional SUP-001 $134/mes.',
  },
  {
    sku: 'AUTO-002',
    nombre: 'Paquete Automatización Starter',
    categoria: 'automatizacion',
    segmento: 'ambos',
    precioAncla: 'desde $750',
    setup: 750,
    recurring: 134,
    descripcionCorta:
      'Paquete de entrada vendible: 1 workflow + onboarding + primer mes de soporte. Retainer desde $134/mes (2º mes).',
  },
  {
    sku: 'AUTO-003',
    nombre: 'Workflow Nivel 1.5 (IA puntual)',
    categoria: 'automatizacion',
    segmento: 'ambos',
    precioAncla: 'desde $500',
    setup: 500,
    recurring: 143,
    descripcionCorta:
      'Workflow con un nodo de IA puntual (ej. procesamiento de facturas). Retainer SUP-002 $143/mes.',
  },
  {
    sku: 'AUTO-010',
    nombre: 'Suite Automatización (3–5 workflows)',
    categoria: 'automatizacion',
    segmento: 'pequena',
    precioAncla: 'desde $2,000',
    setup: 2000,
    recurring: 356,
    descripcionCorta:
      'Diagnóstico + 3 a 5 workflows + dashboard + capacitación. Retainer SUP-010 $356/mes.',
  },
  {
    sku: 'AUTO-020',
    nombre: 'Suite Automatización Completa (6–10 workflows)',
    categoria: 'automatizacion',
    segmento: 'pequena',
    precioAncla: 'desde $4,000',
    setup: 4000,
    recurring: 716,
    descripcionCorta:
      'Auditoría + 6 a 10 workflows + chatbot + social media + soporte. Retainer SUP-020 $716/mes.',
  },
  {
    sku: 'AUTO-030',
    nombre: 'Sistema Reviews Automatizado',
    categoria: 'automatizacion',
    segmento: 'ambos',
    precioAncla: 'desde $800',
    setup: 800,
    recurring: null,
    descripcionCorta:
      'Monitoreo de GBP + respuestas con IA + solicitud automática de reviews.',
  },

  // ── 6.3 Chatbots / Agentes IA (Nivel 2) ────────────────────────────
  {
    sku: 'BOT-001',
    nombre: 'Chatbot Express (plantilla WhatsApp)',
    categoria: 'chatbot',
    segmento: 'micro',
    precioAncla: 'desde $600 + $297/mes',
    setup: 600,
    recurring: 297,
    descripcionCorta:
      'Bot de plantilla WhatsApp: FAQ + captura de lead. Setup rápido. Retainer desde $297/mes.',
  },
  {
    sku: 'BOT-002',
    nombre: 'Chatbot Custom (flujos + integraciones)',
    categoria: 'chatbot',
    segmento: 'pequena',
    precioAncla: 'desde $2,500 + $297/mes',
    setup: 2500,
    recurring: 437,
    descripcionCorta:
      'Agente IA a medida con knowledge base (RAG), voz e integraciones. Retainer $437/mes (ancla pública desde $297/mes).',
  },
  {
    sku: 'BOT-004',
    nombre: 'AI Chatbot Web',
    categoria: 'chatbot',
    segmento: 'ambos',
    precioAncla: 'desde $2,500 + $297/mes',
    setup: 2500,
    recurring: 437,
    descripcionCorta:
      'Chatbot IA embebido en el sitio web con knowledge base y escalación. Retainer $437/mes.',
  },

  // ── 6.4 Finanzas ───────────────────────────────────────────────────
  {
    sku: 'FIN-001',
    nombre: 'Dashboard Financiero con IA (PROYECTO)',
    categoria: 'finanzas',
    segmento: 'pequena',
    precioAncla: '$2,000 setup + $197/mes',
    setup: 2000,
    recurring: 197,
    descripcionCorta:
      'PROYECTO a medida (NO SaaS): KPIs, gráficos, análisis IA y conexión POS/contabilidad. El SaaS de finanzas es SOMATT (marca aparte).',
  },

  // ── 6.5 Consultoría ────────────────────────────────────────────────
  {
    sku: 'CON-001',
    nombre: 'Consultoría Digital (por hora)',
    categoria: 'consultoria',
    segmento: 'ambos',
    precioAncla: '$200/hr',
    setup: 200,
    recurring: null,
    descripcionCorta: 'Sesión de consultoría 1-on-1 por hora.',
  },
  {
    sku: 'CON-002',
    nombre: 'Diagnóstico de Automatización IA',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: '$497 one-shot + retainer desde $1,500/mes',
    setup: 497,
    recurring: 1500,
    descripcionCorta:
      'One-shot $497: descubrimiento 90 min + auditoría + hoja de ruta priorizada + presentación. Acreditable a un proyecto. Retainer opcional.',
  },
  {
    sku: 'CON-010',
    nombre: 'Auditoría Presencia Digital',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: 'desde $1,500',
    setup: 1500,
    recurring: null,
    descripcionCorta:
      'Análisis completo de presencia digital + reporte + plan de acción.',
  },
  {
    sku: 'CON-020',
    nombre: 'Plan de Negocios Profesional',
    categoria: 'consultoria',
    segmento: 'pequena',
    precioAncla: 'desde $5,000',
    setup: 5000,
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

  // ── 6.6 Capacitación ───────────────────────────────────────────────
  {
    sku: 'CAP-001',
    nombre: 'Taller IA Grupal (flat, medio día)',
    categoria: 'capacitacion',
    segmento: 'pequena',
    precioAncla: 'desde $1,500 (flat, no por persona)',
    setup: 1500,
    recurring: null,
    descripcionCorta:
      'Taller de capacitación en IA para todo el equipo, precio flat por taller. Medio día.',
  },
  {
    sku: 'CAP-002',
    nombre: 'Mentoría / Sesión Privada IA',
    categoria: 'capacitacion',
    segmento: 'ambos',
    precioAncla: 'desde $600 / 2h',
    setup: 600,
    recurring: null,
    descripcionCorta:
      'Mentoría privada 1-on-1 de capacitación en IA. Tiers $200 / $349 / $899 según duración.',
  },

  // ── 6.7 SEO / Monitoreo ────────────────────────────────────────────
  {
    sku: 'SEO-001',
    nombre: 'SEO Local (setup + retainer)',
    categoria: 'seo',
    segmento: 'ambos',
    precioAncla: 'setup desde $400 + desde $297/mes',
    setup: 400,
    recurring: 297,
    descripcionCorta:
      'Optimización de SEO local (keywords, on-page, GBP) + monitoreo y mejora continua.',
  },

  // ── 6.8 Mantenimiento (retainers hosting/soporte) ──────────────────
  {
    sku: 'MNT-000',
    nombre: 'Mantenimiento Essentials',
    categoria: 'mantenimiento',
    segmento: 'micro',
    precioAncla: '$97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Monitoreo + 1 workflow ligero, hosting, SSL, uptime. Tier real de entrada (no es gancho falso).',
  },
  {
    sku: 'MNT-001',
    nombre: 'Mantenimiento Standard',
    categoria: 'mantenimiento',
    segmento: 'micro',
    precioAncla: '$148/mes',
    setup: null,
    recurring: 148,
    descripcionCorta:
      'Workflow completo + soporte: hosting Vercel, SSL, monitoreo, 2 ajustes/mes, soporte por ticket.',
  },
  {
    sku: 'MNT-010',
    nombre: 'Mantenimiento Web Growth',
    categoria: 'mantenimiento',
    segmento: 'pequena',
    precioAncla: '$349/mes',
    setup: null,
    recurring: 349,
    descripcionCorta: 'Standard + 5 ajustes/mes + analytics mensual.',
  },
  {
    sku: 'MNT-020',
    nombre: 'Mantenimiento App Scale',
    categoria: 'mantenimiento',
    segmento: 'pequena',
    precioAncla: '$726/mes',
    setup: null,
    recurring: 726,
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
    nombre: 'Smart Invoice Tracker',
    categoria: 'producto',
    segmento: 'ambos',
    precioAncla: 'desde $97/mes',
    setup: null,
    recurring: 97,
    descripcionCorta:
      'Rastrea facturas pendientes y envía recordatorios. $97 (Essentials) / $197 (Standard). En producción.',
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
