import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plataformas de Automatizacion - n8n, Make y mas',
  description: 'Integramos las mejores plataformas de automatizacion: n8n, Make, Zapier y herramientas custom para conectar todos los sistemas de tu negocio.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/plataformas',
  },
}

export default function PlataformasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
