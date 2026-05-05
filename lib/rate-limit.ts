import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface RateLimitResult {
  success: boolean
  remaining: number
  limit: number
}

export async function rateLimit(opts: {
  key: string
  limit: number
  windowSec: number
}): Promise<RateLimitResult> {
  const fullKey = `rl:${opts.key}`

  try {
    const count = await redis.incr(fullKey)
    if (count === 1) {
      await redis.expire(fullKey, opts.windowSec)
    }
    return {
      success: count <= opts.limit,
      remaining: Math.max(0, opts.limit - count),
      limit: opts.limit,
    }
  } catch (err) {
    // Fail-open: an Upstash outage shouldn't take the endpoint down. Log
    // and let the request through. Cold-start in-memory counters are gone,
    // so this is the only fallback layer.
    console.error('[rate-limit] redis failure, allowing request:', err)
    return { success: true, remaining: opts.limit, limit: opts.limit }
  }
}
