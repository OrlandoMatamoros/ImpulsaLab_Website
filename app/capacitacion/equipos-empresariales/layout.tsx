import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacitacion para Equipos Empresariales',
  description: 'Capacitacion corporativa en IA, automatizacion y transformacion digital para equipos de trabajo.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion/equipos-empresariales' },
}

export default function EquiposLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
