import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guias Practicas de IA y Transformacion Digital | Impulsa Lab',
  description: 'Guias paso a paso sobre inteligencia artificial, automatizacion y transformacion digital para PYMEs latinas. Descarga gratis.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/recursos/guias' },
  openGraph: {
    title: 'Guias Practicas de IA y Transformacion Digital',
    description: 'Guias paso a paso sobre IA, automatizacion y transformacion digital para PYMEs latinas.',
    url: 'https://www.tuimpulsalab.com/recursos/guias',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Guias' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guias Practicas de IA y Transformacion Digital',
    description: 'Guias paso a paso sobre IA, automatizacion y transformacion digital para PYMEs latinas.',
    images: ['/images/og-image.jpg'],
  },
}

export default function GuiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
