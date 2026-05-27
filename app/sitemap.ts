import { MetadataRoute } from 'next'
import { listSlugs, getPostBySlug } from '@/lib/blog'

const BASE_URL = 'https://www.tuimpulsalab.com'

// NOTE: /recursos/guias, /recursos/webinars are placeholder pages and are
// INTENTIONALLY excluded until real content exists. Blog posts are now
// included dynamically — only slugs that have real MDX content in
// content/blog/es/ are emitted here.
// Excluded: /status, /api-docs, /docs/* (technical), auth routes, /gracias,
// /herramientas/facturacion (auth-gated), /herramientas/auditoria-web (auth-gated).

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Solo incluir rutas con contenido sustancial y valor SEO.
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
    // Servicios
    { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/consultoria-ia-para-pymes', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/finanzas', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/agentes', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/proceso', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/plataformas', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/operaciones/arsenal', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing', priority: 0.9, changeFrequency: 'monthly' as const },
    // Capacitación
    { path: '/capacitacion', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/capacitacion/mentoria-personalizada', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/capacitacion/equipos-empresariales', priority: 0.6, changeFrequency: 'monthly' as const },
    // Herramientas (public, no auth-gated)
    { path: '/herramientas', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/herramientas/arsenal', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/herramientas/agentes', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/herramientas/agentes/junta-estrategica', priority: 0.8, changeFrequency: 'monthly' as const },
    // /herramientas/noticias excluida del sitemap (noindex — CTR 0% en queries irrelevantes)
    { path: '/herramientas/prompt-designer', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/herramientas/plan-de-negocios', priority: 0.7, changeFrequency: 'monthly' as const },
    // Legal (baja prioridad pero necesarias)
    { path: '/legal/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/datos', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Blog posts — dynamic from content/blog/es/*.mdx
  // Uses the post's own `date` frontmatter as lastModified so Googlebot
  // knows which posts were recently updated.
  const slugs = await listSlugs()
  const blogRaw = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug, 'es')
      if (!post) return null
      return {
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    }),
  )
  const blogEntries: MetadataRoute.Sitemap = blogRaw.filter(
    (e): e is NonNullable<typeof e> => e !== null,
  )

  return [...staticEntries, ...blogEntries]
}
