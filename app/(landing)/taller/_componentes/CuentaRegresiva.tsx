'use client'

import { useEffect, useState } from 'react'

/**
 * «Faltan 18 días y 6 horas». Solo se pinta en el navegador (el servidor no sabe en qué
 * minuto llega el visitante); mientras tanto queda el texto fijo que pone la página.
 * Al llegar a cero recarga UNA vez para mostrar el precio nuevo. Una sola: si el reloj del
 * equipo está adelantado o la página vuelve con el precio viejo, no entra en un ciclo de recargas.
 */
export default function CuentaRegresiva({ hasta, className = '' }: { hasta: string; className?: string }) {
  const [resto, setResto] = useState<number | null>(null)

  useEffect(() => {
    const fin = new Date(hasta).getTime()
    let t = 0
    const tick = () => {
      const r = fin - Date.now()
      setResto(r)
      if (r > 0) return
      window.clearInterval(t)
      let yaRecargo = true // sin almacenamiento no se recarga: mejor un precio viejo que un ciclo
      try {
        const clave = `taller_recarga_${hasta}`
        yaRecargo = sessionStorage.getItem(clave) === '1'
        if (!yaRecargo) sessionStorage.setItem(clave, '1')
      } catch {
        /* modo privado o almacenamiento bloqueado */
      }
      if (!yaRecargo) window.location.reload()
    }
    t = window.setInterval(tick, 30_000)
    tick()
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
