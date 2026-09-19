// scripts/test-crm-normalizar.ts
// Pruebas de las funciones deterministas del CRM (no necesitan Firestore).
// Correr:  node --experimental-strip-types scripts/test-crm-normalizar.ts

import assert from 'node:assert/strict'
import {
  normalizarTelefono,
  normalizarCorreo,
  clavesDeContacto,
  idDeContacto,
  esPrueba,
  normalizarOrigen,
  idDeMensaje,
  normalizarTemperatura,
  fechaISO,
} from '../lib/crm/normalizar.ts'
import { diasSinRespuesta, sinRespuesta, telefonoLegible, mensajeWhatsApp, enlaceWhatsApp } from '../lib/crm/tipos.ts'

let ok = 0
function prueba(nombre: string, fn: () => void) {
  fn()
  ok++
  console.log('  ok  ' + nombre)
}

prueba('teléfono de WhatsApp queda en dígitos', () => {
  assert.equal(normalizarTelefono('whatsapp:+573126507341'), '573126507341')
  assert.equal(normalizarTelefono('whatsapp: 19294138823'), '19294138823')
  assert.equal(normalizarTelefono('+1 (929) 368-6749'), '19293686749')
})

prueba('lo que no es teléfono se descarta', () => {
  assert.equal(normalizarTelefono('No proporcionado'), '')
  assert.equal(normalizarTelefono(''), '')
  assert.equal(normalizarTelefono('123'), '')
  assert.equal(normalizarTelefono(null), '')
})

prueba('correo normalizado y correo sintético descartado', () => {
  assert.equal(normalizarCorreo('  Ooorale41@Gmail.com '), 'ooorale41@gmail.com')
  assert.equal(normalizarCorreo('whatsapp+15559876543@impulsalab.local'), '')
  assert.equal(normalizarCorreo('no-es-correo'), '')
})

prueba('claves e id deterministas', () => {
  assert.deepEqual(clavesDeContacto('573126507341', 'a@b.com'), ['tel:573126507341', 'mail:a@b.com'])
  assert.equal(idDeContacto('573126507341', 'a@b.com'), 'tel_573126507341')
  assert.equal(idDeContacto('', 'a@b.com'), 'mail_a_b_com')
  assert.equal(idDeContacto('', ''), '')
})

prueba('detecta pruebas y NO marca a los reales', () => {
  assert.equal(esPrueba({ telefonoNorm: '19293686749' }), true)
  assert.equal(esPrueba({ telefonoNorm: '19294138823', nombre: 'Orlando Test' }), true)
  assert.equal(esPrueba({ correoCrudo: 'smoke-cs-fresh@test.com' }), true)
  assert.equal(esPrueba({ correoCrudo: 'test-migracion-3@empresa-real.com' }), true)
  assert.equal(esPrueba({ correoCrudo: 'whatsapp+15559876543@impulsalab.local' }), true)
  assert.equal(esPrueba({ nombre: 'Test CS HOT' }), true)
  assert.equal(esPrueba({ telefonoNorm: '5215533031499', nombre: 'Olga Gpe. Olmedo B.' }), false)
  assert.equal(esPrueba({ correoNorm: 'ooorale41@gmail.com', nombre: 'Yerai vera' }), false)
})

prueba('orígenes de n8n traducidos', () => {
  assert.equal(normalizarOrigen('contactsection'), 'formulario')
  assert.equal(normalizarOrigen('leads_capture'), 'herramienta')
  assert.equal(normalizarOrigen('WhatsApp'), 'whatsapp')
  assert.equal(normalizarOrigen('loquesea'), 'otro')
})

