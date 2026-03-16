import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Casos de Exito',
  description: 'Descubre como PYMEs han transformado sus negocios con Impulsa Lab. Resultados reales en finanzas, operaciones y marketing.',
}

export default function CasosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
