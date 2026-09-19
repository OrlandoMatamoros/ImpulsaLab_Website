'use client'

// /admin/proyectos — espejo de las tarjetas de NEGOCIO del tablero «Sala de
// Situación» (lo escribe build.py vía /api/admin/proyectos/sync) + las notas de
// seguimiento que Orlando escribe aquí, que el espejo nunca pisa.

import { useCallback, useEffect, useState } from 'react'
import { AvisoError, CajaNota, PantallaAdmin, fechaCorta, useApiAdmin } from '../components/PanelBase'

interface NotaPanel {
  id: string
  texto: string
  fecha: string
}

interface Proyecto {
  n: number
  nombre: string
  cliente: string
  estado: string
  dinero: string
  foco: string
  fases: string[]
  actual: number
  fase_actual: string
  ultima: { fecha: string; iso: string; texto: string }
  proximo: string
  mueve: string
  espera_desde: string
  espera_de: string
  cifras: Array<{ k: string; v: string }>
  hitos: Array<{ fecha: string; iso: string; que: string }>
  notas: string
  sincronizado?: string
  notas_panel: NotaPanel[]
}

const ESTADO_INFO: Record<string, { label: string; clase: string }> = {
  curso: { label: 'En curso', clase: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  tuyo: { label: 'Te toca a ti', clase: 'bg-[#00BCD4]/15 text-[#7ae7f5] border-[#00BCD4]/35' },
  espera: { label: 'Esperando a otros', clase: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  bloqueado: { label: 'Bloqueado', clase: 'bg-red-500/15 text-red-300 border-red-500/30' },
  pausa: { label: 'En pausa', clase: 'bg-slate-500/15 text-slate-300 border-slate-500/30' },
}

function diasDesde(iso?: string): number | null {
  if (!iso) return null
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return null
  return Math.floor((Date.now() - t) / 86400000)
}

export default function ProyectosPage() {
  const llamar = useApiAdmin()
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [abierto, setAbierto] = useState<number | null>(null)

  const cargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const datos = await llamar<{ proyectos: Proyecto[] }>('/api/admin/proyectos')
      setProyectos(datos.proyectos || [])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setCargando(false)
    }
  }, [llamar])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function agregarNota(n: number, texto: string) {
    await llamar('/api/admin/proyectos/' + n + '/notas', {
      method: 'POST',
      body: JSON.stringify({ texto }),
    })
    await cargar()
  }

  async function borrarNota(n: number, notaId: string) {
    await llamar('/api/admin/proyectos/' + n + '/notas?nota=' + encodeURIComponent(notaId), {
      method: 'DELETE',
    })
    await cargar()
  }

  return (
    <PantallaAdmin
      titulo="Proyectos"
      bajada="Los proyectos de negocio del tablero «Sala de Situación». Se actualizan solos cada vez que se reconstruye el tablero."
      acciones={
        <button
          onClick={cargar}
          className="px-4 py-2 rounded-xl text-sm font-semibold btn-metalico-navy cursor-pointer"
        >
          Actualizar
        </button>
      }
    >
      {error && <AvisoError error={error} onReintentar={cargar} />}

      {cargando && <p className="text-slate-400 text-sm">Cargando proyectos…</p>}

      {!cargando && !error && proyectos.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-slate-300 font-medium mb-1">Todavía no hay proyectos aquí</p>
          <p className="text-slate-500 text-sm">
            Aparecen solos la próxima vez que se reconstruya el tablero «Sala de Situación».
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {proyectos.map((p) => {
          const estado = ESTADO_INFO[p.estado] || { label: p.estado, clase: 'bg-slate-500/15 text-slate-300 border-slate-500/30' }
          const dias = diasDesde(p.espera_desde)
          const estaAbierto = abierto === p.n
          return (
            <article
              key={p.n}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-semibold text-white leading-tight">
                  <span className="text-slate-500 mr-2">#{p.n}</span>
                  {p.nombre}
                </h2>
                <span className={'shrink-0 text-xs px-2.5 py-1 rounded-full border ' + estado.clase}>
                  {estado.label}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3">{p.cliente}</p>

              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Fase</dt>
                  <dd className="text-slate-200">
                    {p.fase_actual || '—'}{' '}
                    {p.fases?.length > 0 && (
                      <span className="text-slate-500">
                        ({p.actual + 1} de {p.fases.length})
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Próximo paso</dt>
                  <dd className="text-slate-200">{p.proximo || '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Quién mueve</dt>
                  <dd className="text-slate-200">{p.mueve || '—'}</dd>
                </div>
                {p.espera_de && (
                  <div>
                    <dt className="text-slate-500 text-xs uppercase tracking-wide">Esperando</dt>
                    <dd className="text-amber-300">
                      {p.espera_de}
                      {dias !== null && <span className="text-slate-500"> · {dias} días</span>}
                    </dd>
                  </div>
                )}
              </dl>

              <button
                onClick={() => setAbierto(estaAbierto ? null : p.n)}
                className="mt-4 text-xs text-[#00BCD4] hover:text-white transition-colors self-start cursor-pointer"
              >
                {estaAbierto ? '▲ Ocultar detalle' : '▼ Ver detalle y mis notas'}
              </button>

              {estaAbierto && (
                <div className="mt-4 border-t border-slate-800 pt-4 space-y-4">
                  {p.ultima?.texto && (
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                        Última actuación · {p.ultima.fecha}
                      </p>
                      <p className="text-sm text-slate-300">{p.ultima.texto}</p>
                    </div>
                  )}

                  {p.cifras?.length > 0 && (
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Cifras</p>
                      <ul className="space-y-1 text-sm">
                        {p.cifras.map((c, i) => (
                          <li key={i} className="text-slate-300">
                            <span className="text-slate-500">{c.k}: </span>
                            {c.v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.hitos?.length > 0 && (
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Línea de tiempo</p>
                      <ul className="space-y-1 text-sm">
                        {p.hitos.map((h, i) => (
                          <li key={i} className="text-slate-300">
                            <span className="text-slate-500">{h.fecha} · </span>
                            {h.que}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Mis notas</p>
                    {p.notas_panel.length === 0 && (
                      <p className="text-sm text-slate-500">Sin notas todavía.</p>
                    )}
                    <ul className="space-y-2">
                      {p.notas_panel.map((nota) => (
                        <li
                          key={nota.id}
                          className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm flex items-start justify-between gap-3"
                        >
                          <div>
                            <p className="text-slate-300 whitespace-pre-wrap">{nota.texto}</p>
                            <p className="text-xs text-slate-600 mt-1">{fechaCorta(nota.fecha)}</p>
                          </div>
                          <button
                            onClick={() => borrarNota(p.n, nota.id)}
                            title="Borrar nota"
                            className="text-slate-600 hover:text-red-300 text-xs cursor-pointer"
                          >
                            Borrar
                          </button>
                        </li>
                      ))}
                    </ul>
                    <CajaNota
                      onGuardar={(texto) => agregarNota(p.n, texto)}
                      placeholder="Ej: hablé con el cliente, quedamos en enviarle la propuesta el lunes."
                    />
                  </div>

                  {p.sincronizado && (
                    <p className="text-xs text-slate-600">
                      Sincronizado del tablero el {fechaCorta(p.sincronizado)}
                    </p>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </PantallaAdmin>
  )
}
