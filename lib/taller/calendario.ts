import { TALLER } from './config'

const URL_LANDING = 'https://goimpulsalab.com/masterclass'

/** 20261120T200000Z */
function utcCompacta(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function lugarCompleto(): string {
  return `${TALLER.lugar.direccion}, ${TALLER.lugar.ciudad}`
}

const DETALLE =
  `${TALLER.evento.nombreLargo}. Presencial y en español: casos reales de negocios resueltos en vivo, ` +
  `con espacio para preguntas en cada uno y media hora final de preguntas. Trae tu celular cargado y tus preguntas. ` +
  `Más información: ${URL_LANDING}`

/** Enlace «Agregar a Google Calendar». */
export function enlaceGoogleCalendar(): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: TALLER.evento.nombre,
    dates: `${utcCompacta(TALLER.inicio)}/${utcCompacta(TALLER.fin)}`,
    details: DETALLE,
    location: lugarCompleto(),
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

/** Escapa texto para un campo de iCalendar (RFC 5545 §3.3.11). */
function escaparIcs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

const bytes = (s: string) => new TextEncoder().encode(s).length

/** Corta líneas a 75 octetos como pide RFC 5545 §3.1 (las tildes ocupan 2 octetos). */
function plegar(linea: string): string {
  const partes: string[] = []
  let actual = ''
  for (const caracter of linea) {
    // La línea de continuación empieza con un espacio, que también cuenta.
    const limite = partes.length === 0 ? 75 : 74
    if (bytes(actual + caracter) > limite) {
      partes.push(actual)
      actual = ''
    }
    actual += caracter
  }
  partes.push(actual)
  return partes.join('\r\n ')
}

/** Archivo .ics para Apple Calendar, Outlook y cualquier calendario. */
export function archivoIcs(ahora: Date = new Date()): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Impulsa Lab//Taller IA//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${TALLER.id}@goimpulsalab.com`,
    `DTSTAMP:${utcCompacta(ahora.toISOString())}`,
    `DTSTART:${utcCompacta(TALLER.inicio)}`,
    `DTEND:${utcCompacta(TALLER.fin)}`,
    `SUMMARY:${escaparIcs(TALLER.evento.nombre)}`,
    `LOCATION:${escaparIcs(lugarCompleto())}`,
    `DESCRIPTION:${escaparIcs(DETALLE)}`,
    `URL:${URL_LANDING}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escaparIcs('Mañana: ' + TALLER.evento.nombre)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lineas.map(plegar).join('\r\n') + '\r\n'
}
