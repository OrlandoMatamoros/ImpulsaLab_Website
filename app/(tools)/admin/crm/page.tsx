'use client'

// /admin/crm — una fila por persona que escribió a Impulsa (WhatsApp, formulario
// del sitio, diagnóstico o herramientas). Los datos los escriben los flujos de
// n8n contra /api/crm/ingest; aquí solo se leen y se gestionan.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AvisoError, CajaNota, PantallaAdmin, fechaCorta, fechaHora, useApiAdmin } from '../components/PanelBase'
import {
  DIAS_ALERTA_SIN_RESPUESTA,
  ETAPAS,
  ETAPA_LABEL,
  ORIGEN_LABEL,
  TEMPERATURA_LABEL,
  diasSinRespuesta,
  enlaceWhatsApp,
  telefonoLegible,
  type ContactoCRM,
  type Etapa,
  type MensajeCRM,
} from '@/lib/crm/tipos'

const ETAPA_CLASE: Record<Etapa, string> = {
  nuevo: 'bg-[#00BCD4]/15 text-[#7ae7f5] border-[#00BCD4]/35',
  contactado: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  propuesta: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  cliente: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  perdido: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
}

const TEMP_CLASE: Record<string, string> = {
  caliente: 'text-red-300',
  tibio: 'text-amber-300',
  frio: 'text-slate-400',
}

type Filtro = 'todos' | Etapa | 'sin_respuesta'

