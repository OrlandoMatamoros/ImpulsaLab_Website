/**
 * Fechas del taller en español y en hora de Nueva York, sin depender del idioma
 * instalado en el servidor: se piden los números a Intl en inglés (siempre presente)
 * y los nombres se ponen desde estas tablas.
 */

const ZONA = 'America/New_York'

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const DIAS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface PartesNY {
  anio: number
  /** 1-12 */
  mes: number
  dia: number
  /** 0 = domingo */
  diaSemana: number
  /** 0-23 */
  hora: number
  minuto: number
}

const formateador = new Intl.DateTimeFormat('en-US', {
  timeZone: ZONA,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23',
})

export function partesNY(fecha: Date | string): PartesNY {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha
  const p: Record<string, string> = {}
  for (const parte of formateador.formatToParts(d)) p[parte.type] = parte.value
  return {
    anio: Number(p.year),
    mes: Number(p.month),
    dia: Number(p.day),
    diaSemana: DIAS_EN.indexOf(p.weekday),
    hora: Number(p.hour) % 24,
    minuto: Number(p.minute),
  }
}

/** «viernes 20 de noviembre» (con año si se pide). */
export function fechaLarga(fecha: Date | string, conAnio = false): string {
  const p = partesNY(fecha)
  const base = `${DIAS[p.diaSemana]} ${p.dia} de ${MESES[p.mes - 1]}`
  return conAnio ? `${base} de ${p.anio}` : base
}

/** «20 de noviembre» */
export function fechaCorta(fecha: Date | string): string {
  const p = partesNY(fecha)
  return `${p.dia} de ${MESES[p.mes - 1]}`
}

/** «3:00 p. m.» */
export function hora(fecha: Date | string): string {
  const p = partesNY(fecha)
  const h12 = p.hora % 12 === 0 ? 12 : p.hora % 12
  const sufijo = p.hora < 12 ? 'a. m.' : 'p. m.'
  return `${h12}:${String(p.minuto).padStart(2, '0')} ${sufijo}`
}

/** El último minuto en que vale algo que «corta» en `corte` (corte - 1 min). */
export function ultimoMinuto(corte: string): Date {
  return new Date(new Date(corte).getTime() - 60_000)
}
