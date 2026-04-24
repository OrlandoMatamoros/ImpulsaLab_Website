import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFO en tu Excel con IA - Finanzas Inteligentes para PYMEs',
  description: 'Automatiza tus procesos financieros con IA. Dashboards inteligentes, proyecciones y analisis de riesgo para tu PYME latina. Desde $250 USD.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/finanzas',
  },
  openGraph: {
    title: 'CFO en tu Excel con IA - Finanzas Inteligentes para PYMEs',
    description: 'Dashboards inteligentes, proyecciones y analisis de riesgo automatizados con IA. Desde $250 USD.',
    url: 'https://www.tuimpulsalab.com/servicios/finanzas',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - CFO en tu Excel con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CFO en tu Excel con IA - Finanzas Inteligentes para PYMEs',
    description: 'Dashboards inteligentes, proyecciones y analisis de riesgo automatizados con IA. Desde $250 USD.',
    images: ['/images/og-image.jpg'],
  },
}

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
