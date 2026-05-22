import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacitacion en IA para Equipos Empresariales',
  description: 'Capacitacion corporativa en inteligencia artificial, automatizacion y transformacion digital para equipos de trabajo. Taller flat $1,497.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion/equipos-empresariales' },
  openGraph: {
    title: 'Capacitacion en IA para Equipos Empresariales',
    description: 'Capacitacion corporativa en IA y automatizacion para equipos de trabajo. Taller flat $1,497.',
    url: 'https://www.tuimpulsalab.com/capacitacion/equipos-empresariales',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Capacitacion Empresarial' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capacitacion en IA para Equipos Empresariales',
    description: 'Capacitacion corporativa en IA y automatizacion para equipos de trabajo. Taller flat $1,497.',
    images: ['/images/og-image.jpg'],
  },
}

export default function EquiposLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
