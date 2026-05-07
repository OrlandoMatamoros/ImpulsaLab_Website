import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Junta Estratégica AI | 4 cerebros, 1 decisión | Impulsa Lab',
  description:
    'Convoca una junta directiva virtual con Claude, Gemini y GPT. Decisiones estratégicas con consenso multi-AI. Disponible para clientes Enterprise.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/herramientas/agentes/junta-estrategica',
  },
  openGraph: {
    title: 'Junta Estratégica AI — Impulsa Lab',
    description:
      'Convoca una junta directiva virtual con 3 directores AI + NOVA moderadora. 4 cerebros, 1 decisión, cero sesgo.',
    url: 'https://www.tuimpulsalab.com/herramientas/agentes/junta-estrategica',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Junta Estratégica AI - Impulsa Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junta Estratégica AI — Impulsa Lab',
    description:
      'Convoca una junta directiva virtual con 3 directores AI + NOVA moderadora.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Herramientas', path: '/herramientas' },
  { name: 'Agentes', path: '/herramientas/agentes' },
  { name: 'Junta Estratégica AI', path: '/herramientas/agentes/junta-estrategica' },
])

export default function JuntaEstrategicaLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
