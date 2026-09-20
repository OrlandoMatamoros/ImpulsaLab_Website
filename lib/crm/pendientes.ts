// lib/crm/pendientes.ts
// Quién se quedó colgado y merece que te avisemos AHORA.
//
// Esto es lo determinista del vigilante de conversaciones cortadas (regla 66):
// el flujo de n8n no decide nada de esto, solo consume el resultado. Claude
// entra después, y solo para redactar el diagnóstico.
//
// La conversación está «cortada» cuando la persona escribió último, nadie de
// Impulsa gestionó después, y ya pasó el tiempo de gracia. Se avisa una vez y
// se repite cada 24 h mientras siga sin atender, con tope: nadie quiere tres
// correos al día por el mismo contacto.

import type { ContactoCRM } from './tipos'

/** Tiempo de gracia antes de avisar: lo justo para no alertar de una conversación viva. */
export const MINUTOS_GRACIA = 45
/** Cada cuánto se insiste mientras nadie atienda. */
export const HORAS_REINTENTO = 24
/** Tope de avisos por el mismo mensaje sin atender. */
export const MAX_AVISOS = 3

export interface EstadoAlerta {
  /** ISO del último aviso enviado. */
  ultima_alerta?: string
  /** Sobre qué `ultimo_contacto` se avisó (si cambia, el contador vuelve a cero). */
  alerta_de?: string
  alertas_enviadas?: number
}

export type ContactoConAlerta = ContactoCRM & EstadoAlerta

function minutosDesde(iso: string, ahora: Date): number | null {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return null
  return Math.floor((ahora.getTime() - t) / 60000)
}

/** ¿Hay que avisar de este contacto en esta corrida? */
export function necesitaAlerta(c: ContactoConAlerta, ahora: Date = new Date()): boolean {
  if (c.es_prueba) return false
  if (c.etapa === 'cliente' || c.etapa === 'perdido') return false
  // Solo si la última palabra la tuvo la persona.
  if (c.ultimo_mensaje_de !== 'contacto') return false
  if (!c.ultimo_contacto) return false
  // Si Orlando movió algo después del último mensaje, está atendido.
  if (c.ultima_gestion && c.ultima_gestion >= c.ultimo_contacto) return false

  const espera = minutosDesde(c.ultimo_contacto, ahora)
  if (espera === null || espera < MINUTOS_GRACIA) return false

  // ¿Ya avisamos de ESTE mensaje?
  const mismoMensaje = c.alerta_de === c.ultimo_contacto
  if (!mismoMensaje) return true // mensaje nuevo sin avisar: se avisa

  if ((c.alertas_enviadas || 0) >= MAX_AVISOS) return false
  if (!c.ultima_alerta) return true
  const desdeAviso = minutosDesde(c.ultima_alerta, ahora)
  return desdeAviso !== null && desdeAviso >= HORAS_REINTENTO * 60
}

/** Cuánto lleva esperando, en texto llano para el correo de aviso. */
export function esperaEnTexto(c: Pick<ContactoCRM, 'ultimo_contacto'>, ahora: Date = new Date()): string {
  const m = minutosDesde(c.ultimo_contacto, ahora)
  if (m === null) return 'sin fecha'
  if (m < 60) return `${m} minutos`
  const horas = Math.floor(m / 60)
  if (horas < 48) return horas === 1 ? '1 hora' : `${horas} horas`
  const dias = Math.floor(horas / 24)
  return `${dias} días`
}

/** Cómo queda el contacto después de avisar (lo escribe /api/crm/alertado). */
export function estadoTrasAlerta(c: ContactoConAlerta, ahora: Date = new Date()): Required<EstadoAlerta> {
  const mismoMensaje = c.alerta_de === c.ultimo_contacto
  return {
    ultima_alerta: ahora.toISOString(),
    alerta_de: c.ultimo_contacto,
    alertas_enviadas: mismoMensaje ? (c.alertas_enviadas || 0) + 1 : 1,
  }
}
