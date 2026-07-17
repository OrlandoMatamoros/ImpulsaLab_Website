// lib/ssrf-guard.ts
// Defensa SSRF para endpoints que hacen fetch de URLs provistas por el usuario
// (p.ej. el analizador web). Bloquea que el servidor sea usado para alcanzar
// destinos internos: loopback, IPs privadas, link-local (metadata de cloud
// 169.254.169.254), esquemas no-http, etc. — incluso a través de redirects.
//
// Runtime: Node.js (usa dns). NO importar desde el Edge middleware.

import { lookup } from 'node:dns/promises'

const MAX_REDIRECTS = 4
const FETCH_TIMEOUT_MS = 15000

function ipToLong(ip: string): number | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  let n = 0
  for (const p of parts) {
    const o = Number(p)
    if (!Number.isInteger(o) || o < 0 || o > 255) return null
    n = n * 256 + o
  }
  return n >>> 0
}

/** ¿La IP (v4 o v6) pertenece a un rango interno/no enrutable públicamente? */
export function isPrivateIp(ip: string): boolean {
  const addr = ip.trim().toLowerCase()

  // IPv6
  if (addr.includes(':')) {
    if (addr === '::1' || addr === '::') return true // loopback / unspecified
    if (addr.startsWith('fe80')) return true // link-local
    if (addr.startsWith('fc') || addr.startsWith('fd')) return true // ULA fc00::/7
    // IPv4 mapeada (::ffff:a.b.c.d) → validar la parte v4
    const m = addr.match(/(\d+\.\d+\.\d+\.\d+)$/)
    if (m) return isPrivateIp(m[1])
    return false
  }

  // IPv4
  const long = ipToLong(addr)
  if (long === null) return true // no parseable → tratar como inseguro
  const inRange = (base: string, bits: number) => {
    const b = ipToLong(base)!
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
    return (long & mask) === (b & mask)
  }
  return (
    inRange('0.0.0.0', 8) || // "this" network
    inRange('10.0.0.0', 8) || // privada
    inRange('100.64.0.0', 10) || // CGNAT
    inRange('127.0.0.0', 8) || // loopback
    inRange('169.254.0.0', 16) || // link-local (metadata cloud)
    inRange('172.16.0.0', 12) || // privada
    inRange('192.0.0.0', 24) ||
    inRange('192.168.0.0', 16) || // privada
    inRange('198.18.0.0', 15) || // benchmarking
    inRange('224.0.0.0', 4) || // multicast
    inRange('240.0.0.0', 4) // reservado
  )
}

/**
 * Valida que una URL apunte a un destino público seguro. Lanza Error si no.
 * - Solo http/https.
 * - El hostname debe resolver por DNS a IP(s) públicas (bloquea rebinding a
 *   IP interna y hostnames tipo localhost / *.internal).
 */
export async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let u: URL
  try {
    u = new URL(rawUrl)
  } catch {
    throw new Error('URL inválida')
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error('Solo se permiten URLs http/https')
  }
  const host = u.hostname.replace(/^\[|\]$/g, '') // quita corchetes de IPv6

  // Si el host ya es una IP literal, validar directo.
  if (/^[\d.]+$/.test(host) || host.includes(':')) {
    if (isPrivateIp(host)) throw new Error('Destino no permitido (dirección interna)')
    return u
  }

  // Bloqueo de hostnames obviamente internos.
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.internal') || host.endsWith('.local')) {
    throw new Error('Destino no permitido (host interno)')
  }

  // Resolver DNS y verificar TODAS las IPs (evita DNS rebinding a IP interna).
  let records: Array<{ address: string }>
  try {
    records = await lookup(host, { all: true })
  } catch {
    throw new Error('No se pudo resolver el dominio')
  }
  if (records.length === 0) throw new Error('No se pudo resolver el dominio')
  for (const r of records) {
    if (isPrivateIp(r.address)) {
      throw new Error('Destino no permitido (resuelve a dirección interna)')
    }
  }
  return u
}

/**
 * fetch con defensa SSRF: valida la URL inicial y CADA redirect contra
 * assertPublicUrl (redirect manual). Devuelve la Response final.
 */
export async function safeFetch(rawUrl: string, headers: Record<string, string>): Promise<Response> {
  let current = rawUrl
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const validated = await assertPublicUrl(current)
    const res = await fetch(validated.toString(), {
      headers,
      redirect: 'manual',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    // 3xx con Location → validar destino y seguir manualmente.
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location')
      if (!loc) return res
      current = new URL(loc, validated).toString()
      continue
    }
    return res
  }
  throw new Error('Demasiadas redirecciones')
}
