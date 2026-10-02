/**
 * Evento de IA de Impulsa (Masterclass) — ÚNICO lugar donde viven el nombre, la fecha, el
 * horario, el lugar, el cupo, los precios por franja y los vendedores. La landing (/masterclass),
 * el cobro de Stripe, la página de gracias, el calendario (.ics) y la imagen para compartir
 * leen de aquí.
 *
 * Para cambiar algo, se cambia SOLO este archivo:
 * - El NOMBRE del evento y cómo se nombra dentro de las frases están en `evento`. Si Orlando
 *   decide «Taller» o «Mentoría» en vez de «Masterclass», se cambian esas 5 líneas y nada más.
 * - Las horas van con el desfase de Nueva York de ESA fecha: en 2026 el horario de verano
 *   (EDT, -04:00) termina el domingo 1-nov; desde ahí es EST (-05:00). Un desfase mal puesto
 *   corre el corte una hora — las pruebas de lib/taller/taller.test.ts lo atrapan.
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
  /** Va en el enlace (`/masterclass?ref=yorkis`) y al metadato de Stripe. Solo minúsculas y números. */
  slug: string
  /** Lo ve el comprador en «¿Quién te recomendó?» del pago. */
  nombre: string
}

export const TALLER = {
  /** Identificador interno: va al metadato de cada pago. No cambiarlo después de vender. */
  id: 'taller-ia-2026-11-20',

  /** Cómo se llama el evento y cómo se nombra dentro de una frase («te esperamos en la masterclass»). */
  evento: {
    nombre: 'Masterclass de IA',
    nombreLargo: 'Masterclass de IA para dueños de negocio',
    la: 'la masterclass', // «Te esperamos en la masterclass»
    dela: 'de la masterclass', // «Después de la masterclass»
    ala: 'a la masterclass', // «Llega a la masterclass»
  },

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

  /** Puestos del salón (tope físico que dio Orlando). Es lo que se anuncia: «Cupo limitado: 100 puestos». */
  cupoMaximo: 100,
  /** La venta se cierra estos puestos antes del tope, por la demora del conteo de Stripe (ver cupos.ts).
   *  En 0 por decisión de Orlando (2-oct): el salón aguanta los 100 justos. Con 0, en una ráfaga
   *  final podrían pagar 1-2 personas más de 100 (el conteo tarda hasta ~1 min en ver un pago). */
  margenSobrecupo: 0,
  /** «Quedan N puestos» se muestra solo cuando quedan esta cantidad o menos (escasez real, no inventada). */
  avisarQuedanDesde: 25,

  /** Último día para pedir la devolución si alguien pagó y no puede ir (después se cede el cupo). */
  limiteDevolucion: '2026-11-13T23:59:00-05:00',

  franjas: [
    { id: 'preventa-1', nombre: 'Preventa', precio: 129, corte: '2026-10-21T00:00:00-04:00' },
    { id: 'preventa-2', nombre: 'Segunda preventa', precio: 159, corte: '2026-11-06T00:00:00-05:00' },
    // La última franja vale hasta que empieza el evento: ahí se cierra la venta.
    { id: 'completo', nombre: 'Precio completo', precio: 169, corte: '2026-11-20T15:00:00-05:00' },
  ] satisfies Franja[],

  vendedores: [
    { slug: 'yorkis', nombre: 'Yorkis' },
    { slug: 'alex', nombre: 'Alex' },
    { slug: 'diego', nombre: 'Diego' },
  ] satisfies Vendedor[],

  /** WhatsApp de atención humana (el 929 es la entrada del bot y no conoce el evento). */
  whatsapp: '13474509281',
  /** Redes de Impulsa Lab (las mismas del sitio, ver app/layout.tsx). */
  redes: {
    instagram: 'https://www.instagram.com/tuimpulsalabny/',
    facebook: 'https://www.facebook.com/Tuimpulsalab',
  },

  /** Video del héroe (30-60 s). null = no se muestra. Ruta pública, p. ej. '/videos/taller-heroe.mp4'. */
  videoHeroe: null as string | null,
} as const

export type Taller = typeof TALLER
