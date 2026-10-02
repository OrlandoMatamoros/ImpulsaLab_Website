import { TALLER } from './config'
import { contarPagos, llaveTaller } from './stripe'

/**
 * Puestos vendidos = pagos exitosos en Stripe con `metadata.evento` de este evento (se ponen en
 * cada pago desde app/api/taller/checkout). Se guarda 60 s por instancia para no consultar Stripe
 * en cada visita. Si Stripe falla o tarda más de 3 s, se usa el último conteo bueno y no se
 * reintenta en 30 s; si nunca hubo uno, devuelve null y la venta NO se frena (es preferible
 * vender que cerrar por una falla técnica; el margen de config cubre la demora). Los pagos
 * reembolsados siguen contando: esos puestos no vuelven a la venta (queda del lado seguro).
 */
let memoria: { vendidos: number | null; vence: number } | null = null
/** Último conteo bueno: si Stripe falla, se usa este en vez de dejar la página esperando. */
let ultimoBueno: number | null = null

export async function cuposVendidos(): Promise<number | null> {
  if (memoria && memoria.vence > Date.now()) return memoria.vendidos
  const llave = llaveTaller()
  if (!llave) return null
  try {
    const vendidos = await contarPagos(llave, `metadata['evento']:'${TALLER.id}' AND status:'succeeded'`)
    ultimoBueno = vendidos
    memoria = { vendidos, vence: Date.now() + 60_000 }
    return vendidos
  } catch (err) {
    console.error('[taller] No se pudo contar los puestos vendidos:', String(err))
    // Si Stripe falla o está lento, no se reintenta en cada visita: se guarda el fallo 30 s.
    memoria = { vendidos: ultimoBueno, vence: Date.now() + 30_000 }
    return ultimoBueno
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
  // La venta se cierra `margenSobrecupo` puestos antes del tope: la búsqueda de Stripe tarda hasta
  // ~1 min en ver un pago nuevo y el conteo se guarda 60 s, así que en una ráfaga final podrían
  // pagar unos pocos más de los que se ven. Así nunca se pasa del tope físico del salón.
  const quedan = Math.max(0, TALLER.cupoMaximo - TALLER.margenSobrecupo - vendidos)
  return { quedan, agotado: quedan === 0, avisar: quedan > 0 && quedan <= TALLER.avisarQuedanDesde }
}
