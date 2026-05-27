import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan de Negocios con IA Gratis para tu PYME | Impulsa Lab',
  description:
    'Crea un plan de negocios profesional en minutos con IA. 10 secciones, proyecciones financieras a 3 años y exportación a PDF. Herramienta gratis.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
    languages: {
      'es-US': 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
      'en-US': 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
    },
  },
  openGraph: {
    title: 'Plan de Negocios con IA Gratis para tu PYME | Impulsa Lab',
    description:
      'Crea un plan de negocios profesional en minutos con IA. 10 secciones, proyecciones financieras y PDF listo para inversores.',
    url: 'https://www.tuimpulsalab.com/herramientas/plan-de-negocios',
    siteName: 'Impulsa Lab',
    locale: 'es_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Impulsa Lab — Generador de Plan de Negocios con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan de Negocios con IA Gratis para tu PYME | Impulsa Lab',
    description:
      'Crea un plan de negocios profesional en minutos con IA. 10 secciones + proyecciones financieras + PDF.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function BusinessPlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