export default function CrmPage() {
  const llamar = useApiAdmin()
  const [contactos, setContactos] = useState<ContactoCRM[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [verPruebas, setVerPruebas] = useState(false)
  const [abierto, setAbierto] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const datos = await llamar<{ contactos: ContactoCRM[] }>(
        '/api/admin/crm/contactos' + (verPruebas ? '?pruebas=1' : ''),
      )
      setContactos(datos.contactos || [])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setCargando(false)
    }
  }, [llamar, verPruebas])

  useEffect(() => {
    cargar()
  }, [cargar])

  const visibles = useMemo(() => {
    if (filtro === 'todos') return contactos
    if (filtro === 'sin_respuesta') {
      return contactos.filter((c) => {
        const d = diasSinRespuesta(c)
        return d !== null && d > DIAS_ALERTA_SIN_RESPUESTA
      })
    }
    return contactos.filter((c) => c.etapa === filtro)
  }, [contactos, filtro])

  const conteos = useMemo(() => {
    const base: Record<string, number> = { todos: contactos.length, sin_respuesta: 0 }
    ETAPAS.forEach((e) => (base[e] = 0))
    contactos.forEach((c) => {
      base[c.etapa] = (base[c.etapa] || 0) + 1
      const d = diasSinRespuesta(c)
      if (d !== null && d > DIAS_ALERTA_SIN_RESPUESTA) base.sin_respuesta++
    })
    return base
  }, [contactos])

  const contactoAbierto = contactos.find((c) => c.id === abierto) || null

  function actualizarEnLista(contacto: ContactoCRM) {
    setContactos((prev) => prev.map((c) => (c.id === contacto.id ? { ...c, ...contacto } : c)))
  }

  const filtros: Array<{ valor: Filtro; texto: string }> = [
    { valor: 'todos', texto: 'Todos' },
    ...ETAPAS.map((e) => ({ valor: e as Filtro, texto: ETAPA_LABEL[e] })),
    { valor: 'sin_respuesta', texto: 'Sin respuesta' },
  ]

  return (
    <PantallaAdmin
      titulo="CRM de contactos"
      bajada="Una fila por persona. El chatbot de WhatsApp, el formulario del sitio y el diagnóstico escriben aquí solos."
      acciones={
        <>
          <button
            onClick={() => setVerPruebas((v) => !v)}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {verPruebas ? 'Ocultar pruebas' : 'Ver pruebas'}
          </button>
          <button
            onClick={cargar}
            className="px-4 py-2 rounded-xl text-sm font-semibold btn-metalico-navy cursor-pointer"
          >
            Actualizar
          </button>
        </>
      }
    >
      {error && <AvisoError error={error} onReintentar={cargar} />}

      <div className="flex flex-wrap gap-2 mb-5">
        {filtros.map((f) => {
          const activo = filtro === f.valor
          const alerta = f.valor === 'sin_respuesta'
          return (
            <button
              key={f.valor}
              onClick={() => setFiltro(f.valor)}
              className={
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ' +
                (activo
                  ? 'bg-[#00BCD4] text-slate-950 border-[#00BCD4]'
                  : alerta && conteos.sin_respuesta > 0
                    ? 'bg-red-500/10 text-red-300 border-red-500/40 hover:bg-red-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800')
              }
            >
              {f.texto}
              <span className={activo ? 'ml-1.5 opacity-70' : 'ml-1.5 text-slate-500'}>
                {conteos[f.valor as string] ?? 0}
              </span>
            </button>
          )
        })}
      </div>

      {cargando && <p className="text-slate-400 text-sm">Cargando contactos…</p>}

      {!cargando && visibles.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-slate-300 font-medium mb-1">Nada por aquí</p>
          <p className="text-slate-500 text-sm">
            {filtro === 'todos'
              ? 'Todavía no hay contactos cargados.'
              : 'Ningún contacto en este filtro.'}
          </p>
        </div>
      )}

      {visibles.length > 0 && (
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {/* Encabezado solo en pantalla grande */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 bg-slate-900 text-xs uppercase tracking-wide text-slate-500">
            <div className="col-span-4">Contacto</div>
            <div className="col-span-2">Origen</div>
            <div className="col-span-2">Etapa</div>
            <div className="col-span-2">Último mensaje</div>
            <div className="col-span-2">Próximo paso</div>
          </div>

          <ul className="divide-y divide-slate-800">
            {visibles.map((c) => {
              const dias = diasSinRespuesta(c)
              const alerta = dias !== null && dias > DIAS_ALERTA_SIN_RESPUESTA
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setAbierto(c.id)}
                    className={
                      'w-full text-left px-4 py-3 grid md:grid-cols-12 gap-x-3 gap-y-1 items-center transition-colors cursor-pointer ' +
                      (alerta ? 'bg-red-950/25 hover:bg-red-950/40' : 'bg-slate-900/40 hover:bg-slate-800/60')
                    }
                  >
                    <div className="md:col-span-4">
                      <p className="font-medium text-white flex items-center gap-2">
                        {c.nombre || 'Sin nombre'}
                        {c.es_prueba && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            prueba
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        {telefonoLegible(c.telefono) || c.correo || '—'}
                        {c.temperatura && (
                          <span className={'ml-2 ' + (TEMP_CLASE[c.temperatura] || '')}>
                            ● {TEMPERATURA_LABEL[c.temperatura as keyof typeof TEMPERATURA_LABEL]}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="md:col-span-2 text-xs text-slate-400">
                      {ORIGEN_LABEL[c.origen as keyof typeof ORIGEN_LABEL] || c.origen}
                    </div>

                    <div className="md:col-span-2">
                      <span
                        className={
                          'inline-block text-xs px-2.5 py-1 rounded-full border ' +
                          (ETAPA_CLASE[c.etapa] || '')
                        }
                      >
                        {ETAPA_LABEL[c.etapa] || c.etapa}
                      </span>
                    </div>

                    <div className="md:col-span-2 text-xs">
                      <span className={alerta ? 'text-red-300 font-medium' : 'text-slate-400'}>
                        {fechaCorta(c.ultimo_contacto)}
                      </span>
                      {alerta && (
                        <span className="block text-red-300">sin respuesta hace {dias} días</span>
                      )}
                    </div>

                    <div className="md:col-span-2 text-xs text-slate-400 truncate">
                      {c.proximo_paso || '—'}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {contactoAbierto && (
        <DetalleContacto
          contacto={contactoAbierto}
          onCerrar={() => setAbierto(null)}
          onCambio={actualizarEnLista}
          onBorrado={(id) => {
            setContactos((prev) => prev.filter((c) => c.id !== id))
            setAbierto(null)
          }}
        />
      )}
    </PantallaAdmin>
  )
}

/** Escribirle a la persona por WhatsApp desde el número de Orlando, con el mensaje
 *  ya redactado, y copiar el número para pegarlo donde haga falta. El número del
 *  bot (929 500 7815) vive en Twilio y NO se puede usar desde la app de WhatsApp. */
function AccionesContacto({ contacto }: { contacto: ContactoCRM }) {
  const [copiado, setCopiado] = useState(false)
  const numero = telefonoLegible(contacto.telefono)
  const enlace = enlaceWhatsApp(contacto)
  if (!numero) return null

  async function copiar() {
    try {
      await navigator.clipboard.writeText(numero)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {enlace && (
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-metalico-cyan text-sm px-4 py-2"
        >
          Escribir por WhatsApp
        </a>
      )}
      <button
        type="button"
        onClick={copiar}
        className="text-xs px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 cursor-pointer"
      >
        {copiado ? 'Número copiado' : 'Copiar número'}
      </button>
    </div>
  )
}

function DetalleContacto({
  contacto,
  onCerrar,
  onCambio,
  onBorrado,
}: {
  contacto: ContactoCRM
  onCerrar: () => void
  onCambio: (c: ContactoCRM) => void
  onBorrado: (id: string) => void
}) {
  const llamar = useApiAdmin()
  const [mensajes, setMensajes] = useState<MensajeCRM[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [paso, setPaso] = useState(contacto.proximo_paso || '')
  const [tema, setTema] = useState(contacto.tema || '')
  const [pasoFecha, setPasoFecha] = useState(contacto.proximo_paso_fecha || '')
  const [confirmarBorrado, setConfirmarBorrado] = useState(false)

  useEffect(() => {
    let vivo = true
    setCargando(true)
    llamar<{ contacto: ContactoCRM; mensajes: MensajeCRM[] }>(
      '/api/admin/crm/contactos/' + encodeURIComponent(contacto.id),
    )
      .then((d) => {
        if (!vivo) return
        setMensajes(d.mensajes || [])
        onCambio(d.contacto)
      })
      .catch((e) => vivo && setError((e as Error).message))
      .finally(() => vivo && setCargando(false))
    return () => {
      vivo = false
    }
    // Solo al abrir otro contacto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacto.id])

  async function parchear(cambios: Record<string, unknown>) {
    setGuardando(true)
    setError('')
    try {
      const d = await llamar<{ contacto: ContactoCRM }>(
        '/api/admin/crm/contactos/' + encodeURIComponent(contacto.id),
        { method: 'PATCH', body: JSON.stringify(cambios) },
      )
      onCambio(d.contacto)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setGuardando(false)
    }
  }

  async function agregarNota(texto: string) {
    const d = await llamar<{ contacto: ContactoCRM }>(
      '/api/admin/crm/contactos/' + encodeURIComponent(contacto.id) + '/notas',
      { method: 'POST', body: JSON.stringify({ texto }) },
    )
    onCambio(d.contacto)
  }

  async function borrar() {
    await llamar('/api/admin/crm/contactos/' + encodeURIComponent(contacto.id), { method: 'DELETE' })
    onBorrado(contacto.id)
  }

  const dias = diasSinRespuesta(contacto)

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onCerrar}>
      <div
        className="w-full sm:max-w-xl h-full overflow-y-auto bg-slate-950 border-l border-slate-800 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{contacto.nombre || 'Sin nombre'}</h2>
            <p className="text-sm text-slate-400">
              {telefonoLegible(contacto.telefono) || '—'}
              {contacto.correo && <span className="block">{contacto.correo}</span>}
            </p>
            <AccionesContacto contacto={contacto} />
          </div>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-white text-sm cursor-pointer"
          >
            Cerrar ✕
          </button>
        </div>

        {error && <AvisoError error={error} />}

        {dias !== null && dias > DIAS_ALERTA_SIN_RESPUESTA && (
          <p className="rounded-xl border border-red-500/40 bg-red-950/30 text-red-200 text-sm px-3 py-2 mb-4">
            Escribió hace {dias} días y nadie le ha respondido.
          </p>
        )}

        <section className="mb-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Etapa</p>
          <div className="flex flex-wrap gap-2">
            {ETAPAS.map((e) => (
              <button
                key={e}
                disabled={guardando}
                onClick={() => parchear({ etapa: e })}
                className={
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer disabled:opacity-50 ' +
                  (contacto.etapa === e
                    ? 'bg-[#00BCD4] text-slate-950 border-[#00BCD4]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800')
                }
              >
                {ETAPA_LABEL[e]}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Origen</p>
            <p className="text-slate-200">
              {ORIGEN_LABEL[contacto.origen as keyof typeof ORIGEN_LABEL] || contacto.origen}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Temperatura</p>
            <p className={TEMP_CLASE[contacto.temperatura] || 'text-slate-300'}>
              {contacto.temperatura
                ? TEMPERATURA_LABEL[contacto.temperatura as keyof typeof TEMPERATURA_LABEL]
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Primer contacto</p>
            <p className="text-slate-200">{fechaCorta(contacto.primer_contacto)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Último contacto</p>
            <p className="text-slate-200">{fechaCorta(contacto.ultimo_contacto)}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Qué le interesa</p>
            <p className="text-slate-200">{contacto.interes || '—'}</p>
          </div>
        </section>

        <section className="mb-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Tema del mensaje de WhatsApp
          </p>
          <p className="text-xs text-slate-500 mb-2">
            Corto y hablándole a la persona. Va dentro de «escribiste a nuestro asistente de
            WhatsApp sobre…». Déjalo vacío y el mensaje sale sin tema.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ej: implementar IA en tu empresa y capacitar a tu equipo"
              className="flex-1 min-w-[220px] rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
            />
            <button
              disabled={guardando}
              onClick={() => parchear({ tema })}
              className="px-4 py-2 rounded-xl text-sm font-semibold btn-metalico-cyan cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </section>

        <section className="mb-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Próximo paso</p>
          <input
            value={paso}
            onChange={(e) => setPaso(e.target.value)}
            placeholder="Ej: Orlando escribe"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
          />
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <input
              type="date"
              value={pasoFecha}
              onChange={(e) => setPasoFecha(e.target.value)}
              className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
            />
            <button
              disabled={guardando}
              onClick={() => parchear({ proximo_paso: paso, proximo_paso_fecha: pasoFecha })}
              className="px-4 py-2 rounded-xl text-sm font-semibold btn-metalico-cyan cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </section>

        <section className="mb-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Notas</p>
          {(contacto.notas || []).length === 0 && (
            <p className="text-sm text-slate-500">Sin notas todavía.</p>
          )}
          <ul className="space-y-2">
            {(contacto.notas || []).map((n, i) => (
              <li key={i} className="rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2">
                <p className="text-sm text-slate-200 whitespace-pre-wrap">{n.texto}</p>
                <p className="text-xs text-slate-600 mt-1">{fechaCorta(n.fecha)}</p>
              </li>
            ))}
          </ul>
          <CajaNota onGuardar={agregarNota} placeholder="Ej: le escribí por WhatsApp, quedó de responder." />
        </section>

        <section className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
            Conversación ({mensajes.length})
          </p>
          {cargando && <p className="text-sm text-slate-500">Cargando mensajes…</p>}
          <ul className="space-y-2">
            {mensajes.map((m) => (
              <li
                key={m.id}
                className={
                  'rounded-xl px-3 py-2 text-sm border ' +
                  (m.direccion === 'entrante'
                    ? 'bg-slate-900/70 border-slate-800 text-slate-200'
                    : 'bg-[#002D62]/40 border-[#00BCD4]/20 text-slate-300 ml-4')
                }
              >
                <p className="whitespace-pre-wrap">{m.texto}</p>
                <p className="text-xs text-slate-600 mt-1">
                  {m.direccion === 'entrante' ? 'Contacto' : m.autor === 'bot' ? 'Bot' : 'Impulsa'} ·{' '}
                  {fechaHora(m.fecha)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-slate-800 pt-4">
          {!confirmarBorrado ? (
            <button
              onClick={() => setConfirmarBorrado(true)}
              className="text-xs text-slate-500 hover:text-red-300 transition-colors cursor-pointer"
            >
              Borrar este contacto
            </button>
          ) : (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-300">
                ¿Borrar a {contacto.nombre || 'este contacto'} y su conversación?
              </span>
              <button
                onClick={borrar}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-medium cursor-pointer"
              >
                Sí, borrar
              </button>
              <button
                onClick={() => setConfirmarBorrado(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 cursor-pointer"
              >
                No
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
