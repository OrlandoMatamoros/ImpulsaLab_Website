import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners - Programa de Aliados',
  description: 'Unete al programa de partners de Impulsa Lab. Colabora con nosotros para llevar soluciones de IA a mas empresas.',
  robots: { index: false, follow: true },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
