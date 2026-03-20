'use client'

import Link from 'next/link'
import { ArrowLeft, Check, DollarSign, Info, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PreciosPage() {
  const { t } = useLanguage()
  const tp = t.operacionesPreciosPage

  const whatsappUrl = `https://wa.me/13479043169?text=${encodeURIComponent(tp.ctaWhatsappMessage)}`

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
            <span className="text-green-600 font-semibold">{tp.breadcrumbPrecios}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <DollarSign className="w-5 h-5" />
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

      {/* Planes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Info sobre como funciona */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-12">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">{tp.infoTitle}</p>
                  <p className="text-blue-700 text-sm mt-1">
                    {tp.infoDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tp.planes.map((plan: { nombre: string; descripcion: string; precio_unico: number; ejemplos: string; caracteristicas: string[]; popular?: boolean }, index: number) => (
                <div key={index}
                     className={`rounded-xl shadow-lg p-8 border-2 transition relative
                       ${plan.popular
                         ? 'bg-green-50 border-green-500 md:transform md:scale-105'
                         : 'bg-white border-gray-200 hover:border-green-500'}`}>

                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {tp.labelMasPopular}
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                  <p className="text-gray-600 mb-6">{plan.descripcion}</p>

                  {/* Precio unico */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">{tp.labelPagoUnico}</p>
                    <p className="text-4xl font-bold text-gray-900">${plan.precio_unico}</p>
                  </div>

                  {/* Ejemplos */}
                  <p className="text-sm text-gray-600 italic mb-6">
                    {plan.ejemplos}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((car: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{car}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={whatsappUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`block w-full text-center py-3 rounded-lg transition font-semibold
                       ${plan.popular
                         ? 'bg-green-600 text-white hover:bg-green-700'
                         : 'bg-green-600 text-white hover:bg-green-700'}`}>
                    {tp.ctaPlan}
                  </a>
                </div>
              ))}
            </div>

            {/* Nota sobre credenciales */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">{tp.condicionTitle}</p>
                  <p className="text-amber-800 text-sm mt-1">
                    {tp.condicionDesc}
                  </p>
                </div>
              </div>
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
            <Link href="/servicios/operaciones/arsenal"
                  className="text-green-600 hover:text-green-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
