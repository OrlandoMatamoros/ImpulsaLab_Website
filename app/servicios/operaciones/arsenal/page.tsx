'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, CheckCircle, MessageCircle, Mail, BarChart3, Users, Megaphone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const categoryIcons = [Mail, BarChart3, Users, Megaphone]

export default function ArsenalPage() {
  const { t } = useLanguage()
  const tp = t.operacionesArsenalPage

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
            <span className="text-green-600 font-semibold">{tp.breadcrumbArsenal}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span>{tp.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tp.heroTitle}
            </h1>
            <p className="text-xl text-green-100">
              {tp.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {tp.sectionTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {tp.categorias.map((categoria: { nombre: string; automatizaciones: string[] }, index: number) => {
                const Icon = categoryIcons[index] || Zap
                return (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:border-green-200 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{categoria.nombre}</h3>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{tp.ctaTitle}</h3>
            <p className="text-gray-600 mb-8 text-lg">
              {tp.ctaDesc}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {tp.ctaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              href="/servicios/operaciones"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link
              href="/servicios/operaciones/plataformas"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
