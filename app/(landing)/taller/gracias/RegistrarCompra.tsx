'use client'

import { useEffect } from 'react'
import { evento } from '../_componentes/referido'

/**
 * Registra la compra en la analítica una vez por pestaña (recargar no la duplica). Va con el
 * nombre estándar `purchase` + `transaction_id`, que es lo que Google usa para no contarla dos
 * veces si se abre en otra pestaña. Solo se monta con pagos reales. Par de embudo:
 * taller_ver → taller_reservar → purchase. No renombrar una vez que tenga datos (regla 53).
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
    evento('purchase', {
      transaction_id: id,
      value: valor,
      currency: 'USD',
      items: [{ item_id: 'taller-ia', item_name: 'Taller + mentoría de IA', item_variant: franja, price: valor, quantity: 1 }],
    })
  }, [id, valor, franja])
  return null
}
