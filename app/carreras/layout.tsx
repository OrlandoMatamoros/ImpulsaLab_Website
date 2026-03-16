import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carreras - Trabaja con Nosotros',
  description: 'Explora oportunidades de carrera en Impulsa Lab. Buscamos talento apasionado por la IA y transformacion digital.',
}

export default function CarrerasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
