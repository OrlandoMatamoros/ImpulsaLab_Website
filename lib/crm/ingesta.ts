// lib/crm/ingesta.ts
// Lógica de servidor del CRM: convierte un evento suelto (un mensaje de
// WhatsApp, un formulario, un diagnóstico) en UNA fila de contacto + su mensaje
// en el historial. Solo se usa desde rutas de servidor (Admin SDK).
//
// Dos garantías:
//  - IDEMPOTENTE: el id del mensaje se deriva del evento, así que reenviar el
//    mismo evento (reintento de n8n) no duplica nada.
//  - DEDUPLICADO: el contacto se busca por teléfono O correo normalizado; si ya
//    existe, se enriquece — nunca se crea una segunda fila de la misma persona.

import { adminDb } from '@/lib/firebase-admin'
import {
  clavesDeContacto,
  esPrueba,
  fechaISO,
  idDeContacto,
  idDeMensaje,
  normalizarCorreo,
  normalizarOrigen,
  normalizarTelefono,
  normalizarTemperatura,
  texto,
} from './normalizar'
import { ETAPAS, type Etapa, type Origen } from './tipos'

export const COL_CONTACTOS = 'crm_contactos'
export const COL_MENSAJES = 'crm_mensajes'

export interface PayloadIngesta {
  origen?: string
  nombre?: string
  telefono?: string
  correo?: string
  texto?: string
  direccion?: string // 'entrante' | 'saliente'
  autor?: string // 'contacto' | 'bot' | 'orlando'
  fecha?: string
  evento_id?: string
  interes?: string
  temperatura?: string
  respuesta_bot?: string
  sin_mensaje?: boolean
  // Solo se aplican si el contacto es NUEVO o el campo está vacío:
  etapa?: string
  proximo_paso?: string
  proximo_paso_fecha?: string
}

export interface ResultadoIngesta {
  ok: true
  contacto_id: string
  contacto_creado: boolean
  mensajes_nuevos: number
  duplicado: boolean
  es_prueba: boolean
}

export class ErrorIngesta extends Error {
  constructor(
    public codigo: string,
    public status = 400,
  ) {
    super(codigo)
  }
}

const MAX_TEXTO = 4000
const MAX_NOTAS = 200

