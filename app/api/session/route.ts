// app/api/session/route.ts
// Fase 2 del blindaje de auth: la cookie de sesión `auth-token` se emite
// SIEMPRE desde el servidor con el flag HttpOnly, para que el JavaScript del
// navegador (y por tanto un XSS o un infostealer que se ejecute en la página)
// NO pueda leerla ni robarla. Antes se seteaba con document.cookie → legible.
//
// - POST  { Authorization: Bearer <ID token de Firebase> }  → verifica el token
//   y setea la cookie HttpOnly. El cliente lo llama al iniciar sesión y cada vez
//   que Firebase rota el ID token (onIdTokenChanged, ~cada hora).
// - DELETE  → borra la cookie (logout). El cliente ya no puede borrar una cookie
//   HttpOnly desde JS, por eso el borrado también pasa por el servidor.
//
// El middleware sigue verificando esta misma cookie con jose (sin cambios): el
// servidor SÍ recibe la cookie HttpOnly en cada request; HttpOnly solo bloquea
// el acceso desde el JS del navegador.

import { NextRequest, NextResponse } from 'next/server'
import { verifyFirebaseIdToken } from '@/lib/firebase-jwt-verify'

const COOKIE_NAME = 'auth-token'
const MAX_AGE_SECONDS = 60 * 60 // 1h — coincide con la vida del ID token de Firebase

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // en dev (http) no rompe el set
    sameSite: 'strict' as const,
    path: '/',
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || ''
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''

  // Verificar el ID token ANTES de setear la cookie (no emitir cookies con
  // tokens basura). Reusa el mismo verificador jose del middleware.
  const claims = await verifyFirebaseIdToken(idToken)
  if (!claims) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, idToken, { ...cookieOptions(), maxAge: MAX_AGE_SECONDS })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  // Borrado explícito: maxAge 0 expira la cookie de inmediato.
  res.cookies.set(COOKIE_NAME, '', { ...cookieOptions(), maxAge: 0 })
  return res
}
