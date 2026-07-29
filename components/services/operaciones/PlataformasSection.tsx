'use client'

import { Layers, Star, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LiteYouTube from '@/components/services/LiteYouTube'

/**
 * Seccion "Plataformas" — antes /servicios/operaciones/plataformas.
 * Consolidada en /servicios/operaciones#plataformas (2026-07-29).
 * Los 4 videos usan LiteYouTube (facade): la miniatura carga de entrada y el
 * iframe solo se monta al hacer clic. Sin esto, la consolidacion metia 5 iframes
 * de YouTube en la carga inicial de la pagina.
 */
export default function PlataformasSection() {
  const { t } = useLanguage()
  const tp = t.operacionesPlataformasPage

  return (
    <section id="plataformas" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-4">
              <Layers className="w-5 h-5" />
              <span className="font-medium">{tp.heroBadge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tp.heroTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tp.heroSubtitle}
            </p>
          </div>

          {/* Destacada */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
                <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                <span className="font-semibold">{tp.featuredTitle}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {tp.featuredName}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {tp.featuredDesc}
                  </p>
                  <ul className="space-y-3">
                    {tp.featuredFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900 flex items-center">
                  <div className="w-full aspect-video relative">
                    <LiteYouTube
                      videoId={tp.plataformas[0].videoId}
                      title={`${tp.featuredName} Demo`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resto de plataformas */}
          <div className="grid md:grid-cols-3 gap-8">
            {tp.plataformas.slice(1).map((plataforma, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-2">{plataforma.nombre}</h3>
                <p className="text-gray-600 mb-5 text-sm">{plataforma.descripcion}</p>

                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-5 aspect-video">
                  <LiteYouTube
                    videoId={plataforma.videoId}
                    title={`${plataforma.nombre} Demo`}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {plataforma.caracteristicas.map((car, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                        {car}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500">{tp.labelMejorPara}</p>
                    <p className="font-semibold text-sm">{plataforma.mejor_para}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{tp.labelPrecio}</p>
                    <p className="font-semibold text-sm text-green-600">{plataforma.precio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
