import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Consultoría en IA y Automatización para PYMEs',
  description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
  // Canonical apunta a /servicios/consultoria-ia-para-pymes (no a sí misma) para resolver
  // canibalización de keyword: ambas páginas competían por "Consultoría en IA ... para PYMEs".
  // Este hub es un directorio de navegación (4 tarjetas a Finanzas/Operaciones/Marketing/
  // Capacitación) sin intención transaccional propia; la landing es la página con FAQ +
  // Service schema + precio, ya marcada en su propio código como la canónica de esa keyword.
  // Ver diagnóstico 2026-08-10 (~/master-reports/2026-08-10_seo_gbp_diagnostico.md, sección
  // "Fase 1 ejecutada") para el detalle de por qué NO se tocó el canonical del home ni el de
  // /es/automatizacion-ia-pequenos-negocios en esta misma pasada.
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/consultoria-ia-para-pymes',
  },
  openGraph: {
    title: 'Consultoría en IA y Automatización para PYMEs | Impulsa Lab',
    description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
    url: 'https://www.tuimpulsalab.com/servicios',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Consultoría en IA y Automatización para PYMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría en IA y Automatización para PYMEs | Impulsa Lab',
    description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
])

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
