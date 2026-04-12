'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Newspaper, TrendingUp, Wand2, Zap } from 'lucide-react'
import AskTheBoardWidget from '@/components/agents/AskTheBoardWidget'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AgentesPlayground() {
  const { t } = useLanguage()
  const tp = t.herramientasAgentesPage

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-[#00BCD4] rounded-full filter blur-3xl" />
          <div className="absolute -bottom-8 right-20 w-72 h-72 bg-[#00BCD4] rounded-full filter blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00BCD4]/10 backdrop-blur-sm border border-[#00BCD4]/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00BCD4] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BCD4]" />
              </span>
              <span className="text-sm font-medium text-[#00BCD4]">
                {tp.playgroundActive} &middot; {tp.pruebaSinRegistro}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {tp.heroTitle}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-white">
                {tp.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              {tp.heroDescription}{' '}
              <span className="font-bold text-white">{tp.heroDescriptionBold}</span>{' '}
              {tp.heroDescriptionSuffix}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { v: '3', l: tp.usosGratis },
                { v: '24/7', l: tp.disponibilidad },
                { v: '4', l: tp.agentesActivos },
                { v: '$0', l: tp.sinTarjeta },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BCD4]/20 rounded-lg p-4"
                >
                  <div className="text-3xl font-bold text-[#00BCD4]">{s.v}</div>
                  <div className="text-white/70 text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es un Agente IA? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {tp.especialistaTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Brain, title: tp.cerebroTitle, desc: tp.cerebroDesc },
              { Icon: Zap, title: tp.conectadoTitle, desc: tp.conectadoDesc },
              { Icon: TrendingUp, title: tp.aprendeTitle, desc: tp.aprendeDesc },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-20 h-20 bg-[#00BCD4]/10 border border-[#00BCD4]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10 text-[#002D62]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
                <p className="text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ask the Board Widget — the main experience */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AskTheBoardWidget />
        </div>
      </section>

      {/* Secondary tools */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            {tp.moreToolsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/herramientas/prompt-designer"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#00BCD4] hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#002D62] to-[#00BCD4] text-white flex items-center justify-center shadow-lg flex-shrink-0">
                <Wand2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#002D62]">
                  {tp.moreToolsPromptDesigner}
                </h3>
                <p className="text-sm text-slate-600">{tp.moreToolsPromptDesignerDesc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00BCD4] group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>

            <Link
              href="/herramientas/noticias"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#00BCD4] hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#002D62] to-[#00BCD4] text-white flex items-center justify-center shadow-lg flex-shrink-0">
                <Newspaper className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#002D62]">
                  {tp.moreToolsNews}
                </h3>
                <p className="text-sm text-slate-600">{tp.moreToolsNewsDesc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00BCD4] group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BCD4] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{tp.ctaTitle}</h2>
          <p className="text-xl text-white/80 mb-8">
            {tp.ctaDescription}
            <span className="text-[#00BCD4] font-bold"> {tp.ctaPersonalizados}</span>{' '}
            {tp.ctaDescriptionSuffix}
          </p>
          <a
            href="https://calendly.com/orlando-tuimpulsalab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00BCD4] text-[#001a3a] rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl"
          >
            {tp.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
