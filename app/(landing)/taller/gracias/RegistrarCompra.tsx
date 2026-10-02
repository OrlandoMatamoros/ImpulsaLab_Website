'use client'

import { useEffect } from 'react'
import { evento } from '../_componentes/referido'

/**
 * Registra la compra en la analítica una vez por pestaña (recargar no la duplica) y con
 * `transaction_id` (abrirla en otra pestaña tampoco). Solo se monta con pagos reales.
 */
export default function RegistrarCompra({ id, valor, franja }: { id: string; valor: number; franja: string }) {
  useEffect(() => {
    try {
      const clave = `taller_compra_${id}`
      if (sessionStorage.getItem(clave)) return
      sessionStorage.setItem(clave, '1')
    } catch {
      /* sin almacenamiento: se registra igual */
    }
    evento('taller_compra', { transaction_id: id, value: valor, currency: 'USD', franja })
  }, [id, valor, franja])
  return null
}
