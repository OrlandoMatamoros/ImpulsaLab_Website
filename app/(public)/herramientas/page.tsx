'use client'

import ToolsSection from '@/components/ToolsSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HerramientasPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.herramientasPage.titulo}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {t.herramientasPage.subtitulo}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#002D62] rounded-full">
            <span className="font-semibold">{t.herramientasPage.herramientasDisponibles}</span>
          </div>
        </div>
      </section>

      <ToolsSection />
    </main>
  )
}
