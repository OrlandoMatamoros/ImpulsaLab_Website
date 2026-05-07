import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacitacion en IA para tu Equipo NYC — Impulsa Academy',
  description: 'Talleres presenciales en NYC (2-12h) para equipos y mentoria 1-a-1. Aprende IA y automatizacion aplicada a tu negocio. Consulta gratuita disponible. Desde $300.',
  keywords: 'capacitación en IA, mentoría tecnológica, formación digital, automatización empresarial, transformación digital',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion' },
  openGraph: {
    title: 'Capacitacion en IA para tu Equipo NYC — Impulsa Academy',
    description: 'Talleres presenciales en NYC (2-12h) para equipos y mentoria 1-a-1. Aprende IA y automatizacion aplicada a tu negocio. Consulta gratuita disponible. Desde $300.',
    url: 'https://www.tuimpulsalab.com/capacitacion',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Academy - Capacitación en IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capacitacion en IA para tu Equipo NYC — Impulsa Academy',
    description: 'Talleres presenciales en NYC (2-12h) para equipos y mentoria 1-a-1. Aprende IA y automatizacion aplicada a tu negocio. Consulta gratuita disponible. Desde $300.',
    images: ['/images/og-image.jpg'],
  },
}

export default function CapacitacionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {children}
    </div>
  )
}
