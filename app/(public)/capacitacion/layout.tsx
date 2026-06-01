import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cursos de IA y Capacitación para Equipos NYC',
  description: 'Cursos de inteligencia artificial y talleres presenciales en NYC para equipos y mentoría 1-a-1. Aprende IA aplicada a tu negocio con resultados inmediatos. Consulta gratuita. Desde $297.',
  keywords: 'cursos de IA, cursos de inteligencia artificial, capacitación en IA, mentoría tecnológica, formación digital, automatización empresarial, NYC',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion' },
  openGraph: {
    title: 'Cursos de IA y Capacitación para Equipos NYC — Impulsa Lab',
    description: 'Cursos de inteligencia artificial y talleres presenciales en NYC para equipos y mentoría 1-a-1. Aprende IA aplicada a tu negocio con resultados inmediatos. Consulta gratuita. Desde $297.',
    url: 'https://www.tuimpulsalab.com/capacitacion',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Academy - Cursos de IA NYC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursos de IA y Capacitación para Equipos NYC — Impulsa Lab',
    description: 'Cursos de inteligencia artificial y talleres presenciales en NYC para equipos y mentoría 1-a-1. Aprende IA aplicada a tu negocio con resultados inmediatos. Consulta gratuita. Desde $297.',
    images: ['/opengraph-image.png?v=2'],
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
