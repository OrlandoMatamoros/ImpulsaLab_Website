/**
 * Taller + mentoría de IA — ÚNICO lugar donde viven la fecha, el horario, el lugar,
 * los precios por franja y los vendedores. La landing (/taller), el cobro de Stripe,
 * la página de gracias, el calendario (.ics) y la imagen para compartir leen de aquí.
 *
 * Para cambiar algo, se cambia SOLO este archivo:
 * - Las horas van con el desfase de Nueva York de ESA fecha: en 2026 el horario de verano
 *   (EDT, -04:00) termina el domingo 1-nov; desde ahí es EST (-05:00). Un desfase mal puesto
 *   corre el corte una hora — las pruebas de lib/taller/precio.test.ts lo atrapan.
 * - `corte` de una franja = el instante en que deja de valer. Se escribe como la medianoche
 *   del día siguiente: la página muestra «hasta el martes 20 de octubre a las 11:59 p. m.».
 * - Al lanzar de verdad: `lanzado: true` (deja indexar la página y la mete al sitemap) y
 *   cambiar en Vercel TALLER_STRIPE_SECRET_KEY por la llave de producción.
 */

export interface Franja {
  /** Va al metadato de Stripe: no renombrar una franja que ya vendió. */
  id: string
  nombre: string
  /** Dólares enteros. */
  precio: number
  /** Instante (ISO con desfase de NY) en que la franja DEJA de valer. */
  corte: string
}

export interface Vendedor {
  /** Va en el enlace (`/taller?ref=yorkis`) y al metadato de Stripe. Solo minúsculas y números. */
  slug: string
  /** Lo ve el comprador en «¿Quién te recomendó?» del pago. */
  nombre: string
}

export const TALLER = {
  /** Identificador interno: va al metadato de cada pago. No cambiarlo después de vender. */
  id: 'taller-ia-2026-11-20',
  nombre: 'Taller + mentoría de IA',
  nombreLargo: 'Taller + mentoría de IA para tu negocio',

  /** Página indexable y en el sitemap. En false mientras se confirma con Yorkis y el salón. */
  lanzado: false,

  inicio: '2026-11-20T15:00:00-05:00',
  fin: '2026-11-20T19:00:00-05:00',

  lugar: {
    nombre: 'Brooklyn',
    direccion: '234 Chestnut St',
    ciudad: 'Brooklyn, NY 11208',
    mapa: 'https://www.google.com/maps/search/?api=1&query=234+Chestnut+St,+Brooklyn,+NY+11208',
  },

  /** Si a la fecha de decisión no se llega a este número, se cancela y se devuelve todo. */
  minimoPersonas: 25,
  /** Día en que se decide si el taller va (y último día para pedir devolución por no poder ir). */
  decision: '2026-11-13T23:59:00-05:00',

  franjas: [
    { id: 'preventa-1', nombre: 'Preventa', precio: 129, corte: '2026-10-21T00:00:00-04:00' },
    { id: 'preventa-2', nombre: 'Segunda preventa', precio: 159, corte: '2026-11-06T00:00:00-05:00' },
    // La última franja vale hasta que empieza el taller: ahí se cierra la venta.
    { id: 'completo', nombre: 'Precio completo', precio: 169, corte: '2026-11-20T15:00:00-05:00' },
  ] satisfies Franja[],

  vendedores: [
    { slug: 'yorkis', nombre: 'Yorkis' },
    { slug: 'alex', nombre: 'Alex' },
    { slug: 'diego', nombre: 'Diego' },
  ] satisfies Vendedor[],

  /** WhatsApp de atención humana (el 929 es la entrada del bot y no conoce el taller). */
  whatsapp: '13474509281',

  /** Video del héroe (30-60 s). null = no se muestra. Ruta pública, p. ej. '/videos/taller-heroe.mp4'. */
  videoHeroe: null as string | null,
} as const

export type Taller = typeof TALLER