prueba('id de mensaje: mismo evento → mismo id, distinto → distinto', () => {
  const a = idDeMensaje({ origen: 'whatsapp', clave: 'tel:1', eventoId: 'SM123' })
  const b = idDeMensaje({ origen: 'whatsapp', clave: 'tel:1', eventoId: 'SM123' })
  const c = idDeMensaje({ origen: 'whatsapp', clave: 'tel:1', eventoId: 'SM124' })
  assert.equal(a, b)
  assert.notEqual(a, c)
  const sinEvento1 = idDeMensaje({ origen: 'whatsapp', clave: 'tel:1', fechaISO: '2026-09-19T10:00:05Z', texto: 'hola' })
  const sinEvento2 = idDeMensaje({ origen: 'whatsapp', clave: 'tel:1', fechaISO: '2026-09-19T10:00:44Z', texto: 'hola' })
  assert.equal(sinEvento1, sinEvento2) // mismo minuto + mismo texto = mismo evento
})

prueba('temperatura del Lead Router', () => {
  assert.equal(normalizarTemperatura('HOT'), 'caliente')
  assert.equal(normalizarTemperatura('warm'), 'tibio')
  assert.equal(normalizarTemperatura('COLD'), 'frio')
  assert.equal(normalizarTemperatura(''), '')
})

prueba('fechaISO tolera basura', () => {
  assert.equal(fechaISO('2026-08-25T14:36:53.905-04:00'), '2026-08-25T18:36:53.905Z')
  const pordefecto = new Date('2026-09-19T00:00:00Z')
  assert.equal(fechaISO('qué fecha', pordefecto), '2026-09-19T00:00:00.000Z')
})

prueba('sin respuesta: solo cuenta si el contacto habló último', () => {
  const ahora = new Date('2026-09-19T12:00:00Z')
  const base = {
    etapa: 'nuevo' as const,
    ultimo_contacto: '2026-09-03T23:03:28.301Z',
    ultima_gestion: '',
    ultimo_mensaje_de: 'contacto' as const,
  }
  assert.equal(diasSinRespuesta(base, ahora), 15)
  assert.equal(sinRespuesta(base, ahora), true)
  // Si Orlando gestionó después, deja de alertar.
  assert.equal(sinRespuesta({ ...base, ultima_gestion: '2026-09-18T10:00:00Z' }, ahora), false)
  // Etapas cerradas no alertan.
  assert.equal(sinRespuesta({ ...base, etapa: 'cliente' }, ahora), false)
  assert.equal(sinRespuesta({ ...base, etapa: 'perdido' }, ahora), false)
  // Menos de 3 días no alerta.
  assert.equal(sinRespuesta({ ...base, ultimo_contacto: '2026-09-18T10:00:00Z' }, ahora), false)
})


prueba('el telefono se muestra sin el prefijo de Twilio', () => {
  assert.equal(telefonoLegible('whatsapp:+5215533031499'), '+5215533031499')
  assert.equal(telefonoLegible('+1 (929) 500-7815'), '+19295007815')
  assert.equal(telefonoLegible(''), '')
})

prueba('el mensaje de WhatsApp saluda por el nombre y nombra el interes', () => {
  const m = mensajeWhatsApp({ nombre: 'Olga Gpe. Olmedo B.', tema: 'implementar IA en tu empresa y capacitar a tu equipo' })
  assert.ok(m.startsWith('Hola Olga,'))
  assert.ok(m.includes('sobre implementar IA en tu empresa y capacitar a tu equipo y la conversación'))
  // La nota interna (tercera persona) NUNCA debe entrar al mensaje.
  assert.ok(!m.includes('su empresa'))
  assert.ok(!m.includes('Recibió'))
  const sinTema = mensajeWhatsApp({ nombre: '', tema: '' })
  assert.ok(sinTema.startsWith('Hola, soy Orlando'))
  assert.ok(!sinTema.includes('undefined') && !sinTema.includes('sobre '))
})

prueba('el enlace de WhatsApp lleva digitos y el texto codificado', () => {
  const e = enlaceWhatsApp({ nombre: 'Ken', tema: 'una alianza', telefono: 'whatsapp:+817076391334', telefono_norm: '817076391334' })
  assert.ok(e.startsWith('https://wa.me/817076391334?text=Hola%20Ken'))
  assert.equal(enlaceWhatsApp({ nombre: 'X', tema: '', telefono: '', telefono_norm: '' }), '')
})

console.log('\n' + ok + ' pruebas OK')
