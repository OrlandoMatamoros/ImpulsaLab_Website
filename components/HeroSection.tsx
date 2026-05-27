'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useMagnetic } from '@/lib/hooks/useMagnetic'
import HeroSpotlightGrid from '@/components/HeroSpotlightGrid'
import MascotV15 from '@/components/MascotV15'

function getMonthlySlots(): number {
  const now = new Date()
  const seed = now.getFullYear() * 12 + now.getMonth()
  return [8, 9, 10][seed % 3]
}

function getCurrentMonth(lang: string): string {
  const now = new Date()
  return now.toLocaleDateString(lang === 'ES' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' })
}

// Hero title — texto completo desde SSR para que sea LCP-friendly.
// El accent mantiene el gradient cyan permanente (sin animación typewriter
// que hacía Googlebot/Lighthouse medir LCP como progresivo, llegando a 11s+).
function HeroTitle({ base, accent }: { base: string; accent: string }) {
  return (
    <>
      <span>{base}</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-cyan-300">{accent}</span>
    </>
  )
}

function CountUp({ end, suffix = '', duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) { setVal(end); return }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * end))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration, prefersReduced])

  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>
}

const heroStagger = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function HeroSection() {
  const { t, language } = useLanguage()
  const slots = getMonthlySlots()
  const month = getCurrentMonth(language)
  // Capitalize first letter
  const monthLabel = month.charAt(0).toUpperCase() + month.slice(1)

  const primaryCta = useMagnetic<HTMLDivElement>(15, 150)
  const secondaryCta = useMagnetic<HTMLDivElement>(15, 150)

  return (
    <section className="relative bg-brand-navy text-white pt-24 pb-16 lg:pb-20 min-h-[90vh] flex items-center overflow-hidden">
      {/* Spotlight grid (mouse-aware) con vignette fuerte para preservar navy deep */}
      <HeroSpotlightGrid />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* COLUMNA IZQUIERDA — Copy + CTA */}
          <motion.div
            className="flex flex-col justify-center h-full"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            {/* Mascota V15 flotante — identidad visual de marca */}
            <motion.div variants={heroItem} className="mb-4 flex items-center gap-3">
              <MascotV15
                size={56}
                variant="dark"
                expression="neutral"
                animate
                ariaLabel="Mascota Impulsa Lab"
                className="flex-shrink-0 drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
              />
              <span className="text-xs md:text-sm text-cyan-200 uppercase tracking-[0.2em] font-semibold">
                Impulsa Lab
              </span>
            </motion.div>

            {/* Badge */}
            <motion.div variants={heroItem} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Título principal — render completo desde SSR sin opacity animation
                para que sea elegible como LCP element en el primer paint */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.05] tracking-tight">
              <HeroTitle base={t.hero.titulo} accent={t.hero.tituloAccent} />
            </h1>

            {/* Subtítulo */}
            <motion.p variants={heroItem} className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 leading-relaxed">
              {t.hero.subtitulo}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                ref={primaryCta.ref}
                style={{ x: primaryCta.x, y: primaryCta.y }}
                className="inline-block"
              >
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center bg-brand-cyan text-brand-navy px-8 py-4 rounded-lg
                           font-bold text-lg transition-all duration-300
                           hover:bg-cyan-300 hover:shadow-xl hover:shadow-brand-cyan/30 group"
                >
                  {t.hero.cta}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                ref={secondaryCta.ref}
                style={{ x: secondaryCta.x, y: secondaryCta.y }}
                className="inline-block"
              >
                <Link
                  href="#servicios-pilares"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white
                           px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300
                           hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                >
                  {t.hero.ctaSecundario}
                </Link>
              </motion.div>
            </motion.div>

            {/* Métricas honestas */}
            <motion.div variants={heroItem} className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight"><CountUp end={50} suffix="+" /></div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaEmpresas}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight"><CountUp end={3} /></div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaPilares}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight"><CountUp end={100} suffix="%" /></div>
                <div className="text-sm md:text-base text-gray-300">{t.hero.metricaSoporte}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* COLUMNA DERECHA — DIAGNOSTICO 3D (Lead Magnet) */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="relative w-full max-w-lg">
              {/* Outer ambient glow — Stage 3 SOMATT-style en cyan brand */}
              <div
                aria-hidden
                className="absolute -inset-3 bg-brand-cyan/20 blur-2xl rounded-3xl pointer-events-none"
              />
              <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-brand-cyan/40 shadow-[0_0_45px_rgba(0,191,255,0.22)]">

                {/* Badge de urgencia — esquina superior */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {t.hero.urgenciaBadge}
                  </span>
                </div>

                {/* Header del card */}
                <div className="bg-gradient-to-r from-brand-navy to-brand-cyan p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {t.hero.diagTitulo}
                  </h2>
                  <p className="text-white/80 text-sm mt-2">
                    {t.hero.diagSubtitulo}
                  </p>
                  {/* Oferta temporal */}
                  <div className="mt-3 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <span className="text-yellow-300 text-xs font-bold">{monthLabel}:</span>
                    <span className="text-white text-xs">{t.hero.ofertaMes}</span>
                  </div>
                </div>

                {/* Los 3 ejes — cada uno con su color brand para diferenciar */}
                <div className="p-6 space-y-4">
                  {/* Eje Finanzas — cyan */}
                  <div className="flex items-start gap-4 p-3.5 rounded-lg bg-cyan-50 border-2 border-cyan-200 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/25 rounded-full flex items-center justify-center ring-2 ring-cyan-200/60">
                      <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-base">{t.hero.diagEje1}</h3>
                      <p className="text-sm text-gray-600">{t.hero.diagEje1Desc}</p>
                    </div>
                  </div>

                  {/* Eje Operaciones — verde */}
                  <div className="flex items-start gap-4 p-3.5 rounded-lg bg-emerald-50 border-2 border-emerald-200 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center ring-2 ring-emerald-200/60">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-base">{t.hero.diagEje2}</h3>
                      <p className="text-sm text-gray-600">{t.hero.diagEje2Desc}</p>
                    </div>
                  </div>

                  {/* Eje Marketing — violet */}
                  <div className="flex items-start gap-4 p-3.5 rounded-lg bg-purple-50 border-2 border-purple-200 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center ring-2 ring-purple-200/60">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-base">{t.hero.diagEje3}</h3>
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

                  {/* Escasez real — consultas limitadas */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-2 1-3 .5 1.5 1 2 1 3a3 3 0 01-.38 1.62z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-orange-600">
                      {t.hero.escasez.replace('{slots}', String(slots))}
                    </span>
                  </div>

                  <p className="text-center text-xs text-gray-600">
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
