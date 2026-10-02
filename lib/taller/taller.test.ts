/**
 * Pruebas del taller: correr con `npx tsx --test lib/taller/taller.test.ts`.
 * Fijan lo que no se puede equivocar: el precio en cada instante de corte, la hora de NY
 * a cada lado del cambio de horario, y que el enlace del vendedor no deje pasar basura.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TALLER } from './config'
import { estadoVenta, vendedorPorRef } from './precio'
import { fechaLarga, hora, partesNY, ultimoMinuto } from './fechas'
import { archivoIcs, enlaceGoogleCalendar } from './calendario'
import { AGENDA, CASOS } from './contenido'

const precioEn = (iso: string) => {
  const e = estadoVenta(new Date(iso))
  return e.abierta ? e.franja.precio : null
}

test('precio por franja, segundo a segundo en cada corte (hora de Nueva York)', () => {
  assert.equal(precioEn('2026-10-02T12:00:00-04:00'), 129)
  assert.equal(precioEn('2026-10-20T23:59:59-04:00'), 129)
  assert.equal(precioEn('2026-10-21T00:00:00-04:00'), 159)
  // Cruza el fin del horario de verano (1-nov): sigue en la segunda franja.
  assert.equal(precioEn('2026-11-01T12:00:00-05:00'), 159)
  assert.equal(precioEn('2026-11-05T23:59:59-05:00'), 159)
  assert.equal(precioEn('2026-11-06T00:00:00-05:00'), 169)
  assert.equal(precioEn('2026-11-20T14:59:59-05:00'), 169)
  assert.equal(precioEn('2026-11-20T15:00:00-05:00'), null) // empieza el taller: venta cerrada
})

test('las franjas suben de precio y sus cortes van en orden', () => {
  const f = TALLER.franjas
  for (let i = 1; i < f.length; i++) {
    assert.ok(f[i].precio > f[i - 1].precio, `${f[i].id} debe costar más que ${f[i - 1].id}`)
    assert.ok(new Date(f[i].corte) > new Date(f[i - 1].corte), `${f[i].id} debe cortar después`)
  }
  assert.equal(f[f.length - 1].corte, TALLER.inicio, 'la última franja corta cuando empieza el taller')
})

test('cada corte cae a medianoche de Nueva York (si no, el desfase está mal escrito)', () => {
  for (const f of TALLER.franjas.slice(0, -1)) {
    const p = partesNY(f.corte)
    assert.deepEqual([p.hora, p.minuto], [0, 0], `${f.id}: ${f.corte} no es medianoche en NY`)
  }
})

test('textos de fecha y hora en español', () => {
  assert.equal(fechaLarga(TALLER.inicio), 'viernes 20 de noviembre')
  assert.equal(fechaLarga(TALLER.inicio, true), 'viernes 20 de noviembre de 2026')
  assert.equal(hora(TALLER.inicio), '3:00 p. m.')
  assert.equal(hora(TALLER.fin), '7:00 p. m.')
  const fin1 = ultimoMinuto(TALLER.franjas[0].corte)
  assert.equal(fechaLarga(fin1), 'martes 20 de octubre')
  assert.equal(hora(fin1), '11:59 p. m.')
  assert.equal(fechaLarga(ultimoMinuto(TALLER.franjas[1].corte)), 'jueves 5 de noviembre')
  assert.equal(fechaLarga(TALLER.limiteDevolucion), 'viernes 13 de noviembre')
})

test('el evento dura 4 horas y la agenda las llena exactas', () => {
  const minutos = (new Date(TALLER.fin).getTime() - new Date(TALLER.inicio).getTime()) / 60_000
  assert.equal(minutos, 240)
  assert.equal(AGENDA.reduce((s, b) => s + b.min, 0), minutos, 'la agenda no suma la duración del evento')
  assert.equal(AGENDA[AGENDA.length - 1].tipo, 'preguntas', 'cierra con preguntas y respuestas')
  assert.ok(CASOS.length >= 4)
})

test('cupo: número entero positivo y aviso menor que el cupo', () => {
  assert.ok(Number.isInteger(TALLER.cupoMaximo) && TALLER.cupoMaximo > 0)
  assert.ok(TALLER.avisarQuedanDesde < TALLER.cupoMaximo)
})

test('enlace de vendedor: solo pasan los de la lista', () => {
  assert.equal(vendedorPorRef('yorkis')?.slug, 'yorkis')
  assert.equal(vendedorPorRef(' YORKIS ')?.slug, 'yorkis')
  assert.equal(vendedorPorRef('desconocido'), null)
  assert.equal(vendedorPorRef('yorkis<script>'), null)
  assert.equal(vendedorPorRef(''), null)
  assert.equal(vendedorPorRef(42), null)
  assert.equal(vendedorPorRef(undefined), null)
  for (const v of TALLER.vendedores) assert.match(v.slug, /^[a-z0-9]+$/, 'Stripe exige valores alfanuméricos')
})

test('calendario: horas en UTC correctas y líneas de máximo 75 octetos', () => {
  const ics = archivoIcs(new Date('2026-10-02T12:00:00Z'))
  assert.match(ics, /DTSTART:20261120T200000Z/) // 3:00 p. m. EST = 20:00 UTC
  assert.match(ics, /DTEND:20261121T000000Z/)
  for (const linea of ics.split('\r\n')) {
    assert.ok(new TextEncoder().encode(linea).length <= 75, `línea larga: ${linea}`)
  }
  assert.match(enlaceGoogleCalendar(), /dates=20261120T200000Z%2F20261121T000000Z/)
})
