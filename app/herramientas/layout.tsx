import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Herramientas de IA para Negocios',
  description: 'Accede a nuestro arsenal de herramientas de IA: agentes inteligentes, prompt designer, noticias y mas para tu empresa.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas' },
}

export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
