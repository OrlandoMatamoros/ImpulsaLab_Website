import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatizacion IA para PYMEs Latinas NYC — Impulsa Lab',
  description: 'Somos el equipo tecnico de tu PYME. Automatizamos operaciones, WhatsApp, facturacion y marketing con IA. Basados en Brooklyn, NY — 100% en español. Conocenos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/nosotros' },
  openGraph: {
    title: 'Automatizacion IA para PYMEs Latinas NYC — Impulsa Lab',
    description: 'Somos el equipo tecnico de tu PYME. Automatizamos operaciones, WhatsApp, facturacion y marketing con IA. Basados en Brooklyn, NY — 100% en español. Conocenos.',
    url: 'https://www.tuimpulsalab.com/nosotros',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Nuestro Equipo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatizacion IA para PYMEs Latinas NYC — Impulsa Lab',
    description: 'Somos el equipo tecnico de tu PYME. Automatizamos operaciones, WhatsApp, facturacion y marketing con IA. Basados en Brooklyn, NY — 100% en español. Conocenos.',
    images: ['/images/og-image.jpg'],
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
