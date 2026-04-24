'use client'

// Client Component wrapper so we can use dynamic() with ssr: false.
// app/layout.tsx is a Server Component and cannot use ssr: false directly.
// Splitting into this wrapper keeps Firebase SDK out of the SSR payload
// and defers its ~127 KB parse until after client hydration.

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const FirebaseAuthProviderDynamic = dynamic(
  () => import('@/contexts/FirebaseAuthContext').then((m) => m.FirebaseAuthProvider),
  { ssr: false }
)

const AuthTokenProviderDynamic = dynamic(
  () => import('@/components/AuthTokenProvider').then((m) => m.AuthTokenProvider),
  { ssr: false }
)

export function FirebaseProviders({ children }: { children: ReactNode }) {
  return (
    <FirebaseAuthProviderDynamic>
      <AuthTokenProviderDynamic>{children}</AuthTokenProviderDynamic>
    </FirebaseAuthProviderDynamic>
  )
}
