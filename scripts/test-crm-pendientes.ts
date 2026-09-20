// scripts/test-crm-pendientes.ts
// Pruebas del vigilante de conversaciones cortadas (no tocan Firestore).
// Correr:  node --experimental-strip-types scripts/test-crm-pendientes.ts

import assert from 'node:assert/strict'
import {
  MINUTOS_GRACIA,
  MAX_AVISOS,
  esperaEnTexto,
  estadoTrasAlerta,
  necesitaAlerta,
  type ContactoConAlerta,
} from '../lib/crm/pendientes.ts'

const AHORA = new Date('2026-09-19T22:00:00.000Z')
const haceMin = (m: number) => new Date(AHORA.getTime() - m * 60000).toISOString()

function contacto(extra: Partial<ContactoConAlerta> = {}): ContactoConAlerta {
  return {
    id: 'tel_1', nombre: 'Ana', telefono: 'whatsapp:+1718', correo: '', telefono_norm: '1718',
    correo_norm: '', claves: [], origen: 'whatsapp', origenes: ['whatsapp'], etapa: 'nuevo',
    temperatura: 'caliente', interes: '', tema: '', primer_contacto: haceMin(600),
    ultimo_contacto: haceMin(120), ultimo_mensaje: 'hola', ultimo_mensaje_de: 'contacto',
    ultima_gestion: '', proximo_paso: '', proximo_paso_fecha: '', notas: [], historial_etapas: [],
    n_mensajes: 3, es_prueba: false, creado: haceMin(600), actualizado: haceMin(120),
    ...extra,
  } as ContactoConAlerta
}

let ok = 0
function prueba(nombre: string, fn: () => void) {
  fn(); ok++; console.log('  ok  ' + nombre)
}

prueba('avisa cuando la persona escribió y nadie contestó', () => {
  assert.equal(necesitaAlerta(contacto(), AHORA), true)
})

prueba('NO avisa antes del tiempo de gracia', () => {
  assert.equal(necesitaAlerta(contacto({ ultimo_contacto: haceMin(MINUTOS_GRACIA - 5) }), AHORA), false)
})

prueba('NO avisa si el último en hablar fue Impulsa', () => {
  assert.equal(necesitaAlerta(contacto({ ultimo_mensaje_de: 'impulsa' }), AHORA), false)
})

prueba('NO avisa si ya se gestionó después del mensaje', () => {
  assert.equal(necesitaAlerta(contacto({ ultima_gestion: haceMin(60) }), AHORA), false)
})

prueba('NO avisa a clientes, perdidos ni pruebas', () => {
  assert.equal(necesitaAlerta(contacto({ etapa: 'cliente' }), AHORA), false)
  assert.equal(necesitaAlerta(contacto({ etapa: 'perdido' }), AHORA), false)
  assert.equal(necesitaAlerta(contacto({ es_prueba: true }), AHORA), false)
})

prueba('no repite el aviso antes de 24 h', () => {
  const c = contacto({ alerta_de: haceMin(120), ultimo_contacto: haceMin(120), ultima_alerta: haceMin(90), alertas_enviadas: 1 })
  assert.equal(necesitaAlerta(c, AHORA), false)
})

prueba('insiste pasadas 24 h', () => {
  const c = contacto({ alerta_de: haceMin(3000), ultimo_contacto: haceMin(3000), ultima_alerta: haceMin(1500), alertas_enviadas: 1 })
  assert.equal(necesitaAlerta(c, AHORA), true)
})

prueba('deja de insistir en el tope', () => {
  const c = contacto({ alerta_de: haceMin(5000), ultimo_contacto: haceMin(5000), ultima_alerta: haceMin(1500), alertas_enviadas: MAX_AVISOS })
  assert.equal(necesitaAlerta(c, AHORA), false)
})

prueba('un mensaje NUEVO reinicia el contador y vuelve a avisar', () => {
  const c = contacto({ alerta_de: haceMin(5000), ultimo_contacto: haceMin(100), ultima_alerta: haceMin(90), alertas_enviadas: MAX_AVISOS })
  assert.equal(necesitaAlerta(c, AHORA), true)
  assert.equal(estadoTrasAlerta(c, AHORA).alertas_enviadas, 1)
})

prueba('el contador sube cuando es el mismo mensaje', () => {
  const c = contacto({ alerta_de: haceMin(120), ultimo_contacto: haceMin(120), alertas_enviadas: 1 })
  assert.equal(estadoTrasAlerta(c, AHORA).alertas_enviadas, 2)
})

prueba('la espera se cuenta en palabras', () => {
  assert.equal(esperaEnTexto({ ultimo_contacto: haceMin(50) }, AHORA), '50 minutos')
  assert.equal(esperaEnTexto({ ultimo_contacto: haceMin(60) }, AHORA), '1 hora')
  assert.equal(esperaEnTexto({ ultimo_contacto: haceMin(300) }, AHORA), '5 horas')
  assert.equal(esperaEnTexto({ ultimo_contacto: haceMin(60 * 72) }, AHORA), '3 días')
})

console.log('\n' + ok + ' pruebas OK')
