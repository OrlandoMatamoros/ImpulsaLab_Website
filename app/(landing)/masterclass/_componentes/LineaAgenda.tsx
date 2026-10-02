'use client'

import { useEffect, useRef } from 'react'

/**
 * La línea vertical de la agenda se llena de cian a medida que se baja por ella.
 * Va dentro del contenedor de la agenda (posición relativa) y mide contra él.
 */
export default function LineaAgenda({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const contenedor = el?.parentElement
    if (!el || !contenedor) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--avance', '1')
      return
    }
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      const r = contenedor.getBoundingClientRect()
      const avance = (window.innerHeight * 0.6 - r.top) / r.height
      el.style.setProperty('--avance', String(Math.min(1, Math.max(0, avance))))
    }
    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => {
      window.removeEventListener('scroll', alMover)
      window.removeEventListener('resize', alMover)
      cancelAnimationFrame(cuadro)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute w-[3px] rounded-full bg-[#D6E0EC] ${className}`}>
      <div className="t-linea-llena h-full w-full rounded-full bg-[#00BCD4]" />
    </div>
  )
}
