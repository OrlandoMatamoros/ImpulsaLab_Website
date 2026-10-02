import { TALLER } from './config'
import { contarPagos, llaveTaller } from './stripe'

/**
 * Puestos vendidos = pagos exitosos en Stripe con `metadata.evento` de este evento (se ponen en
 * cada pago desde app/api/taller/checkout). Se guarda 60 s por instancia para no consultar Stripe
 * en cada visita. Devuelve null si no se pudo saber (sin llave o Stripe caído): en ese caso la
 * venta NO se frena — es preferible un posible sobrecupo de 1-2 personas a cerrar la venta por
 * una falla técnica. Los pagos reembolsados siguen contando (queda del lado seguro).
 */
let memoria: { vendidos: number; vence: number } | null = null

export async function cuposVendidos(): Promise<number | null> {
  if (memoria && memoria.vence > Date.now()) return memoria.vendidos
  const llave = llaveTaller()
  if (!llave) return null
  try {
    const vendidos = await contarPagos(llave, `metadata['evento']:'${TALLER.id}' AND status:'succeeded'`)
    memoria = { vendidos, vence: Date.now() + 60_000 }
    return vendidos
  } catch (err) {
    console.error('[taller] No se pudo contar los puestos vendidos:', String(err))
    return null
  }
}

export interface EstadoCupo {
  /** null = no se pudo saber. */
  quedan: number | null
  agotado: boolean
  /** true solo cuando quedan pocos de verdad (config `avisarQuedanDesde`). */
  avisar: boolean
}

export async function estadoCupo(): Promise<EstadoCupo> {
  const vendidos = await cuposVendidos()
  if (vendidos === null) return { quedan: null, agotado: false, avisar: false }
  const quedan = Math.max(0, TALLER.cupoMaximo - vendidos)
  return { quedan, agotado: quedan === 0, avisar: quedan > 0 && quedan <= TALLER.avisarQuedanDesde }
}
