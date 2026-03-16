import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros - Conoce al Equipo',
  description: 'Conoce al equipo detras de Impulsa Lab. Expertos en transformacion digital, IA y consultoria para PYMEs latinas.',
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
