// lib/admin/proyectos.ts
// Espejo de las tarjetas de NEGOCIO del tablero «Sala de Situación».
//
// Regla dura: al panel del sitio NUNCA llegan proyectos personales ni temas
// legales/migratorios. El tablero ya marca lo personal con `grupo: "personal"`,
// pero aquí se vuelve a filtrar (defensa en profundidad: si build.py cambia o
// alguien manda el JSON a mano, el servidor igual descarta lo que no debe salir).

export const COL_PROYECTOS = 'admin_proyectos'
export const COL_PROYECTO_NOTAS = 'admin_proyecto_notas'

/** Palabras que jamás deben salir del computador de Orlando hacia el sitio. */
const VETADAS =
  /\bJEP\b|asilo|migratori|deportaci|embargo|juzgado|demanda|acreedor|USCIS|fiscal[ií]a|EOIR|I-589|expediente judicial/i

/** Campos que se copian de la tarjeta del tablero. Lo que no esté aquí, no viaja. */
const CAMPOS_TEXTO = ['nombre', 'cliente', 'estado', 'dinero', 'foco', 'proximo', 'mueve', 'notas', 'espera_de'] as const

export interface TarjetaEspejo {
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
}

export interface ResultadoFiltro {
  tarjetas: TarjetaEspejo[]
  omitidos: Array<{ n: unknown; motivo: string }>
}

const s = (v: unknown, max = 600) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Convierte el JSON del tablero en tarjetas listas para Firestore. */
export function filtrarTarjetas(entrada: unknown[]): ResultadoFiltro {
  const tarjetas: TarjetaEspejo[] = []
  const omitidos: Array<{ n: unknown; motivo: string }> = []

  for (const crudo of entrada) {
    const p = (crudo || {}) as Record<string, unknown>
    const n = typeof p.n === 'number' ? p.n : Number(p.n)

    if (!Number.isFinite(n)) {
      omitidos.push({ n: p.n, motivo: 'sin número' })
      continue
    }
    if (s(p.grupo) && s(p.grupo) !== 'negocio') {
      omitidos.push({ n, motivo: 'no es de negocio' })
      continue
    }

    const textoPlano = CAMPOS_TEXTO.map((c) => s(p[c], 4000)).join(' ') + ' ' + s((p.ultima as any)?.texto, 4000)
    if (VETADAS.test(textoPlano)) {
      omitidos.push({ n, motivo: 'contiene un tema que no sale del computador' })
      continue
    }

    const fases = Array.isArray(p.fases) ? p.fases.map((f) => s(f, 200)) : []
    const actual = typeof p.actual === 'number' && p.actual >= 0 && p.actual < fases.length ? p.actual : 0
    const ultima = (p.ultima || {}) as Record<string, unknown>

    tarjetas.push({
      n,
      nombre: s(p.nombre, 200),
      cliente: s(p.cliente, 400),
      estado: s(p.estado, 40),
      dinero: s(p.dinero, 300),
      foco: s(p.foco, 300),
      fases,
      actual,
      fase_actual: fases[actual] || '',
      ultima: { fecha: s(ultima.fecha, 40), iso: s(ultima.iso, 40), texto: s(ultima.texto, 2000) },
      proximo: s(p.proximo, 1000),
      mueve: s(p.mueve, 200),
      espera_desde: s(p.espera_desde, 40),
      espera_de: s(p.espera_de, 400),
      cifras: Array.isArray(p.cifras)
        ? p.cifras.slice(0, 20).map((c) => ({ k: s((c as any)?.k, 200), v: s((c as any)?.v, 600) }))
        : [],
      hitos: Array.isArray(p.hitos)
        ? p.hitos.slice(0, 40).map((h) => ({
            fecha: s((h as any)?.fecha, 40),
            iso: s((h as any)?.iso, 40),
            que: s((h as any)?.que, 600),
          }))
        : [],
      notas: s(p.notas, 2000),
    })
  }

  return { tarjetas, omitidos }
}
