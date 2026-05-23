import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webinars sobre IA y Automatizacion para Negocios | Impulsa Lab',
  description: 'Webinars gratuitos sobre inteligencia artificial, automatizacion y transformacion digital para PYMEs latinas en Estados Unidos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/recursos/webinars' },
  // Placeholder "En desarrollo" — excluded from indexing until real content exists.
  // Remove this line when webinars are published.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Webinars sobre IA y Automatizacion para Negocios',
    description: 'Webinars gratuitos sobre IA, automatizacion y transformacion digital para PYMEs latinas.',
    url: 'https://www.tuimpulsalab.com/recursos/webinars',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Webinars' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webinars sobre IA y Automatizacion para Negocios',
    description: 'Webinars gratuitos sobre IA, automatizacion y transformacion digital para PYMEs latinas.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function WebinarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
