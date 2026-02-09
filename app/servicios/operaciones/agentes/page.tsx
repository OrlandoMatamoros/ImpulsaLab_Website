'use client'

import OperationsEnhancedSection from '@/components/operations/OperationsEnhancedSection'
import Link from 'next/link'
import { ArrowLeft, Bot } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AgentesPage() {
  const { t } = useLanguage()
  const tp = t.operacionesAgentesPage

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/servicios" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbServicios}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/servicios/operaciones" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbOperaciones}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-purple-600 font-semibold">{tp.breadcrumbAgente}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Bot className="w-5 h-5" />
              <span>{tp.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tp.heroTitle}
            </h1>
            <p className="text-xl text-gray-200">
              {tp.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Componente principal */}
      <OperationsEnhancedSection />

      {/* Navegacion */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/operaciones"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link href="/servicios/operaciones/arsenal"
                  className="text-purple-600 hover:text-purple-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
