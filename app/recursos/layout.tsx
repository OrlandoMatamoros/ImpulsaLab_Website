import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos - Guias y Webinars',
  description: 'Guias practicas y webinars sobre transformacion digital, IA y automatizacion para hacer crecer tu negocio.',
}

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
