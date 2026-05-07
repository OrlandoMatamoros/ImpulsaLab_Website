/**
 * Schema.org helper utilities — Impulsa Lab
 *
 * Server-only: these helpers return plain objects intended for
 * `<script type="application/ld+json">` tags rendered server-side.
 * Do NOT import in 'use client' components.
 */

const BASE_URL = 'https://www.tuimpulsalab.com'

export interface BreadcrumbItem {
  name: string
  /** Absolute path, e.g. '/blog' — will be prepended with BASE_URL */
  path: string
}

/**
 * Build a BreadcrumbList JSON-LD object.
 *
 * @example
 * buildBreadcrumbLd([
 *   { name: 'Inicio', path: '/' },
 *   { name: 'Blog', path: '/blog' },
 *   { name: 'Mi post', path: '/blog/mi-post' },
 * ])
 */
export function buildBreadcrumbLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}
