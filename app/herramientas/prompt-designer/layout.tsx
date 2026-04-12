import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Designer Gratis para IA | Impulsa Lab',
  description:
    'Construye prompts profesionales paso a paso con plantillas por industria (marketing, desarrollo, educacion, negocios). Gratis, sin registro.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/herramientas/prompt-designer',
  },
  openGraph: {
    title: 'Prompt Designer Gratis para IA | Impulsa Lab',
    description:
      'Construye prompts profesionales paso a paso con plantillas por industria. Gratis, sin registro.',
    url: 'https://www.tuimpulsalab.com/herramientas/prompt-designer',
    type: 'website',
    images: [
      { url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Prompt Designer' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Designer Gratis para IA | Impulsa Lab',
    description: 'Construye prompts profesionales paso a paso con plantillas por industria.',
    images: ['/images/og-image.jpg'],
  },
}

export default function PromptDesignerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
