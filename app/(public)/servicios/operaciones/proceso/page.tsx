'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Zap, Clock, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProcesoPage() {
  const { t } = useLanguage()
  const tp = t.operacionesProcesoPage

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
            <span className="text-indigo-600 font-semibold">{tp.breadcrumbProceso}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Zap className="w-5 h-5" />
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

      {/* Proceso - 3 Step Cards with Connectors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">
              {tp.pasos.map((paso: { numero: string | number; titulo: string; descripcion: string; duracion: string; entregables: string[] }, index: number) => (
                <div key={index} className="flex items-stretch">
                  {/* Step Card */}
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-8 relative hover:shadow-lg transition-shadow">
                    {/* Step Number Badge */}
                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                      {paso.numero}
                    </div>

                    <h3 className="text-xl font-bold text-center mb-3">{paso.titulo}</h3>
                    <p className="text-gray-600 text-center mb-6">{paso.descripcion}</p>

                    {/* Duration */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-indigo-700">{tp.labelDuracion} {paso.duracion}</span>
                    </div>

                    {/* Entregables */}
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

                  {/* Arrow Connector between cards */}
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

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">{tp.ctaTitle}</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {tp.ctaDesc}
              </p>
              <Link
                href={`https://wa.me/13479043169?text=${encodeURIComponent(tp.ctaWhatsappMessage)}`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {tp.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navegacion */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/operaciones"
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link href="/servicios/operaciones/agentes"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
              {tp.navNext} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
