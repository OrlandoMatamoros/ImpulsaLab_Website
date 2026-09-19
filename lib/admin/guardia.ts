// lib/admin/guardia.ts
// Dos porteros para las rutas nuevas del panel admin:
//
//  1. `exigirAdmin` — para lo que abre Orlando desde el navegador: exige un ID
//     token de Firebase válido Y que el correo esté en ADMIN_EMAILS.
//  2. `exigirSecreto` — para lo que llaman máquinas (n8n, build.py del tablero):
//     exige `Authorization: Bearer <secreto>` con comparación de tiempo constante.
//
// Ninguna de estas colecciones se abre al cliente en firestore.rules: todo pasa
// por aquí y por el Admin SDK.

import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { isAdminEmail } from '@/lib/admin-emails'

export interface AdminOk {
  ok: true
  email: string
  uid: string
}
export interface Rechazo {
  ok: false
  respuesta: NextResponse
}

/** Verifica el ID token del header Authorization y la allowlist de admins. */
export async function exigirAdmin(req: NextRequest): Promise<AdminOk | Rechazo> {
  const header = req.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) {
    return { ok: false, respuesta: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) }
  }
  const idToken = header.slice(7).trim()

  let decoded
  try {
    decoded = await adminAuth.verifyIdToken(idToken)
  } catch {
    return { ok: false, respuesta: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) }
  }

  if (!isAdminEmail(decoded.email)) {
    return {
      ok: false,
      respuesta: NextResponse.json({ error: 'Sin permisos suficientes' }, { status: 403 }),
    }
  }

  return { ok: true, email: decoded.email as string, uid: decoded.uid }
}

/** Compara dos secretos sin filtrar información por el tiempo de respuesta. */
function igualSeguro(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/**
 * Verifica `Authorization: Bearer <secreto>` contra una variable de entorno.
 * Si la variable no existe, se rechaza (fail-closed): nunca "pasa" por omisión.
 */
export function exigirSecreto(req: NextRequest, nombreEnv: string): { ok: true } | Rechazo {
  const esperado = process.env[nombreEnv]
  if (!esperado) {
    console.error('[admin] falta la variable de entorno ' + nombreEnv)
    return {
      ok: false,
      respuesta: NextResponse.json({ error: 'Endpoint no configurado' }, { status: 503 }),
    }
  }

  const header = req.headers.get('authorization') || ''
  const recibido = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!recibido || !igualSeguro(recibido, esperado)) {
    return { ok: false, respuesta: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) }
  }

  return { ok: true }
}
