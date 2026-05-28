'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'

type Stat = {
  value: number
  suffix?: string
  label: string
}

const STATS: Stat[] = [
  { value: 89, suffix: '+', label: 'Herramientas en el Arsenal' },
  { value: 25, suffix: '+', label: 'Automatizaciones en producción' },
  { value: 13, suffix: '+', label: 'Workflows AI en producción' },
  { value: 49, suffix: '', label: 'Servicios en catálogo' },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) {
      setDisplay(target)
      return
    }
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, prefersReduced])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  const prefersReduced = useReducedMotion()
  return (
    <section
      aria-label="Métricas de Impulsa Lab"
      className="bg-brand-navy border-y border-white/10 py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-cyan mb-2 tabular-nums">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
