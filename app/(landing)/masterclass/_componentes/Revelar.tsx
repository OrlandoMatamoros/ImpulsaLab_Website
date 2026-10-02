'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Aparece al llegar con el scroll. El servidor lo pinta VISIBLE (sin JavaScript o para Google
 * todo se ve); en el navegador, solo lo que está más abajo de la pantalla se esconde y aparece
 * al entrar. Lo que ya está a la vista al cargar no se anima. `escalon` = crece desde abajo.
 */
export default function Revelar({
  children,
  className = '',
  retraso = 0,
  escalon = false,
}: {
  children: ReactNode
  className?: string
  retraso?: number
  escalon?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    setOculto(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOculto(false)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-oculto={oculto}
      className={`${escalon ? 't-escalon' : 't-revelar'} ${className}`}
      style={{ '--retraso': `${retraso}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
