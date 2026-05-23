import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Blog de IA y Automatización para Negocios Latinos | Impulsa Lab',
  description: 'Artículos y guías prácticas sobre IA, automatización y transformación digital para PYMEs latinas en EE.UU. Nuevos contenidos cada semana en Impulsa Lab.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/blog' },
  openGraph: {
    title: 'Blog de IA y Automatización para Negocios Latinos | Impulsa Lab',
    description: 'Artículos y guías prácticas sobre IA, automatización y transformación digital para PYMEs latinas en EE.UU. Nuevos contenidos cada semana.',
    url: 'https://www.tuimpulsalab.com/blog',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Blog de IA y Automatización' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de IA y Automatización para Negocios Latinos | Impulsa Lab',
    description: 'Artículos y guías prácticas sobre IA, automatización y transformación digital para PYMEs latinas en EE.UU. Nuevos contenidos cada semana.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Blog', path: '/blog' },
])

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
