import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios de Automatizacion - Planes desde $200',
  description: 'Planes claros de automatizacion: $200 por automatizacion individual, $500 pack de 3, o $1000 sistema completo. Sin costos ocultos para tu PYME.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
  },
}

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
