'use client'

import { Zap, CheckCircle, Mail, BarChart3, Users, Megaphone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const categoryIcons = [Mail, BarChart3, Users, Megaphone]

/**
 * Seccion "Arsenal de automatizaciones" — antes /servicios/operaciones/arsenal.
 * Consolidada en /servicios/operaciones#arsenal (2026-07-29).
 * OJO: no confundir con /herramientas/arsenal, que es el catalogo de 89 herramientas.
 */
export default function ArsenalSection() {
  const { t } = useLanguage()
  const tp = t.operacionesArsenalPage

  return (
    <section id="arsenal" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">{tp.heroBadge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tp.heroTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tp.heroSubtitle}
            </p>
          </div>

          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
            {tp.sectionTitle}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {tp.categorias.map((categoria: { nombre: string; automatizaciones: string[] }, index: number) => {
              const Icon = categoryIcons[index] || Zap
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:border-green-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-700" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{categoria.nombre}</h4>
                  </div>
                  <ul className="space-y-3">
                    {categoria.automatizaciones.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