/** Procesa un evento. Lanza ErrorIngesta si el payload no sirve. */
export async function ingestarEvento(payload: PayloadIngesta): Promise<ResultadoIngesta> {
  const origen: Origen = normalizarOrigen(payload.origen)
  const telefonoNorm = normalizarTelefono(payload.telefono)
  const correoNorm = normalizarCorreo(payload.correo)
  const claves = clavesDeContacto(telefonoNorm, correoNorm)

  if (claves.length === 0) {
    // Sin teléfono ni correo reales no hay a quién volverle a escribir.
    throw new ErrorIngesta('sin_identidad')
  }

  const nombre = texto(payload.nombre, 120)
  const cuerpo = texto(payload.texto, MAX_TEXTO)
  const respuestaBot = texto(payload.respuesta_bot, MAX_TEXTO)
  const ahoraISO = new Date().toISOString()
  const fecha = fechaISO(payload.fecha)
  const prueba = esPrueba({
    telefonoNorm,
    correoNorm,
    correoCrudo: payload.correo,
    nombre,
  })

  const idFijo = idDeContacto(telefonoNorm, correoNorm)
  const claveMensaje = claves[0]

  // Mensajes de este evento: el de la persona y, si viene, la respuesta del bot.
  const mensajes: Array<{
    id: string
    direccion: 'entrante' | 'saliente'
    autor: 'contacto' | 'bot' | 'orlando'
    texto: string
    fecha: string
  }> = []

  if (!payload.sin_mensaje && cuerpo) {
    const direccion = payload.direccion === 'saliente' ? 'saliente' : 'entrante'
    const autor =
      payload.autor === 'bot' ? 'bot' : payload.autor === 'orlando' ? 'orlando' : direccion === 'saliente' ? 'orlando' : 'contacto'
    mensajes.push({
      id: idDeMensaje({ origen, clave: claveMensaje, eventoId: payload.evento_id, fechaISO: fecha, texto: cuerpo }),
      direccion,
      autor,
      texto: cuerpo,
      fecha,
    })
  }

  if (!payload.sin_mensaje && respuestaBot) {
    mensajes.push({
      id: idDeMensaje({
        origen,
        clave: claveMensaje,
        eventoId: payload.evento_id ? payload.evento_id + ':bot' : undefined,
        fechaISO: fecha,
        texto: 'bot:' + respuestaBot,
      }),
      direccion: 'saliente',
      autor: 'bot',
      texto: respuestaBot,
      fecha,
    })
  }

  const etapaInicial: Etapa = (ETAPAS as readonly string[]).includes(payload.etapa || '')
    ? (payload.etapa as Etapa)
    : 'nuevo'
  const temperatura = normalizarTemperatura(payload.temperatura)
  const interes = texto(payload.interes, 200)
  const proximoPaso = texto(payload.proximo_paso, 200)
  const proximoPasoFecha = /^\d{4}-\d{2}-\d{2}$/.test(payload.proximo_paso_fecha || '')
    ? (payload.proximo_paso_fecha as string)
    : ''

  return adminDb.runTransaction(async (t) => {
    // 1. ¿Ya existe este contacto? Se busca por CUALQUIERA de sus claves.
    const encontrados = await t.get(
      adminDb.collection(COL_CONTACTOS).where('claves', 'array-contains-any', claves).limit(5),
    )
    const existente = encontrados.docs[0]
    const ref = existente ? existente.ref : adminDb.collection(COL_CONTACTOS).doc(idFijo)
    const previo = existente ? (existente.data() as Record<string, unknown>) : null

    // 2. ¿Alguno de estos mensajes ya estaba guardado? (idempotencia)
    const refsMensajes = mensajes.map((m) => adminDb.collection(COL_MENSAJES).doc(m.id))
    const yaExisten = refsMensajes.length
      ? (await t.getAll(...refsMensajes)).map((d) => d.exists)
      : []
    const nuevos = mensajes.filter((_, i) => !yaExisten[i])

    // 3. Contacto: crear o enriquecer sin pisar lo que Orlando escribió a mano.
    const entrantes = nuevos.filter((m) => m.direccion === 'entrante')
    const ultimoDelEvento = nuevos.length ? nuevos[nuevos.length - 1] : null
    const ultimoEntrante = entrantes.length ? entrantes[entrantes.length - 1] : null

    const datos: Record<string, unknown> = {
      actualizado: ahoraISO,
      origenes: Array.from(new Set([...(previo?.origenes as string[] | undefined ?? []), origen])),
    }

    // Claves: se acumulan (un contacto puede tener teléfono y correo).
    const clavesPrevias = (previo?.claves as string[] | undefined) ?? []
    datos.claves = Array.from(new Set([...clavesPrevias, ...claves]))

    const vacio = (v: unknown) => v === undefined || v === null || v === ''
    const rellenar = (campo: string, valor: unknown) => {
      if (!vacio(valor) && vacio(previo?.[campo])) datos[campo] = valor
    }

    rellenar('nombre', nombre)
    rellenar('telefono', texto(payload.telefono, 40))
    rellenar('correo', correoNorm)
    rellenar('telefono_norm', telefonoNorm)
    rellenar('correo_norm', correoNorm)
    rellenar('interes', interes)
    rellenar('proximo_paso', proximoPaso)
    rellenar('proximo_paso_fecha', proximoPasoFecha)

    // La temperatura la calculan las máquinas (Lead Router): siempre se refresca.
    if (temperatura) datos.temperatura = temperatura

    if (!previo) {
      datos.creado = ahoraISO
      datos.origen = origen
      datos.etapa = etapaInicial
      datos.es_prueba = prueba
      datos.primer_contacto = ultimoEntrante?.fecha || fecha
      datos.ultima_gestion = ''
      datos.historial_etapas = []
      datos.notas = []
      datos.n_mensajes = 0
      if (vacio(datos.temperatura)) datos.temperatura = temperatura || ''
      if (vacio(datos.nombre)) datos.nombre = nombre || 'Sin nombre'
      if (vacio(datos.telefono)) datos.telefono = texto(payload.telefono, 40)
      if (vacio(datos.correo)) datos.correo = correoNorm
      datos.telefono_norm = telefonoNorm
      datos.correo_norm = correoNorm
      datos.ultimo_contacto = ultimoEntrante?.fecha || fecha
      datos.ultimo_mensaje = ultimoDelEvento?.texto || ''
      datos.ultimo_mensaje_de = ultimoDelEvento?.direccion === 'saliente' ? 'impulsa' : 'contacto'
    } else {
      // Un contacto que ya existía deja de ser "prueba" si llega tráfico real,
      // pero nunca al revés (no se re-marca como prueba lo que ya es real).
      if (previo.es_prueba === true && !prueba) datos.es_prueba = false
      if (previo.es_prueba === undefined) datos.es_prueba = prueba
      if (ultimoEntrante) {
        const previoUltimo = (previo.ultimo_contacto as string) || ''
        if (ultimoEntrante.fecha > previoUltimo) datos.ultimo_contacto = ultimoEntrante.fecha
        const primero = (previo.primer_contacto as string) || ''
        if (!primero || ultimoEntrante.fecha < primero) datos.primer_contacto = ultimoEntrante.fecha
      }
      if (ultimoDelEvento) {
        datos.ultimo_mensaje = ultimoDelEvento.texto
        datos.ultimo_mensaje_de = ultimoDelEvento.direccion === 'saliente' ? 'impulsa' : 'contacto'
      }
    }

    if (nuevos.length) {
      const previos = typeof previo?.n_mensajes === 'number' ? (previo.n_mensajes as number) : 0
      datos.n_mensajes = previos + nuevos.length
    }

    t.set(ref, datos, { merge: true })

    // 4. Mensajes nuevos al historial.
    nuevos.forEach((m) => {
      t.set(adminDb.collection(COL_MENSAJES).doc(m.id), {
        contacto_id: ref.id,
        fecha: m.fecha,
        direccion: m.direccion,
        autor: m.autor,
        origen,
        texto: m.texto,
        evento_id: texto(payload.evento_id, 120),
        creado: ahoraISO,
      })
    })

    return {
      ok: true as const,
      contacto_id: ref.id,
      contacto_creado: !previo,
      mensajes_nuevos: nuevos.length,
      duplicado: mensajes.length > 0 && nuevos.length === 0,
      es_prueba: (datos.es_prueba as boolean) ?? (previo?.es_prueba as boolean) ?? prueba,
    }
  })
}

export { MAX_NOTAS }
