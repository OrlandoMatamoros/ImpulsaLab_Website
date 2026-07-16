// lib/firebase-token-verify.ts
// Verificación de ID tokens de Firebase compatible con el runtime Edge (middleware).
//
// El SDK de firebase-admin NO corre en Edge (usa APIs de Node/gRPC). Por eso el
// middleware verifica el JWT con `jose` contra las claves públicas de Google:
// firma RS256 + issuer + audience + expiración. Un token que no supere esta
// verificación (falsificado, expirado, o de otro proyecto) se rechaza.
//
// Reemplaza el stub previo `getUserRoleFromToken` que devolvía 'registered' sin
// verificar nada — lo que permitía que CUALQUIER valor de cookie pasara el gate.

import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose'

// JWKS público de Firebase Secure Token Service (formato JWK estándar).
// `createRemoteJWKSet` cachea las claves y las refresca según los headers HTTP.
const FIREBASE_JWKS = createRemoteJWKSet(
  new URL(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
  ),
)

export interface FirebaseTokenClaims {
  uid: string
  email: string | null
  // Rol opcional vía custom claims (si el proyecto los emite). NUNCA se toma de
  // la cookie: solo de este payload ya verificado criptográficamente.
  role: string | null
}

/**
 * Verifica un ID token de Firebase. Devuelve los claims si es auténtico y
 * vigente, o `null` si la firma no valida, expiró, o no corresponde a este
 * proyecto. Seguro para usar en el middleware Edge.
 */
export async function verifyFirebaseIdToken(
  token: string | undefined | null,
): Promise<FirebaseTokenClaims | null> {
  if (!token) return null

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  if (!projectId) {
    // Sin projectId no se puede validar audience/issuer → fail-closed.
    console.error('[auth] NEXT_PUBLIC_FIREBASE_PROJECT_ID no configurado')
    return null
  }

  try {
    const { payload } = await jwtVerify(token, FIREBASE_JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
      // jose ya valida `exp`/`nbf`; exigimos RS256 (algoritmo de Firebase).
      algorithms: ['RS256'],
    })

    const claims = payload as JWTPayload & { email?: string; role?: string }
    const uid = typeof claims.sub === 'string' ? claims.sub : ''
    if (!uid) return null

    return {
      uid,
      email: typeof claims.email === 'string' ? claims.email : null,
      role: typeof claims.role === 'string' ? claims.role : null,
    }
  } catch (error) {
    // Firma inválida, token expirado, issuer/audience incorrecto, etc.
    console.warn('[auth] verificación de ID token falló:', (error as Error)?.message)
    return null
  }
}
