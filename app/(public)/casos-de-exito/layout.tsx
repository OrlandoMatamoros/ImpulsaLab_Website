import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Casos de Exito - Resultados Reales de PYMEs con IA',
  description: 'Descubre como PYMEs latinas han transformado sus negocios con Impulsa Lab. Resultados reales en finanzas, operaciones y marketing digital.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/casos-de-exito' },
  openGraph: {
    title: 'Casos de Exito - Resultados Reales de PYMEs con IA',
    description: 'PYMEs latinas que transformaron sus negocios con Impulsa Lab. Resultados reales en finanzas, operaciones y marketing.',
    url: 'https://www.tuimpulsalab.com/casos-de-exito',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Casos de Exito' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casos de Exito - Resultados Reales de PYMEs con IA',
    description: 'PYMEs latinas que transformaron sus negocios con Impulsa Lab. Resultados reales en finanzas, operaciones y marketing.',
    images: ['/images/og-image.jpg'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Casos de Éxito', path: '/casos-de-exito' },
])

export default function CasosLayout({ children }: { children: React.ReactNode }) {
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
