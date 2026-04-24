'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Users, Building2, Rocket, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function JuntaEstrategicaMarketingPage() {
  const { t } = useLanguage()
  const jm = t.juntaMarketing

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white">
        {/* Background glow accents */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 -left-20 w-96 h-96 bg-[#00BCD4] rounded-full filter blur-3xl opacity-30" />
          <div className="absolute top-40 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#00BCD4]" />
              <span className="text-sm font-medium tracking-wide uppercase text-[#00BCD4]">
                {jm.heroEyebrow}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] via-purple-300 to-emerald-300">
                {jm.heroTitle}
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl font-semibold text-white/90 mb-6">
              {jm.heroSubtitle}
            </p>

            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              {jm.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto?service=junta-estrategica"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00BCD4] text-[#001a3a] font-bold text-base hover:bg-[#00BCD4]/90 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
              >
                {jm.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/herramientas/agentes/junta-estrategica/app"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all"
              >
                {jm.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS — 4 directors */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {jm.howTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{jm.howSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jm.directors.map((director, i) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-shadow"
                style={{ borderTopWidth: '4px', borderTopColor: director.color }}
              >
                <div className="text-4xl mb-4">{director.emoji}</div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: director.color }}
                >
                  {director.model}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{director.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {director.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOR WHOM */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {jm.forWhomTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {jm.forWhomSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jm.audiences.map((audience, i) => {
              const icons = [Building2, Rocket, Users]
              const Icon = icons[i] || Users
              const colors = ['#00BCD4', '#8B5CF6', '#10B981']
              const color = colors[i] || '#00BCD4'
              return (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{audience.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* USE CASES */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {jm.useCasesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {jm.useCasesSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {jm.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-[#00BCD4] hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#002D62] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-lg font-medium leading-relaxed pt-1">
                  &ldquo;{useCase}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#00375c]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BCD4] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 backdrop-blur-sm rounded-full mb-6 border border-amber-400/30">
            <Brain className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
              Enterprise
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {jm.ctaTitle}
          </h2>
          <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed">
            {jm.ctaDescription}
          </p>
          <p className="text-sm text-white/60 mb-10">{jm.ctaFootnote}</p>

          <Link
            href="/contacto?service=junta-estrategica"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[#00BCD4] text-[#001a3a] font-bold text-lg hover:bg-[#00BCD4]/90 transition-all hover:scale-[1.02] shadow-xl shadow-cyan-500/30"
          >
            {jm.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
