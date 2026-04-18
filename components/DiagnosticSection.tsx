'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DiagnosticSection() {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()
  const revealProps = (index: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-100px' },
          transition: { duration: 0.5, delay: index * 0.1 },
        }

  return (
    <section id="diagnostico" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.diagnostic.titulo}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.diagnostic.subtitulo}
          </p>
        </div>

        {/* Texto explicativo del concepto */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="text-gray-600 mb-4">
            {t.diagnostic.premisa}
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-cyan/10 rounded-full mb-3">
                <span className="text-2xl">💨</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-cyan-700">{t.diagnostic.finanzasLabel}</span> {t.diagnostic.finanzasDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <span className="text-2xl">💪</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-purple-600">{t.diagnostic.operacionesLabel}</span> {t.diagnostic.operacionesDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">{t.diagnostic.marketingLabel}</span> {t.diagnostic.marketingDesc}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            {t.diagnostic.ponderacion}
          </p>
          {/* Botón para iniciar diagnóstico */}
          <div className="mt-8">
            <Link href="/diagnostico">
              <button className="bg-brand-navy text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-navy/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t.diagnostic.ctaBoton}
              </button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Eje X: FINANZAS */}
          <motion.div {...revealProps(0)}>
          <Link href="/servicios/finanzas" className="block">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
              <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.diagnostic.ejeX}</h3>
              <h4 className="text-lg font-medium mb-3 text-cyan-700">{t.diagnostic.ejeXTitulo}</h4>
              <p className="text-gray-600">
                {t.diagnostic.ejeXDesc}
              </p>
              <p className="text-cyan-700 text-sm mt-4 font-medium">
                {t.diagnostic.conoceMas}
              </p>
            </div>
          </Link>
          </motion.div>

          {/* Eje Y: OPERACIONES */}
          <motion.div {...revealProps(1)}>
          <Link href="/servicios/operaciones" className="block">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.diagnostic.ejeY}</h3>
              <h4 className="text-lg font-medium mb-3 text-green-600">{t.diagnostic.ejeYTitulo}</h4>
              <p className="text-gray-600">
                {t.diagnostic.ejeYDesc}
              </p>
              <p className="text-green-600 text-sm mt-4 font-medium">
                {t.diagnostic.conoceMas}
              </p>
            </div>
          </Link>
          </motion.div>

          {/* Eje Z: MARKETING */}
          <motion.div {...revealProps(2)}>
          <Link href="/servicios/marketing" className="block">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.diagnostic.ejeZ}</h3>
              <h4 className="text-lg font-medium mb-3 text-purple-600">{t.diagnostic.ejeZTitulo}</h4>
              <p className="text-gray-600">
                {t.diagnostic.ejeZDesc}
              </p>
              <p className="text-purple-600 text-sm mt-4 font-medium">
                {t.diagnostic.conoceMas}
              </p>
            </div>
          </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
