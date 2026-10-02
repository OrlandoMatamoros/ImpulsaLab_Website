'use client'

import { useEffect } from 'react'
import { evento } from '../_componentes/referido'

/** Registra la compra en la analítica una sola vez por pestaña (recargar no la duplica). */
export default function RegistrarCompra({ valor, franja }: { valor: number; franja: string }) {
  useEffect(() => {
    try {
      const clave = `taller_compra_${window.location.search}`
      if (sessionStorage.getItem(clave)) return
      sessionStorage.setItem(clave, '1')
    } catch {
      /* sin almacenamiento: se registra igual */
    }
    evento('taller_compra', { valor, franja, moneda: 'USD' })
  }, [valor, franja])
  return null
}
