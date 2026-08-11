import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// El store de Upstash ("upstash-kv-cyclamen-elephant") figura como
// `uninstalled` en Vercel (ver auditoría 2026-08-11). Las variables
// KV_REST_API_URL / KV_REST_API_TOKEN pueden seguir presentes pero ya no
// apuntan a un store vivo: cualquier llamada real a Redis va a fallar en
// tiempo de ejecución, no al cargar este módulo. Por eso NO usamos `!`
// (non-null assertion) para leerlas: eso solo engaña al compilador, no
// protege en runtime — es el mismo patrón que causó el incidente de
// `STRIPE_WEBHOOK_SECRET` (mayo 2026): variable ausente disfrazada de
// "firma inválida" en vez de un error claro.
const UPSTASH_URL = process.env.KV_REST_API_URL
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN
const upstashConfigured = Boolean(UPSTASH_URL && UPSTASH_TOKEN)

if (!upstashConfigured) {
  // Log de arranque (una vez por cold start, no por petición): que quede
  // constancia explícita de que las rutas de IA están operando con el
  // limitador en memoria (fallback) y no con Upstash.
  console.error(
    '[rate-limit] KV_REST_API_URL/KV_REST_API_TOKEN no configuradas — ' +
      'todas las rutas de IA están operando con el limitador en memoria ' +
      '(fallback degradado), NO con Upstash. Ver ' +
      '~/master-reports/2026-08-11_fix_ratelimit_impulsa.md.'
  )
}

const redis = upstashConfigured
  ? new Redis({ url: UPSTASH_URL!, token: UPSTASH_TOKEN! })
  : null

export interface RateLimitResult {
  success: boolean
  remaining: number
  limit: number
  reset: number
  /** true si este resultado vino del fallback en memoria, no de Upstash. */
  degraded?: boolean
  /**
   * Solo se setea (503) cuando NI Upstash NI el fallback en memoria
   * pudieron evaluar el límite — es decir, "no se pudo verificar nada",
   * no "límite superado". En la práctica es casi inalcanzable porque el
   * fallback es un Map en memoria sin I/O, pero se cubre por defensa en
   * profundidad. Si falta, el llamador debe usar 429.
   */
  httpStatus?: 429 | 503
}

const limiterCache = new Map<string, Ratelimit>()

function getLimiter(prefix: string, limit: number, windowSec: number): Ratelimit {
  const cacheKey = `${prefix}:${limit}:${windowSec}`
  const cached = limiterCache.get(cacheKey)
  if (cached) return cached

  const limiter = new Ratelimit({
    redis: redis!,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: `rl:${prefix}`,
    analytics: false,
    ephemeralCache: new Map(),
  })
  limiterCache.set(cacheKey, limiter)
  return limiter
}

// ---------------------------------------------------------------------------
// PALIATIVO — limitador en memoria por instancia (red de seguridad, NO
// sustituto de Redis).
//
// En Vercel (serverless) una misma ruta puede correr en varias instancias
// concurrentes, y CADA UNA tiene su propio proceso Node con su propio Map:
// no comparten contador entre sí. Si Vercel levanta 5 instancias para
// absorber tráfico, el límite real efectivo puede llegar a ser 5× el
// configurado, no el número exacto. Es la misma debilidad que ya se había
// identificado y corregido en `content-strategist/generate` al migrar de un
// Map propio a Upstash ("bypassable under concurrency").
//
// Aun así, es estrictamente mejor que el comportamiento anterior (fail-open:
// dejaba pasar el 100% del tráfico sin ningún contador). Se usa solo cuando
// Upstash no está configurado o falla en tiempo real. Cuando el store de
// Upstash vuelva a instalarse y las env vars apunten a uno vivo, este camino
// deja de ejecutarse solo — no requiere ningún cambio de código.
// ---------------------------------------------------------------------------
interface MemoryBucket {
  count: number
  resetAt: number
}

const MEMORY_STORE_MAX_ENTRIES = 5000
const memoryStore = new Map<string, MemoryBucket>()

function sweepExpired(now: number): void {
  // Solo barre cuando el mapa crece demasiado, para no gastar ciclos en
  // cada petición individual.
  if (memoryStore.size < MEMORY_STORE_MAX_ENTRIES) return
  for (const [key, bucket] of memoryStore) {
    if (now >= bucket.resetAt) memoryStore.delete(key)
  }
}

function memoryRateLimit(key: string, limit: number, windowSec: number): RateLimitResult {
  const now = Date.now()
  sweepExpired(now)

  const windowMs = windowSec * 1000
  const bucket = memoryStore.get(key)

  if (!bucket || now >= bucket.resetAt) {
    const resetAt = now + windowMs
    memoryStore.set(key, { count: 1, resetAt })
    return { success: true, remaining: limit - 1, limit, reset: resetAt, degraded: true }
  }

  bucket.count += 1
  const success = bucket.count <= limit
  return {
    success,
    remaining: Math.max(0, limit - bucket.count),
    limit,
    reset: bucket.resetAt,
    degraded: true,
  }
}

export async function rateLimit(opts: {
  prefix: string
  identifier: string
  limit: number
  windowSec: number
}): Promise<RateLimitResult> {
  const memoryKey = `${opts.prefix}:${opts.identifier}`

  try {
    if (!upstashConfigured) {
      return memoryRateLimit(memoryKey, opts.limit, opts.windowSec)
    }

    try {
      const limiter = getLimiter(opts.prefix, opts.limit, opts.windowSec)
      const r = await limiter.limit(opts.identifier)
      return {
        success: r.success,
        remaining: r.remaining,
        limit: r.limit,
        reset: r.reset,
      }
    } catch (err) {
      // FAIL-CLOSED (antes era fail-open): Upstash no respondió. Ya NO se
      // deja pasar la petición en silencio. Se degrada al limitador en
      // memoria (paliativo, ver nota arriba) y se deja constancia EXPLÍCITA
      // en el log — visible en Vercel Runtime Logs — de que esto está
      // pasando, en vez de un intento mudo.
      console.error(
        `[rate-limit] Upstash (Redis) falló para prefix="${opts.prefix}" — ` +
          'degradando al limitador en memoria (por instancia, no ' +
          'distribuido). Indica que el store de Upstash sigue caído o ' +
          'desinstalado, o hay un problema de red/credenciales:',
        err
      )
      return memoryRateLimit(memoryKey, opts.limit, opts.windowSec)
    }
  } catch (err) {
    // No debería llegar aquí nunca: memoryRateLimit es un Map en memoria
    // puro, sin I/O, no debería lanzar. Si llega, es un bug real y no una
    // caída externa — fail-closed duro con 503 en vez de dejar pasar.
    console.error(
      '[rate-limit] CRITICAL: no se pudo evaluar el límite ni con Upstash ' +
        'ni con el fallback en memoria — rechazando la petición:',
      err
    )
    return {
      success: false,
      remaining: 0,
      limit: opts.limit,
      reset: Date.now() + opts.windowSec * 1000,
      httpStatus: 503,
    }
  }
}
