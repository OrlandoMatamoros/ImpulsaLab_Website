import { TALLER, type Franja, type Vendedor } from './config'

export type EstadoVenta =
  | { abierta: true; franja: Franja; indice: number; siguiente: Franja | null }
  | { abierta: false }

/**
 * Franja vigente en `ahora`. Es la ÚNICA fuente del precio que se cobra:
 * el servidor la calcula en cada intento de pago, nunca la toma del navegador.
 */
export function estadoVenta(ahora: Date = new Date()): EstadoVenta {
  const t = ahora.getTime()
  const franjas: readonly Franja[] = TALLER.franjas
  for (let i = 0; i < franjas.length; i++) {
    if (t < new Date(franjas[i].corte).getTime()) {
      return { abierta: true, franja: franjas[i], indice: i, siguiente: franjas[i + 1] ?? null }
    }
  }
  return { abierta: false }
}

const SLUG_VALIDO = /^[a-z0-9]{1,40}$/

/** Devuelve el vendedor si el código del enlace corresponde a uno de la lista; si no, null. */
export function vendedorPorRef(ref: unknown): Vendedor | null {
  if (typeof ref !== 'string') return null
  const limpio = ref.trim().toLowerCase()
  if (!SLUG_VALIDO.test(limpio)) return null
  const vendedores: readonly Vendedor[] = TALLER.vendedores
  return vendedores.find((v) => v.slug === limpio) ?? null
}
