import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Designer para Claude, GPT y Gemini | Impulsa Lab',
  description:
    'Crea prompts profesionales para Claude, GPT y Gemini con nuestra herramienta gratuita. Templates por industria, wizard guiado y optimizador con IA incluidos.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/herramientas/prompt-designer',
  },
  openGraph: {
    title: 'Prompt Designer para Claude, GPT y Gemini | Impulsa Lab',
    description:
      'Arma prompts con formato optimo para cada modelo. Templates por industria y optimizador con IA.',
    url: 'https://www.tuimpulsalab.com/herramientas/prompt-designer',
    type: 'website',
    images: [
      { url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Prompt Designer' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Designer para Claude, GPT y Gemini | Impulsa Lab',
    description:
      'Arma prompts con formato optimo para cada modelo. Templates y optimizador con IA.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function PromptDesignerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
