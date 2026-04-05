import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios de Automatizacion - Planes desde $97/mes',
  description: 'Planes claros de automatizacion: desde $500 setup + $97/mes por automatizacion individual, $2,000-$4,000 suite de 3-5 workflows. Sin costos ocultos para tu PYME.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
  },
}

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
