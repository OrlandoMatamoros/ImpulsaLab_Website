'use client'

import { useEffect, useState } from 'react'

/**
 * «Faltan 18 días y 6 horas». Solo se pinta en el navegador (el servidor no sabe en qué
 * minuto llega el visitante); mientras tanto queda el texto fijo que pone la página.
 * Al llegar a cero recarga para mostrar el precio nuevo.
 */
export default function CuentaRegresiva({ hasta, className = '' }: { hasta: string; className?: string }) {
  const [resto, setResto] = useState<number | null>(null)

  useEffect(() => {
    const fin = new Date(hasta).getTime()
    const tick = () => {
      const r = fin - Date.now()
      setResto(r)
      if (r <= 0) window.location.reload()
    }
    tick()
    const t = window.setInterval(tick, 30_000)
    return () => window.clearInterval(t)
  }, [hasta])

  if (resto === null || resto <= 0) return null

  const min = Math.floor(resto / 60_000)
  const dias = Math.floor(min / 1440)
  const horas = Math.floor((min % 1440) / 60)
  const minutos = min % 60
  const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`

  const texto =
    dias >= 1
      ? `${plural(dias, 'día', 'días')} y ${plural(horas, 'hora', 'horas')}`
      : `${plural(horas, 'hora', 'horas')} y ${plural(minutos, 'minuto', 'minutos')}`

  return <span className={className}>Faltan {texto}</span>
}
