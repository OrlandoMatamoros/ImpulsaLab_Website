'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, Clock, Check } from 'lucide-react'
import { LINKS } from '@/lib/constants'
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

      {/* Proceso */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {tp.pasos.map((paso, index) => (
              <div key={index} className="relative mb-12">
                <div className={`flex gap-8 items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Numero */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      {paso.numero}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 bg-gray-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600 mb-4">{paso.descripcion}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold">{tp.labelDuracion} {paso.duracion}</span>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">{tp.labelEntregables}</p>
                      <ul className="space-y-1">
                        {paso.entregables.map((entregable, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-gray-600">{entregable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Linea conectora */}
                {index < tp.pasos.length - 1 && (
                  <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-indigo-200"></div>
                )}
              </div>
            ))}

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">{tp.ctaTitle}</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {tp.ctaDesc}
              </p>
              <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition">
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
                  className="text-indigo-600 hover:text-indigo-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
