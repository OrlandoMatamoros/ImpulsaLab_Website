'use client'

import Link from 'next/link'
import { ArrowLeft, Briefcase, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { LINKS } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CasosPage() {
  const { t } = useLanguage()
  const tp = t.operacionesCasosPage

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
            <span className="text-green-600 font-semibold">{tp.breadcrumbCasos}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Briefcase className="w-5 h-5" />
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

      {/* Casos por Industria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {tp.sectionIndustriasTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {tp.industrias.map((industria, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    {industria.nombre}
                  </h3>

                  <div className="space-y-4">
                    {industria.casos.map((caso, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{caso.titulo}</h4>
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-green-600" />
                            {caso.ahorro}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            ROI: {caso.roi}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Exito Detallados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {tp.sectionExitoTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {tp.casosExito.map((caso, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{caso.empresa}</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-1">{tp.labelProblema}</p>
                      <p className="text-gray-600">{caso.problema}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">{tp.labelSolucion}</p>
                      <p className="text-gray-600">{caso.solucion}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">{tp.labelResultado}</p>
                      <p className="text-lg font-bold text-gray-900">{caso.resultado}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <p className="text-gray-600 italic">&ldquo;{caso.testimonial}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-12 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">
                {tp.ctaTitle}
              </h3>
              <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
                {tp.ctaDesc}
              </p>
              <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
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
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link href="/servicios/operaciones/precios"
                  className="text-green-600 hover:text-green-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
