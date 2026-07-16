'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User as FirebaseUser,
  onIdTokenChanged
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { signUpUser, signInUser, signOutUser, signInWithGoogleUser } from '@/lib/auth-helper'
import { useRouter } from 'next/navigation'

// Definir roles
export enum UserRole {
  VISITOR = 'visitor',
  REGISTERED = 'registered',
  CLIENT = 'client',
  CONSULTANT = 'consultant',
  ADMIN = 'admin'
}

interface UserData {
  uid: string
  email: string
  name?: string
  phone?: string
  role: UserRole | string
  consultantCode?: string
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  createdAt: any
  emailVerified?: boolean
  phoneVerified?: boolean
}

interface AuthContextType {
  user: FirebaseUser | null
  userData: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, consultantCode?: string, additionalData?: any) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // onIdTokenChanged se dispara en login, logout Y cada refresh del ID token
    // (Firebase lo rota ~cada hora). Así la cookie se mantiene con un token
    // vigente y firmado, en vez de expirar a la hora.
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      console.log('Auth/token changed:', firebaseUser?.email)
      setUser(firebaseUser)
      
      if (firebaseUser) {
        // 1) Emitir/renovar la cookie de sesión HttpOnly desde el SERVIDOR
        // (POST /api/session con el ID token). El navegador ya no la escribe con
        // document.cookie: así la cookie lleva HttpOnly y el JS de la página
        // (un XSS/infostealer) no puede leerla. El middleware verifica su firma.
        // Se hace siempre que hay sesión, independiente del doc de Firestore.
        try {
          const token = await firebaseUser.getIdToken()
          await fetch('/api/session', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          })
        } catch (e) {
          console.error('No se pudo establecer la cookie de sesión:', e)
        }

        // 2) Cargar datos del usuario (rol, perfil) para el estado del cliente.
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              ...data
            } as UserData)
          } else {
            console.log('No user document found')
          }
        } catch (error) {
          console.error('Error getting user data:', error)
        }
      } else {
        setUserData(null)
        // Logout: borrar la cookie HttpOnly server-side (JS no puede borrarla).
        try {
          await fetch('/api/session', { method: 'DELETE' })
        } catch (e) {
          console.error('No se pudo cerrar la sesión server-side:', e)
        }
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email)
      const result = await signInUser(email, password)
      
      if (result.success && result.userData) {
        console.log('Login successful, role:', result.userData.role)
        
        // Redirigir según el rol
        switch(result.userData.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'consultant':
            router.push('/consultant')
            break
          case 'client':
            router.push('/dashboard')
            break
          default:
            router.push('/diagnostico')
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(
        error.code === 'auth/user-not-found' ? 'Usuario no encontrado' :
        error.code === 'auth/wrong-password' ? 'Contraseña incorrecta' :
        error.code === 'auth/invalid-email' ? 'Email inválido' :
        'Error al iniciar sesión'
      )
    }
  }

  const signUp = async (
    email: string, 
    password: string, 
    consultantCode?: string,
    additionalData?: { name?: string; phone?: string }
  ) => {
    try {
      console.log('Starting signup process for:', email)
      
      const result = await signUpUser({
        email,
        password,
        name: additionalData?.name,
        phone: additionalData?.phone,
        consultantCode
      })
      
      if (result.success) {
        console.log('Signup successful, role:', result.role)
        
        // Redirigir según el rol
        if (result.role === 'consultant') {
          router.push('/consultant')
        } else {
          router.push('/diagnostico')
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(
        error.code === 'auth/email-already-in-use' ? 'Este email ya está registrado' :
        error.code === 'auth/weak-password' ? 'La contraseña debe tener al menos 6 caracteres' :
        error.code === 'auth/invalid-email' ? 'Email inválido' :
        error.message || 'Error al crear la cuenta'
      )
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithGoogleUser()
      if (!result.success) return

      if (result.userData) {
        const role = result.userData.role || 'registered'
        switch (role) {
          case 'admin':
            router.push('/admin')
            break
          case 'consultant':
            router.push('/consultant')
            break
          case 'client':
            router.push('/dashboard')
            break
          default:
            router.push('/diagnostico')
        }
      }
    } catch (error: any) {
      // auth-helper already logged the raw error — just map to a user-facing message
      const code = error?.code || 'unknown'
      const msg =
        code === 'auth/popup-blocked' ? 'El popup fue bloqueado por tu navegador. Permite ventanas emergentes e intenta de nuevo.' :
        code === 'auth/operation-not-allowed' ? 'Google sign-in no está habilitado. Contacta al administrador.' :
        code === 'auth/unauthorized-domain' ? 'Este dominio no está autorizado para Firebase Auth.' :
        code === 'auth/network-request-failed' ? 'Error de red. Verifica tu conexión e intenta de nuevo.' :
        code === 'auth/cancelled-popup-request' ? '' :
        `No pudimos iniciarte con Google (${code})`
      if (msg) throw new Error(msg)
    }
  }

  const signOut = async () => {
    try {
      await signOutUser()
      // Borrar la cookie HttpOnly server-side (JS no puede borrarla). El
      // listener onIdTokenChanged(null) también la borra; este await garantiza
      // que quede eliminada antes de navegar.
      try { await fetch('/api/session', { method: 'DELETE' }) } catch {}
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
