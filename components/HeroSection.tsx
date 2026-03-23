'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-brand-navy text-white pt-24 pb-16 lg:pb-20 min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* COLUMNA IZQUIERDA — Copy + CTA */}
          <div className="flex flex-col justify-center h-full">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {t.hero.badge}
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.hero.titulo}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-cyan-300">{t.hero.tituloAccent}</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 leading-relaxed">
              {t.hero.subtitulo}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center bg-brand-cyan text-brand-navy px-8 py-4 rounded-lg
                         font-bold text-lg transition-all duration-300
                         hover:scale-105 hover:bg-cyan-300 hover:shadow-xl hover:shadow-brand-cyan/30 group"
              >
                {t.hero.cta}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#servicios-pilares"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white
                         px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300
                         hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                {t.hero.ctaSecundario}
              </Link>
            </div>

            {/* Métricas honestas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaEmpresas}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">3</div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaPilares}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaSoporte}</div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA — DIAGNOSTICO 3D (Lead Magnet) */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="w-full max-w-lg">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header del card */}
                <div className="bg-gradient-to-r from-brand-navy to-brand-cyan p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {t.hero.diagTitulo}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    {t.hero.diagSubtitulo}
                  </p>
                </div>

                {/* Los 3 ejes */}
                <div className="p-6 space-y-4">
                  {/* Eje Finanzas */}
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{t.hero.diagEje1}</h4>
                      <p className="text-sm text-gray-600">{t.hero.diagEje1Desc}</p>
                    </div>
                  </div>

                  {/* Eje Operaciones */}
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{t.hero.diagEje2}</h4>
                      <p className="text-sm text-gray-600">{t.hero.diagEje2Desc}</p>
                    </div>
                  </div>

                  {/* Eje Marketing */}
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-purple-50 border border-purple-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{t.hero.diagEje3}</h4>
                      <p className="text-sm text-gray-600">{t.hero.diagEje3Desc}</p>
                    </div>
                  </div>

                  {/* CTA del diagnóstico */}
                  <Link
                    href="/diagnostico"
                    className="block w-full text-center bg-brand-navy text-white py-4 rounded-xl font-bold text-lg
                             hover:bg-brand-navy/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                  >
                    {t.hero.diagCta}
                    <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <p className="text-center text-xs text-gray-400">
                    {t.hero.diagTiempo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
