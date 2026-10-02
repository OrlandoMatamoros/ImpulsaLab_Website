'use client'

import { useEffect, useState } from 'react'
import { evento, refActual } from './referido'

interface Props {
  precio: number
  /** 'claro' = botón cian sobre fondo azul · 'oscuro' = botón azul sobre fondo claro */
  tono?: 'claro' | 'oscuro'
  /** Dónde está el botón (para la analítica): heroe, cierre, barra-movil */
  lugar: string
  id?: string
  className?: string
}

/**
 * «Reservar mi cupo»: pide al servidor la página de pago de Stripe y lleva al visitante ahí.
 * El precio que se muestra es informativo; el que se cobra lo calcula el servidor.
 */
export default function BotonReservar({ precio, tono = 'claro', lugar, id, className = '' }: Props) {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Si vuelve desde Stripe con «Atrás», el navegador restaura la página tal cual quedó
  // (con el botón en «Abriendo el pago…»). Se destraba.
  useEffect(() => {
    const alVolver = (e: PageTransitionEvent) => {
      if (e.persisted) setCargando(false)
    }
    window.addEventListener('pageshow', alVolver)
    return () => window.removeEventListener('pageshow', alVolver)
  }, [])

  async function reservar() {
    if (cargando) return
    setCargando(true)
    setError(null)
    const ref = refActual()
    evento('taller_reservar', { lugar, precio, ref: ref ?? 'ninguno' })
    try {
      const res = await fetch('/api/taller/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref }),
      })
      const datos = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok || !datos.url) throw new Error(datos.error ?? 'No pudimos abrir el pago. Intenta de nuevo.')
      window.location.assign(datos.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No pudimos abrir el pago. Intenta de nuevo.')
      setCargando(false)
    }
  }

  const estilos =
    tono === 'claro'
      ? 'bg-[#00BCD4] text-[#002D62] hover:bg-[#33CADD] focus-visible:outline-white'
      : 'bg-[#002D62] text-white hover:bg-[#0A3F7E] focus-visible:outline-[#00BCD4]'

  return (
    <div className={className}>
      <button
        id={id}
        type="button"
        onClick={reservar}
        disabled={cargando}
        aria-busy={cargando}
        className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-extrabold tracking-[-0.01em] shadow-[0_10px_30px_-12px_rgba(0,188,212,0.65)] transition-[background-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:cursor-wait disabled:opacity-80 ${estilos}`}
      >
        {cargando ? (
          <>
            <span
              aria-hidden
              className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-r-transparent motion-reduce:animate-none"
            />
            Abriendo el pago seguro…
          </>
        ) : (
          <>Reservar mi cupo · ${precio}</>
        )}
      </button>
      <p role="alert" aria-live="assertive" className={error ? 'mt-3 text-sm font-medium text-[#B42318]' : 'sr-only'}>
        {error ?? ''}
      </p>
    </div>
  )
}
