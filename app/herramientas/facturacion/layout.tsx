import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturacion | Impulsa Lab',
  description: 'Herramienta interna - Sistema de facturacion Impulsa Lab',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FacturacionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
