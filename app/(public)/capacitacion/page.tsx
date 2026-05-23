'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import AcademyToolsTicker from '@/components/services/AcademyToolsTicker'
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Megaphone,
  Workflow,
  Compass,
  TrendingUp,
  MapPin,
  Video,
  Calendar,
  MessageSquare,
  Building2,
  User,
  Users,
  Terminal,
} from 'lucide-react'

export default function ImpulsaAcademyPage() {
  const { t } = useLanguage()
  const cp = t.capacitacionPage

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {cp.heroTitulo1}<br />{cp.heroTitulo2}
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-emerald-400 mb-8">
              {cp.heroAccent}
            </p>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              {cp.heroDesc} <span className="font-bold text-white">{cp.heroDescBold}</span> {cp.heroDesc2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{cp.statDuracion}</div>
                <div className="text-sm text-blue-100">Duracion</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-sm text-blue-100">{cp.statPractico}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-400 mb-2">NYC</div>
                <div className="text-sm text-blue-100">{cp.statPresencial}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-400 mb-2">ES</div>
                <div className="text-sm text-blue-100">{cp.statModulos}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#servicios"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                {cp.verProgramas}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                {cp.consultaGratuita}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Tools Ticker — logos reales de las herramientas que enseñamos */}
      <AcademyToolsTicker />

      {/* Formato Presencial */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {cp.enTuEspacio}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {cp.presencialDesc} <span className="font-bold text-blue-600">{cp.presencialBold}</span> {cp.presencialPara}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {cp.presencialItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-900">{cp.cobertura}</span>
                      <span className="text-gray-600">{cp.coberturaZonas}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4" />
                      <span><span className="font-semibold">{cp.alternativaRemota}</span> {cp.alternativaDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dos dimensiones (1-a-1 vs Empresa) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{cp.dosDimensionesHeading}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{cp.dosDimensionesSub}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dimension 1: 1-a-1 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 border-4 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">{cp.dim1Title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{cp.dim1Desc}</p>
                <ul className="space-y-3 mb-8">
                  {cp.dim1Bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/capacitacion/mentoria-personalizada"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg"
                >
                  Ver opciones 1-a-1
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Dimension 2: Empresa */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border-4 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">{cp.dim2Title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{cp.dim2Desc}</p>
                <ul className="space-y-3 mb-8">
                  {cp.dim2Bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/capacitacion/equipos-empresariales"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
                >
                  Ver Taller Empresarial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 servicios — pricing cards */}
      {(() => {
        const s = cp.servicios
        const tiers = [
          {
            data: s.esencial,
            chipBg: 'bg-emerald-100', chipText: 'text-emerald-700',
            cardCls: 'bg-white border-2 border-gray-200 hover:border-emerald-400 shadow-lg',
            popularBadge: false,
            href: '/capacitacion/mentoria-personalizada',
            ctaCls: 'bg-emerald-600 hover:bg-emerald-700',
          },
          {
            data: s.intensivo,
            chipBg: 'bg-blue-100', chipText: 'text-blue-700',
            cardCls: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 shadow-xl transform md:scale-105',
            popularBadge: true,
            href: '/capacitacion/mentoria-personalizada',
            ctaCls: 'bg-blue-600 hover:bg-blue-700',
          },
          {
            data: s.taller,
            chipBg: 'bg-purple-100', chipText: 'text-purple-700',
            cardCls: 'bg-white border-2 border-gray-200 hover:border-purple-400 shadow-lg',
            popularBadge: false,
            href: '/capacitacion/equipos-empresariales',
            ctaCls: 'bg-purple-600 hover:bg-purple-700',
          },
        ]
        return (
          <section id="servicios" className="py-20 bg-slate-50 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{cp.serviciosHeading}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{cp.serviciosSub}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {tiers.map((tier, idx) => (
                    <div key={idx} className={`rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 relative flex flex-col ${tier.cardCls}`}>
                      {tier.popularBadge && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">{cp.serviciosMostPopular}</span>
                        </div>
                      )}
                      <div className={`inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${tier.chipBg} ${tier.chipText}`}>{tier.data.chip}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.data.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tier.data.desc}</p>
                      <div className="text-4xl font-bold text-gray-900 mb-1">{tier.data.price}</div>
                      <div className="text-sm text-gray-500 mb-6">{tier.data.duration}</div>
                      <h4 className="font-semibold text-gray-800 mb-3">{cp.serviciosOutcomesLabel}</h4>
                      <div className="space-y-2 mb-8 flex-1">
                        {tier.data.outcomes.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={tier.href} className={`block w-full text-center py-3 ${tier.ctaCls} text-white rounded-lg transition font-semibold shadow-md`}>{tier.data.cta}</Link>
                    </div>
                  ))}
                </div>

                {/* Nota premium opcional terminal/MCP */}
                <div className="mt-10 max-w-4xl mx-auto">
                  <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-start gap-4 border border-slate-700">
                    <div className="flex-shrink-0 p-3 bg-blue-600/20 rounded-xl">
                      <Terminal className="w-6 h-6 text-blue-300" />
                    </div>
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                      <span className="font-bold text-white">Premium opcional:</span> {cp.intensivoPremiumNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* Por que funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {cp.porQueFunciona}
              </h2>
              <p className="text-xl text-gray-600">
                {cp.porQueDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: cp.finanzasTitulo,
                  subtitle: cp.finanzasSubtitulo,
                  description: cp.finanzasDesc,
                  icon: TrendingUp,
                  bg: 'from-emerald-500 to-emerald-600',
                },
                {
                  title: cp.operacionesTitulo,
                  subtitle: cp.operacionesSubtitulo,
                  description: cp.operacionesDesc,
                  icon: Workflow,
                  bg: 'from-blue-500 to-blue-600',
                },
                {
                  title: cp.marketingTitulo,
                  subtitle: cp.marketingSubtitulo,
                  description: cp.marketingDesc,
                  icon: Megaphone,
                  bg: 'from-purple-500 to-purple-600',
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${item.bg} rounded-2xl mb-6`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-lg font-semibold text-emerald-600 mb-4">{item.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final con Diagnostico 3D */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {cp.ctaTitulo}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {cp.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/herramientas/auditoria-web"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" />
                {cp.diagnostico3D}
              </Link>
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {cp.consultaGratuita15}
              </Link>
              <a
                href="https://wa.me/19295007815"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                {cp.hablarWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
