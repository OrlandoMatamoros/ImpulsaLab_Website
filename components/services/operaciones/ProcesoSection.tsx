'use client'

import { ArrowRight, Clock, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Seccion "Proceso" — antes /servicios/operaciones/proceso.
 * Consolidada en /servicios/operaciones#proceso (2026-07-29): la subpagina tenia
 * 266 palabras y Google la reportaba como "rastreada, actualmente sin indexar".
 * Reusa las traducciones originales (t.operacionesProcesoPage) sin tocar i18n.
 */
export default function ProcesoSection() {
  const { t } = useLanguage()
  const tp = t.operacionesProcesoPage

  return (
    <section id="proceso" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4">
              <span className="font-medium">{tp.heroBadge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tp.heroTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tp.heroSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">
            {tp.pasos.map((paso: { numero: string | number; titulo: string; descripcion: string; duracion: string; entregables: string[] }, index: number) => (
              <div key={index} className="flex items-stretch">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-8 relative hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                    {paso.numero}
                  </div>

                  <h3 className="text-xl font-bold text-center mb-3">{paso.titulo}</h3>
                  <p className="text-gray-600 text-center mb-6">{paso.descripcion}</p>

                  <div className="flex items-center justify-center gap-2 mb-5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-700">{tp.labelDuracion} {paso.duracion}</span>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2 text-gray-800">{tp.labelEntregables}</p>
                    <ul className="space-y-2">
                      {paso.entregables.map((entregable: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{entregable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {index < tp.pasos.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-3">
                    <ArrowRight className="w-6 h-6 text-indigo-400" />
                  </div>
                )}
                {index < tp.pasos.length - 1 && (
                  <div className="flex md:hidden items-center justify-center py-4">
                    <div className="w-0.5 h-8 bg-indigo-300 relative">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-indigo-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
