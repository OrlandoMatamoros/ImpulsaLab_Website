import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentoria Personalizada en IA y Tecnologia',
  description: 'Mentoria 1-a-1 en inteligencia artificial, automatizacion y transformacion digital para tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion/mentoria-personalizada' },
}

export default function MentoriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
