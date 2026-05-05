import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface RateLimitResult {
  success: boolean
  remaining: number
  limit: number
  reset: number
}

const limiterCache = new Map<string, Ratelimit>()

function getLimiter(prefix: string, limit: number, windowSec: number): Ratelimit {
  const cacheKey = `${prefix}:${limit}:${windowSec}`
  const cached = limiterCache.get(cacheKey)
  if (cached) return cached

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: `rl:${prefix}`,
    analytics: false,
    ephemeralCache: new Map(),
  })
  limiterCache.set(cacheKey, limiter)
  return limiter
}

export async function rateLimit(opts: {
  prefix: string
  identifier: string
  limit: number
  windowSec: number
}): Promise<RateLimitResult> {
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
    // Fail-open: an Upstash outage shouldn't take the endpoint down. Log
    // and let the request through. ephemeralCache absorbs short blips.
    console.error('[rate-limit] redis failure, allowing request:', err)
    return {
      success: true,
      remaining: opts.limit,
      limit: opts.limit,
      reset: Date.now() + opts.windowSec * 1000,
    }
  }
}
