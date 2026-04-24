import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Consultoria Digital con IA para PYMEs',
  description: 'Soluciones de inteligencia de negocio en Finanzas, Operaciones y Marketing para PYMEs latinas en Nueva York. Desde $500 USD.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios',
  },
  openGraph: {
    title: 'Servicios de Consultoria Digital con IA para PYMEs',
    description: 'Finanzas, Operaciones y Marketing con IA para PYMEs latinas en Nueva York. Desde $500 USD.',
    url: 'https://www.tuimpulsalab.com/servicios',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Servicios' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Consultoria Digital con IA para PYMEs',
    description: 'Finanzas, Operaciones y Marketing con IA para PYMEs latinas en Nueva York. Desde $500 USD.',
    images: ['/images/og-image.jpg'],
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
