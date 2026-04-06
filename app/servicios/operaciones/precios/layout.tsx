import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios de Automatizacion - Planes desde $97/mes',
  description: 'Planes claros de automatizacion: desde $500 setup + $97/mes por automatizacion individual, $2,000-$4,000 suite de 3-5 workflows. Sin costos ocultos para tu PYME.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
  },
  openGraph: {
    title: 'Precios de Automatizacion - Desde $97/mes',
    description: 'Planes claros sin costos ocultos: $500 setup + $97/mes individual, o suites $2,000-$4,000 para tu PYME.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Precios de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios de Automatizacion - Desde $97/mes',
    description: 'Planes claros sin costos ocultos: $500 setup + $97/mes individual, o suites $2,000-$4,000 para tu PYME.',
    images: ['/images/og-image.jpg'],
  },
}

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
