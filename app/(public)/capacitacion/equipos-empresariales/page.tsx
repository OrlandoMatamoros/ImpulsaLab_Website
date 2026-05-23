'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  Users,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  Calendar,
  MessageSquare,
  MapPin,
  Award,
  Rocket,
  Building2,
} from 'lucide-react'

export default function EquiposEmpresarialesPage() {
  const { t } = useLanguage()
  const ep = t.equiposPage
  const modules = [ep.moduloFundamentos, ep.moduloSetup, ep.moduloCasos, ep.moduloCierre]

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/capacitacion"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              {ep.volverAcademy}
            </Link>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              {ep.badgeText}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {ep.heroTitle}
            </h1>

            <p className="text-2xl text-blue-100 mb-8 leading-relaxed">
              {ep.heroSubtitle}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">{ep.duracionLabel}</span>
                </div>
                <div className="text-2xl font-bold">{ep.duracionValue}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">{ep.capacidadLabel}</span>
                </div>
                <div className="text-2xl font-bold">{ep.capacidadValue}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">{ep.formatoLabel}</span>
                </div>
                <div className="text-2xl font-bold">{ep.formatoValue}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">{ep.desdeLabel}</span>
                </div>
                <div className="text-2xl font-bold">$1,497</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {ep.solicitarCotizacion}
              </Link>
              <a
                href="https://wa.me/19295007815"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-800/50 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                {ep.consultarWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Clave */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {ep.porQueCapacitar}
              </h2>
              <p className="text-xl text-gray-600">
                {ep.inversionSePaga}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ep.benefits.map((benefit, i) => {
                const icons = [Users, Clock, Target, DollarSign]
                const Icon = icons[i] ?? Users
                return (
                  <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Estructura del taller */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {ep.eligeNivel}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {ep.formatosDesc}
              </p>
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-blue-100">
                <Target className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">
                  <span className="font-semibold">{ep.idealPara}</span> {ep.idealParaText}
                </span>
              </div>
            </div>

            {/* Modules */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Brain className="w-7 h-7 text-blue-600" />
                {ep.contenidoWorkshop}
              </h3>
              <div className="space-y-6">
                {modules.map((module, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <h4 className="text-xl font-bold text-slate-900">{module.title}</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold whitespace-nowrap">
                        {module.time}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {module.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Incluye */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Award className="w-7 h-7 text-blue-600" />
                {ep.incluyeHeading}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ep.incluyeItems.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing flat */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-blue-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <DollarSign className="w-4 h-4" />
                  {ep.precioFlat}
                </div>
                <p className="text-gray-700 mb-4 max-w-2xl mx-auto">{ep.precioFlatDesc}</p>
                <div className="text-6xl font-bold text-slate-900 mb-2">
                  {ep.precioValor}
                </div>
                <div className="text-sm text-gray-600 mb-6">
                  {ep.precioSub}
                </div>
                <p className="text-sm text-gray-600 max-w-xl mx-auto mb-8">{ep.notaTamanoEquipo}</p>
                <Link
                  href="/#contacto"
                  className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {ep.solicitar}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {ep.empresasTitle}
              </h2>
              <p className="text-xl text-gray-600">
                {ep.roiComprobado}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ep.testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg text-slate-900">{testimonial.company}</div>
                      <div className="text-sm text-gray-600">{testimonial.industry}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{testimonial.size}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {testimonial.tier}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="inline-flex bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                      {testimonial.result}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm font-medium text-blue-600 mb-2">
                      &mdash; {testimonial.person}
                    </div>
                    <div className="text-sm font-bold text-emerald-600">
                      {testimonial.savings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-20 h-20 mx-auto mb-6 text-blue-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {ep.impulsaEquipo}
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              {ep.inversionDesde} <span className="font-bold text-white text-3xl">$1,497</span> {ep.porPersonaTransformar}
            </p>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              {ep.nota}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contacto"
                className="px-10 py-5 bg-white text-blue-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-6 h-6" />
                {ep.solicitarInfo}
              </Link>
              <Link
                href="/capacitacion/mentoria-personalizada"
                className="px-10 py-5 bg-blue-800/50 backdrop-blur text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-blue-800 transition-all duration-300"
              >
                {ep.verMentoria}
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-blue-200 text-sm mb-4">
                {ep.presencial}
              </p>
              <p className="text-blue-200 text-sm">
                {ep.prefiereRemoto}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
