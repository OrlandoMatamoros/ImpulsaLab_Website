import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impulsa Academy - Capacitación en Tecnología e IA',
  description: 'Mentoría personalizada y capacitación corporativa en tecnología, IA y transformación digital. Desde $300 USD.',
  keywords: 'capacitación en IA, mentoría tecnológica, formación digital, automatización empresarial, transformación digital',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion' },
  openGraph: {
    title: 'Impulsa Academy - Transforma tu negocio con tecnología',
    description: 'Mentoría 1-a-1 ($300) o capacitación para equipos ($500). Expertos en IA y transformación digital.',
    type: 'website',
  }
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
