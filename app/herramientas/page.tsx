'use client'

import ToolsSection from '@/components/ToolsSection'
import ProtectedSection from '@/components/ProtectedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HerramientasPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      {/* Header y descripción - SIEMPRE VISIBLE */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.herramientasPage.titulo}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t.herramientasPage.subtitulo}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
            <span className="font-medium">{t.herramientasPage.herramientasDisponibles}</span>
          </div>
        </div>
      </section>

      {/* Contenido principal - PROTEGIDO */}
      <ProtectedSection
        message={t.herramientasPage.protectedMessage}
        showPreview={true}
        previewBlur={false}
      >
        <ToolsSection />
      </ProtectedSection>
    </main>
  )
}
