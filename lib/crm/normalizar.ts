// lib/crm/normalizar.ts
// Todo lo determinista del CRM vive aquí (regla 66): normalizar teléfonos y
// correos, decidir la clave de identidad de un contacto, detectar pruebas y
// calcular ids estables. Funciones puras, sin dependencias — se pueden correr
// con `node --experimental-strip-types scripts/test-crm-normalizar.ts`.

import { createHash } from 'crypto'
import type { Origen } from './tipos'

/** Dominios que NO son un correo real de una persona:
 *  - impulsalab.local: lo INVENTA el Lead Router para los leads de WhatsApp
 *    (`whatsapp+<digitos>@impulsalab.local`). Usarlo como identidad partiría en
 *    dos al mismo contacto (uno por teléfono, otro por este correo falso). */
const DOMINIOS_SINTETICOS = ['impulsalab.local']

/** Marcas de prueba: los números de Orlando y los dominios/nombres que se
 *  usaron en los smoke tests de mayo-2026. No se borran: se guardan con
 *  `es_prueba: true` y el panel los esconde salvo que se pidan. */
const TELEFONOS_PRUEBA = ['19293686749', '19294138823']
const DOMINIOS_PRUEBA = ['test.com', 'empresa-real.com', 'example.com', 'impulsalab.local']
const PREFIJOS_PRUEBA = ['smoke', 'test', 'prueba', 'qa-']

const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Deja solo dígitos. `whatsapp:+57 312 650 7341` → `573126507341`.
 *  Menos de 8 dígitos no es un teléfono utilizable como identidad. */
export function normalizarTelefono(valor?: string | null): string {
  if (!valor) return ''
  const digitos = String(valor).replace(/\D/g, '')
  if (digitos.length < 8 || digitos.length > 18) return ''
  return digitos
}

/** Minúsculas + trim. Devuelve '' si no parece correo o si es sintético. */
export function normalizarCorreo(valor?: string | null): string {
  if (!valor) return ''
  const correo = String(valor).trim().toLowerCase()
  if (!RE_CORREO.test(correo) || correo.length > 120) return ''
  const dominio = correo.split('@')[1] || ''
  if (DOMINIOS_SINTETICOS.includes(dominio)) return ''
  return correo
}

/** Claves de identidad del contacto, para deduplicar por teléfono O correo. */
export function clavesDeContacto(telefonoNorm: string, correoNorm: string): string[] {
  const claves: string[] = []
  if (telefonoNorm) claves.push('tel:' + telefonoNorm)
  if (correoNorm) claves.push('mail:' + correoNorm)
  return claves
}

/** Id del documento en `crm_contactos`. Determinista: el mismo teléfono (o el
 *  mismo correo) siempre cae en el mismo documento aunque lleguen dos mensajes
 *  al mismo tiempo. El teléfono manda porque es el canal principal (WhatsApp). */
export function idDeContacto(telefonoNorm: string, correoNorm: string): string {
  if (telefonoNorm) return 'tel_' + telefonoNorm
  if (correoNorm) return 'mail_' + correoNorm.replace(/[^a-z0-9]+/g, '_').slice(0, 120)
  return ''
}

/** ¿Es una prueba nuestra y no un prospecto real? */
export function esPrueba(datos: {
  telefonoNorm?: string
  correoNorm?: string
  correoCrudo?: string
  nombre?: string
}): boolean {
  const tel = datos.telefonoNorm || ''
  if (tel && TELEFONOS_PRUEBA.includes(tel)) return true

  const correo = (datos.correoNorm || datos.correoCrudo || '').trim().toLowerCase()
  if (correo) {
    const dominio = correo.split('@')[1] || ''
    if (DOMINIOS_PRUEBA.includes(dominio)) return true
    const usuario = correo.split('@')[0] || ''
    if (PREFIJOS_PRUEBA.some((p) => usuario.startsWith(p))) return true
  }

  const nombre = (datos.nombre || '').trim().toLowerCase()
  if (nombre && PREFIJOS_PRUEBA.some((p) => nombre.startsWith(p))) return true

  return false
}

/** Traduce el `source` de n8n al vocabulario del CRM. */
export function normalizarOrigen(valor?: string | null): Origen {
  const v = String(valor || '').trim().toLowerCase()
  if (v === 'whatsapp') return 'whatsapp'
  if (v === 'contactsection' || v === 'formulario' || v === 'contacto') return 'formulario'
  if (v === 'diagnostico' || v === 'diagnostico3d') return 'diagnostico'
  if (v === 'leads_capture' || v === 'herramienta') return 'herramienta'
  if (v === 'carga_inicial') return 'carga_inicial'
  return 'otro'
}

/** Id determinista del mensaje: el mismo evento reenviado dos veces (reintento
 *  de n8n, doble disparo del webhook) cae en el mismo documento y no duplica. */
export function idDeMensaje(partes: {
  origen: string
  clave: string
  eventoId?: string
  fechaISO?: string
  texto?: string
}): string {
  const semilla = partes.eventoId
    ? [partes.origen, partes.clave, partes.eventoId].join('|')
    : [
        partes.origen,
        partes.clave,
        (partes.fechaISO || '').slice(0, 16), // hasta el minuto
        (partes.texto || '').slice(0, 200),
      ].join('|')
  return createHash('sha256').update(semilla).digest('hex').slice(0, 32)
}

/** Fecha ISO válida o `porDefecto`. Nunca deja pasar basura a Firestore. */
export function fechaISO(valor?: string | null, porDefecto: Date = new Date()): string {
  if (valor) {
    const t = Date.parse(String(valor))
    if (!Number.isNaN(t)) return new Date(t).toISOString()
  }
  return porDefecto.toISOString()
}

/** Recorta y limpia un texto libre antes de guardarlo. */
export function texto(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor.replace(/\u0000/g, '').trim().slice(0, max)
}

/** Traduce HOT/WARM/COLD (Lead Router) a la temperatura del CRM. */
export function normalizarTemperatura(valor?: string | null): '' | 'caliente' | 'tibio' | 'frio' {
  const v = String(valor || '').trim().toLowerCase()
  if (v === 'hot' || v === 'caliente') return 'caliente'
  if (v === 'warm' || v === 'tibio') return 'tibio'
  if (v === 'cold' || v === 'frio' || v === 'frío') return 'frio'
  return ''
}
