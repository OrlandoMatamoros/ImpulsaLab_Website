import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.tuimpulsalab.com'

// NOTE: Blog posts, /recursos/guias, /recursos/webinars are placeholder pages
// ("Artículo en desarrollo") and are INTENTIONALLY excluded from the sitemap
// until real content exists. Including them causes Google to mark them
// "Crawled — currently not indexed" due to thin/duplicate content, and hurts
// the whole site's indexing signal. Re-add each URL here only after its
// real content is published.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Solo incluir rutas con contenido sustancial y valor SEO.
  // Excluidas: /status, /api-docs, /docs/* (técnicas), rutas auth, /gracias,
  // placeholders "en desarrollo" (blog posts, recursos/*).
  const publicRoutes = [
    // Páginas principales
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contacto', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/casos-de-exito', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/diagnostico', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/ayuda', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/carreras', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/partners', priority: 0.5, changeFrequency: 'monthly' as const },
    // Servicios
    { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/finanzas', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/agentes', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/proceso', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/plataformas', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/precios', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/arsenal', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing', priority: 0.9, changeFrequency: 'monthly' as const },
    // Capacitación
    { path: '/capacitacion', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/capacitacion/mentoria-personalizada', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/capacitacion/equipos-empresariales', priority: 0.6, changeFrequency: 'monthly' as const },
    // Herramientas
    { path: '/herramientas', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/herramientas/arsenal', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/herramientas/agentes', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/herramientas/agentes/junta-estrategica', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/herramientas/noticias', priority: 0.7, changeFrequency: 'monthly' as const },
    // Legal (baja prioridad pero necesarias)
    { path: '/legal/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/datos', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return publicRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
