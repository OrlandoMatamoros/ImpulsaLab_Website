/**
 * Cliente mínimo de la API de Stripe para el taller (solo servidor).
 * Se usa fetch directo en vez del SDK: son dos llamadas (crear y leer una sesión de pago)
 * y así no se suma una dependencia al sitio.
 *
 * La llave vive en TALLER_STRIPE_SECRET_KEY (Vercel), separada de la del invoicing:
 * hoy es la de PRUEBA (sk_test_…); al lanzar se cambia por la de producción.
 * Solo se importa desde rutas del servidor (app/api/taller y la página de gracias).
 */

const API = 'https://api.stripe.com/v1'
// Versión fija: sin ella Stripe usa la de la cuenta (hoy 2026-03-25.dahlia), que puede no
// conocer parámetros nuevos como `name_collection`. Cambiarla solo después de probar un pago.
const VERSION_API = '2026-09-30.endive'

export interface LlaveTaller {
  clave: string
  modoPrueba: boolean
}

/**
 * Lee la llave y comprueba su FORMA antes de usarla (lección del 22-sep: una variable con
 * basura no falla hasta que alguien intenta pagar). Devuelve null si falta o está mal.
 */
export function llaveTaller(): LlaveTaller | null {
  const clave = process.env.TALLER_STRIPE_SECRET_KEY?.trim()
  if (!clave) {
    console.error('[taller] Falta TALLER_STRIPE_SECRET_KEY: el botón de pago no puede abrir Stripe.')
    return null
  }
  if (!/^(sk|rk)_(test|live)_[A-Za-z0-9]{10,}$/.test(clave)) {
    console.error('[taller] TALLER_STRIPE_SECRET_KEY no tiene forma de llave de Stripe (sk_/rk_ + test/live).')
    return null
  }
  return { clave, modoPrueba: clave.includes('_test_') }
}

type Valor = string | number | boolean | null | undefined | Valor[] | { [k: string]: Valor }

/** Convierte un objeto anidado al formato de formulario de Stripe: a[b][0][c]=v. */
export function aFormulario(obj: Record<string, Valor>): URLSearchParams {
  const out = new URLSearchParams()
  const recorrer = (valor: Valor, clave: string) => {
    if (valor === null || valor === undefined) return
    if (Array.isArray(valor)) {
      valor.forEach((v, i) => recorrer(v, `${clave}[${i}]`))
    } else if (typeof valor === 'object') {
      for (const [k, v] of Object.entries(valor)) recorrer(v, `${clave}[${k}]`)
    } else {
      out.append(clave, String(valor))
    }
  }
  for (const [k, v] of Object.entries(obj)) recorrer(v, k)
  return out
}

export class ErrorStripe extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly codigo?: string,
  ) {
    super(message)
  }
}

async function llamar<T>(
  llave: LlaveTaller,
  metodo: 'GET' | 'POST',
  ruta: string,
  cuerpo?: URLSearchParams,
  limiteMs = 15_000,
): Promise<T> {
  const res = await fetch(`${API}${ruta}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${llave.clave}`,
      'Stripe-Version': VERSION_API,
      ...(cuerpo ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: cuerpo,
    cache: 'no-store',
    signal: AbortSignal.timeout(limiteMs),
  })
  const datos = (await res.json().catch(() => ({}))) as { error?: { message?: string; code?: string } }
  if (!res.ok) {
    throw new ErrorStripe(datos.error?.message ?? `Stripe respondió ${res.status}`, res.status, datos.error?.code)
  }
  return datos as T
}

export interface SesionCheckout {
  id: string
  url: string | null
  livemode: boolean
  status: 'open' | 'complete' | 'expired'
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  amount_total: number | null
  metadata: Record<string, string>
  /** Con `name_collection`, el nombre que escribe el comprador llega en `individual_name`. */
  customer_details: { name: string | null; individual_name?: string | null; email: string | null } | null
}

export function crearSesion(llave: LlaveTaller, params: Record<string, Valor>): Promise<SesionCheckout> {
  return llamar<SesionCheckout>(llave, 'POST', '/checkout/sessions', aFormulario(params))
}

/**
 * Cuántos pagos cumplen una consulta de la búsqueda de Stripe (p. ej. los pagos exitosos de
 * este evento). Ojo: la búsqueda de Stripe tarda hasta ~1 minuto en ver un pago nuevo.
 */
export async function contarPagos(llave: LlaveTaller, consulta: string, limiteMs = 3_000): Promise<number> {
  const q = new URLSearchParams({ query: consulta, limit: '1' })
  q.append('expand[]', 'total_count')
  // Tiempo límite corto: la landing espera este conteo en cada visita y no puede quedarse 15 s.
  const r = await llamar<{ total_count?: number }>(llave, 'GET', `/payment_intents/search?${q.toString()}`, undefined, limiteMs)
  if (typeof r.total_count !== 'number') throw new ErrorStripe('Stripe no devolvió total_count', 502)
  return r.total_count
}

export function leerSesion(llave: LlaveTaller, id: string): Promise<SesionCheckout> {
  return llamar<SesionCheckout>(llave, 'GET', `/checkout/sessions/${encodeURIComponent(id)}`)
}
