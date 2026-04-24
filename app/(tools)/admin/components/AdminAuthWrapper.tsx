'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Shield, LogOut, UserCog, MessageSquare } from 'lucide-react'

interface AdminAuthWrapperProps {
  children: React.ReactNode
  title?: string
}

export default function AdminAuthWrapper({ children, title = "Dashboard de Interacciones - Chatbot" }: AdminAuthWrapperProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, userData, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // Si no hay usuario, redirigir al login
      if (!user) {
        router.push('/login')
        setLoading(false)
        return
      }

      // Esperar un momento para que userData se cargue
      if (!userData) {
        setTimeout(() => {
          checkAuth()
        }, 500)
        return
      }

      // IMPORTANTE: Permitir acceso a admin Y consultant
      if (userData.role === 'admin' || userData.role === 'consultant') {
        setIsAuthorized(true)
      } else {
        // Si es usuario normal, redirigir a su dashboard
        router.push('/dashboard')
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [user, userData, router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Mostrar loading inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // Si no está autorizado (no debería verse porque redirige)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Acceso Denegado</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                No tienes permisos para acceder a esta sección.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/dashboard')} 
              className="w-full mt-4"
            >
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Determinar el ícono según el rol
  const getRoleIcon = () => {
    if (userData?.role === 'admin') return <Shield className="h-5 w-5" />
    if (userData?.role === 'consultant') return <UserCog className="h-5 w-5" />
    return <MessageSquare className="h-5 w-5" />
  }

  // Determinar el título del rol
  const getRoleTitle = () => {
    if (userData?.role === 'admin') return 'Administrador'
    if (userData?.role === 'consultant') return 'Consultor'
    return 'Usuario'
  }

  // Mostrar contenido si está autorizado
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {getRoleIcon()}
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-xs text-gray-500">{getRoleTitle()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {userData?.name || userData?.email || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}