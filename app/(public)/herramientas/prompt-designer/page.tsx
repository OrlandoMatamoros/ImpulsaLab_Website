import { Sparkles } from 'lucide-react'
import PromptDesignerClient from './PromptDesignerClient'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Prompt Designer',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Herramienta gratuita para construir prompts profesionales para Claude, GPT-4 y Gemini. Templates por industria y optimizador con IA.',
  url: 'https://www.tuimpulsalab.com/herramientas/prompt-designer',
  provider: {
    '@type': 'Organization',
    name: 'Impulsa Lab',
    url: 'https://www.tuimpulsalab.com',
  },
}

export default function PromptDesignerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#00BCD4]/5 py-12 px-4">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Static hero shell — visible to crawlers and users */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#002D62] to-[#00BCD4] rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Prompt Designer — Crea prompts para Claude, GPT y Gemini
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Herramienta gratuita para construir prompts profesionales con wizard guiado, templates
            por industria y optimizador con IA. Compatible con Claude, GPT-4 y Gemini.
          </p>
        </div>

        {/* Interactive wizard — client boundary */}
        <PromptDesignerClient />
      </div>
    </div>
  )
}
