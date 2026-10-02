'use client'

import { useEffect, useState } from 'react'
import BotonReservar from './BotonReservar'

/**
 * Botón fijo abajo en el celular. Aparece siempre que el botón del héroe no está en pantalla
 * (antes o después de él) y se esconde cuando el del cierre está a la vista (para no mostrar dos iguales).
 */
export default function BarraMovil({ precio, detalle }: { precio: number; detalle: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroe = document.getElementById('reservar-heroe')
    const cierre = document.getElementById('reservar-cierre')
    if (!heroe || typeof IntersectionObserver === 'undefined') return
    const vistos = new Map<Element, boolean>()
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) vistos.set(e.target, e.isIntersecting)
      const heroeVisible = vistos.get(heroe) ?? true
      const cierreVisible = cierre ? (vistos.get(cierre) ?? false) : false
      // También antes de llegar al botón: en celulares pequeños queda debajo del primer pantallazo.
      setVisible(!heroeVisible && !cierreVisible)
    })
    obs.observe(heroe)
    if (cierre) obs.observe(cierre)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#001B3D]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur transition-transform duration-200 motion-reduce:transition-none md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <p className="mb-2 text-center text-[13px] font-medium text-white/80">{detalle}</p>
      <BotonReservar precio={precio} lugar="barra-movil" />
    </div>
  )
}
