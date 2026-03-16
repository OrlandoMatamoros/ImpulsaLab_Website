'use client'

import Link from 'next/link'
import { ArrowLeft, Layers, Play } from 'lucide-react'
import { LINKS } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PlataformasPage() {
  const { t } = useLanguage()
  const tp = t.operacionesPlataformasPage

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
            <span className="text-orange-600 font-semibold">{tp.breadcrumbPlataformas}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-900 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Layers className="w-5 h-5" />
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

      {/* Plataformas Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {tp.plataformas.map((plataforma, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-3">{plataforma.nombre}</h3>
                  <p className="text-gray-600 mb-6">{plataforma.descripcion}</p>

                  {/* Video */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-video">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${plataforma.videoId}`}
                      title={`${plataforma.nombre} Demo`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* Caracteristicas */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {plataforma.caracteristicas.map((car, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {car}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">{tp.labelMejorPara}</p>
                      <p className="font-semibold">{plataforma.mejor_para}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{tp.labelPrecio}</p>
                      <p className="font-semibold text-green-600">{plataforma.precio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">{tp.ctaTitle}</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {tp.ctaDesc}
              </p>
              <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition">
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
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link href="/servicios/operaciones/casos"
                  className="text-orange-600 hover:text-orange-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
