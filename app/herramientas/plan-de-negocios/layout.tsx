import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Plan de Negocios AI Gratis | Impulsa Lab',
  description:
    'Crea un plan de negocios profesional en minutos con inteligencia artificial. Gratis, bilingue, disenado para pequenos negocios.',
  openGraph: {
    title: 'Generador de Plan de Negocios AI Gratis | Impulsa Lab',
    description:
      'Crea un plan de negocios profesional en minutos con inteligencia artificial. Gratis, bilingue, disenado para pequenos negocios.',
    url: 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
    siteName: 'Impulsa Lab',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
  },
}

export default function BusinessPlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
