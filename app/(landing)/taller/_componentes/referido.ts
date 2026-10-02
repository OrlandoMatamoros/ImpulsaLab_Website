'use client'

import { TALLER } from '@/lib/taller/config'

/**
 * Código del vendedor que trajo al visitante (`/taller?ref=yorkis`).
 * Se guarda en el navegador 30 días: si la persona vuelve otro día sin el enlace,
 * la venta igual cuenta para quien la recomendó. El servidor lo vuelve a validar.
 * Si el navegador no deja guardar (modo privado), se usa solo el de la URL.
 */
const CLAVE = 'taller_ref'
const DURACION_MS = 30 * 24 * 3600 * 1000

function slugValido(s: string | null): string | null {
  if (!s) return null
  const limpio = s.trim().toLowerCase()
  return TALLER.vendedores.some((v) => v.slug === limpio) ? limpio : null
}

export function refDeLaUrl(): string | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  return slugValido(p.get('ref') ?? p.get('v'))
}

export function guardarRef(slug: string) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ slug, hasta: Date.now() + DURACION_MS }))
  } catch {
    /* sin almacenamiento: queda solo el de la URL */
  }
}

/** El de la URL manda; si no hay, el guardado (si no venció). */
export function refActual(): string | null {
  const deUrl = refDeLaUrl()
  if (deUrl) return deUrl
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return null
    const { slug, hasta } = JSON.parse(crudo) as { slug?: string; hasta?: number }
    if (!hasta || hasta < Date.now()) {
      localStorage.removeItem(CLAVE)
      return null
    }
    return slugValido(slug ?? null)
  } catch {
    return null
  }
}

export function nombreVendedor(slug: string | null): string | null {
  return TALLER.vendedores.find((v) => v.slug === slug)?.nombre ?? null
}

/** Evento de analítica (Google tag). No falla si el tag no cargó. */
export function evento(nombre: string, datos: Record<string, string | number> = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', nombre, datos)
  } catch {
    /* la analítica nunca frena la inscripción */
  }
}
