// lib/admin/facturacion.ts
//
// El estado de facturación de cada proyecto, que empuja la app de invoicing.
//
// Vive en su PROPIA colección, igual que las notas del panel: el espejo del
// tablero (`admin_proyectos`) se sobrescribe entero en cada sync y borra lo que
// no venga en el payload, así que nada de esto puede guardarse ahí.
//
// El flujo es en un solo sentido —invoicing → sitio— a propósito. Cada app
// mantiene su base y su sesión: si el sitio está caído se sigue facturando, y
// si el invoicing está caído el panel muestra lo último que supo, fechado.

export const COL_PROYECTO_FACTURACION = 'admin_proyecto_facturacion'

export interface ResumenFacturacion {
  /** Número de proyecto en el tablero. Es la clave del documento. */
  n: number
  /** Nombre del cliente en el invoicing, para poder cotejar a simple vista. */
  cliente: string
  estimados: { enviados: number; aceptados: number; monto_aceptado: number }
  /** Suma de las facturas emitidas al cliente (sin archivadas). */
  facturado: number
  /** Lo que realmente entró. */
  cobrado: number
  /** Emitido y aún en plazo. */
  por_cobrar: number
  /** Emitido y ya vencido. */
  vencido: number
  ultima_factura: {
    numero: number
    fecha: string
    estado: string
    total: number
  } | null
  /**
   * Horas de Orlando imputadas al proyecto y lo que cuestan. Es el costo
   * directo del trabajo: sin esto el margen que se ve es falso, porque todos
   * los proyectos aparentan 100%.
   */
  mano_de_obra: { horas: number; costo: number }
  margen: number
  margen_porcentaje: number | null
  /** Cuándo lo calculó el invoicing. Si se queda viejo, algo dejó de empujar. */
  actualizado: string
}

const num = (v: unknown): number => {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0
}

const texto = (v: unknown, max = 120): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/**
 * Normaliza lo que llega por la red. Nada se guarda sin pasar por aquí: el
 * emisor es de confianza (trae el secreto), pero un error suyo no tiene por qué
 * ensuciar Firestore.
 */
export function normalizarResumen(crudo: unknown): ResumenFacturacion | null {
  const r = (crudo || {}) as Record<string, unknown>
  const n = typeof r.n === 'number' ? r.n : Number(r.n)
  if (!Number.isInteger(n) || n < 0 || n > 999) return null

  const e = (r.estimados || {}) as Record<string, unknown>
  const u = r.ultima_factura as Record<string, unknown> | null | undefined

  return {
    n,
    cliente: texto(r.cliente),
    estimados: {
      enviados: Math.max(0, Math.trunc(num(e.enviados))),
      aceptados: Math.max(0, Math.trunc(num(e.aceptados))),
      monto_aceptado: num(e.monto_aceptado),
    },
    facturado: num(r.facturado),
    cobrado: num(r.cobrado),
    por_cobrar: num(r.por_cobrar),
    vencido: num(r.vencido),
    ultima_factura:
      u && Number.isFinite(Number(u.numero))
        ? {
            numero: Math.trunc(Number(u.numero)),
            fecha: texto(u.fecha, 30),
            estado: texto(u.estado, 30),
            total: num(u.total),
          }
        : null,
    mano_de_obra: {
      horas: num((r.mano_de_obra as Record<string, unknown> | undefined)?.horas),
      costo: num((r.mano_de_obra as Record<string, unknown> | undefined)?.costo),
    },
    margen: num(r.margen),
    margen_porcentaje:
      typeof r.margen_porcentaje === 'number' && Number.isFinite(r.margen_porcentaje)
        ? Math.round(r.margen_porcentaje * 1000) / 1000
        : null,
    actualizado: texto(r.actualizado, 40) || new Date().toISOString(),
  }
}
