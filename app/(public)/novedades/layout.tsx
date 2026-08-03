import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Novedades - Registro de Cambios de Impulsa Lab',
  description: 'Todo lo que publicamos en el sitio y en SOMATT, con su fecha. Cada entrada corresponde a un cambio realmente publicado, sin adjetivos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/novedades' },
  openGraph: {
    title: 'Novedades - Registro de Cambios de Impulsa Lab',
    description: 'Cada cambio que publicamos en el sitio y en SOMATT, con su fecha. Qué cambió y para qué sirve.',
    url: 'https://www.tuimpulsalab.com/novedades',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Novedades' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novedades - Registro de Cambios de Impulsa Lab',
    description: 'Cada cambio que publicamos en el sitio y en SOMATT, con su fecha. Qué cambió y para qué sirve.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Novedades', path: '/novedades' },
])

export default function NovedadesLayout({ children }: { children: React.ReactNode }) {
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
