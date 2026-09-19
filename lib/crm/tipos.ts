// lib/crm/tipos.ts
// Vocabulario compartido del CRM interno (panel admin + endpoint de ingesta).
// Se importa tanto desde el servidor (rutas API) como desde el cliente (UI),
// así que este archivo NO puede importar firebase-admin ni nada de Node.

export const ETAPAS = ['nuevo', 'contactado', 'propuesta', 'cliente', 'perdido'] as const
export type Etapa = (typeof ETAPAS)[number]

export const ETAPA_LABEL: Record<Etapa, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  propuesta: 'Propuesta',
  cliente: 'Cliente',
  perdido: 'Perdido',
}

export const TEMPERATURAS = ['caliente', 'tibio', 'frio'] as const
export type Temperatura = (typeof TEMPERATURAS)[number]

export const TEMPERATURA_LABEL: Record<Temperatura, string> = {
  caliente: 'Caliente',
  tibio: 'Tibio',
  frio: 'Frío',
}

// De dónde llegó el contacto. Los flujos de n8n mandan el nombre que usa el
// Lead Router (`contactsection`, `leads_capture`, …); `normalizarOrigen` lo
// traduce a este vocabulario para que el panel muestre siempre lo mismo.
export const ORIGENES = [
  'whatsapp',
  'formulario',
  'diagnostico',
  'herramienta',
  'carga_inicial',
  'otro',
] as const
export type Origen = (typeof ORIGENES)[number]

export const ORIGEN_LABEL: Record<Origen, string> = {
  whatsapp: 'WhatsApp',
  formulario: 'Formulario del sitio',
  diagnostico: 'Diagnóstico 3D',
  herramienta: 'Herramienta del sitio',
  carga_inicial: 'Carga inicial (hoja)',
  otro: 'Otro',
}

export type DireccionMensaje = 'entrante' | 'saliente'
export type AutorMensaje = 'contacto' | 'bot' | 'orlando'

export interface NotaCRM {
  fecha: string // ISO
  texto: string
}

export interface CambioEtapa {
  fecha: string // ISO
  de: Etapa | ''
  a: Etapa
}

export interface ContactoCRM {
  id: string
  nombre: string
  telefono: string
  correo: string
  telefono_norm: string
  correo_norm: string
  claves: string[]
  origen: Origen
  origenes: Origen[]
  etapa: Etapa
  temperatura: Temperatura | ''
  interes: string
  primer_contacto: string // ISO
  ultimo_contacto: string // ISO — último mensaje ENTRANTE (lo que escribió la persona)
  ultimo_mensaje: string
  ultimo_mensaje_de: 'contacto' | 'impulsa' | ''
  ultima_gestion: string // ISO — última vez que Orlando movió algo a mano
  proximo_paso: string
  proximo_paso_fecha: string // AAAA-MM-DD
  notas: NotaCRM[]
  historial_etapas: CambioEtapa[]
  n_mensajes: number
  es_prueba: boolean
  creado: string
  actualizado: string
}

export interface MensajeCRM {
  id: string
  contacto_id: string
  fecha: string // ISO
  direccion: DireccionMensaje
  autor: AutorMensaje
  origen: Origen
  texto: string
  evento_id: string
}

/** Días sin que nadie de Impulsa conteste el último mensaje del contacto.
 *  Devuelve null cuando no aplica (etapa cerrada, o ya se gestionó después). */
export function diasSinRespuesta(
  c: Pick<ContactoCRM, 'etapa' | 'ultimo_contacto' | 'ultima_gestion' | 'ultimo_mensaje_de'>,
  ahora: Date = new Date(),
): number | null {
  if (c.etapa === 'cliente' || c.etapa === 'perdido') return null
  if (!c.ultimo_contacto) return null
  // Si Orlando hizo algo DESPUÉS del último mensaje del contacto, está atendido.
  if (c.ultima_gestion && c.ultima_gestion >= c.ultimo_contacto) return null
  const t = Date.parse(c.ultimo_contacto)
  if (Number.isNaN(t)) return null
  const dias = Math.floor((ahora.getTime() - t) / 86400000)
  return dias >= 0 ? dias : null
}

export const DIAS_ALERTA_SIN_RESPUESTA = 3

export function sinRespuesta(
  c: Pick<ContactoCRM, 'etapa' | 'ultimo_contacto' | 'ultima_gestion' | 'ultimo_mensaje_de'>,
  ahora: Date = new Date(),
): boolean {
  const d = diasSinRespuesta(c, ahora)
  return d !== null && d > DIAS_ALERTA_SIN_RESPUESTA
}

/** El teléfono como se marca, sin el prefijo `whatsapp:` que trae Twilio.
 *  `whatsapp:+5215533031499` → `+5215533031499`. */
export function telefonoLegible(telefono: string): string {
  const limpio = (telefono || '').replace(/^whatsapp:\s*/i, '').trim()
  if (!limpio) return ''
  const digitos = limpio.replace(/\D/g, '')
  return digitos ? '+' + digitos : ''
}

/** Mensaje que se abre ya escrito al pulsar «Escribir por WhatsApp».
 *  Lo envía Orlando desde SU número, no desde el del bot (ese es de Twilio). */
export function mensajeWhatsApp(
  c: Pick<ContactoCRM, 'nombre' | 'interes'>,
): string {
  const nombre = (c.nombre || '').trim().split(/\s+/)[0]
  const saludo = nombre && nombre.toLowerCase() !== 'sin' ? `Hola ${nombre}` : 'Hola'
  const tema = (c.interes || '').trim()
  const sobre = tema ? ` sobre ${tema.charAt(0).toLowerCase() + tema.slice(1)}` : ''
  return (
    `${saludo}, soy Orlando Matamoros, de Impulsa Lab. ` +
    `Escribiste a nuestro asistente por WhatsApp${sobre} y te escribo yo directamente para retomarlo. ` +
    `Cuéntame en qué punto estás y te digo con franqueza si podemos ayudarte.`
  )
}

/** Enlace de WhatsApp con el mensaje ya escrito. Devuelve '' si no hay teléfono. */
export function enlaceWhatsApp(
  c: Pick<ContactoCRM, 'nombre' | 'interes' | 'telefono' | 'telefono_norm'>,
): string {
  const digitos = (c.telefono_norm || '').replace(/\D/g, '') || telefonoLegible(c.telefono).replace(/\D/g, '')
  if (!digitos) return ''
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensajeWhatsApp(c))}`
}
