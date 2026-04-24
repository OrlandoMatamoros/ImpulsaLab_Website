import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proceso de Automatizacion - Como Trabajamos',
  description: 'Nuestro proceso de automatizacion paso a paso: diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/proceso',
  },
  openGraph: {
    title: 'Proceso de Automatizacion - Como Trabajamos',
    description: 'Diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/proceso',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Proceso de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proceso de Automatizacion - Como Trabajamos',
    description: 'Diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
    images: ['/images/og-image.jpg'],
  },
}

export default function ProcesoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
