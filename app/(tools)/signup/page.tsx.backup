'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Info, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    consultantCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const isConsultant = searchParams.get('consultor') === 'true'
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre es requerido')
      return
    }

    if (!formData.phone.trim()) {
      setError('El teléfono es requerido')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    if (isConsultant && !formData.consultantCode) {
      setError('Debes ingresar un código de consultor válido')
      return
    }

    setLoading(true)

    try {
      await signUp(
        formData.email, 
        formData.password, 
        formData.consultantCode || undefined
      )
      setSuccess(true)
      
      // Redirigir a la página principal después de 2 segundos
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error: any) {
      console.error('Error en registro:', error)
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado')
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido')
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es muy débil')
      } else if (error.message?.includes('Código de consultor')) {
        setError(error.message)
      } else {
        setError('Error al crear la cuenta. Por favor intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">¡Registro exitoso!</AlertTitle>
              <AlertDescription className="text-green-700">
                Tu cuenta ha sido creada exitosamente. Redirigiendo...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isConsultant ? 'Registro de Consultor' : 'Crear Cuenta'}
          </CardTitle>
          <CardDescription className="text-center">
            {isConsultant 
              ? 'Ingresa tu código de consultor para acceso completo'
              : 'Regístrate para acceder a todas las herramientas'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            {isConsultant && (
              <div className="space-y-2">
                <Label htmlFor="consultantCode">Código de Consultor</Label>
                <Input
                  id="consultantCode"
                  name="consultantCode"
                  type="text"
                  placeholder="Ingresa tu código"
                  value={formData.consultantCode}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#002D62] to-blue-600 hover:from-[#001d42] hover:to-blue-700" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </Button>
            
            <div className="text-sm text-center space-y-2">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-[#002D62] hover:text-blue-700"
                >
                  Inicia sesión
                </Link>
              </p>
              {!isConsultant && (
                <p className="text-gray-500">
                  ¿Eres consultor?{' '}
                  <Link 
                    href="/signup?consultor=true" 
                    className="font-medium text-[#002D62] hover:text-blue-700"
                  >
                    Registrarse con código
                  </Link>
                </p>
              )}
              {isConsultant && (
                <p className="text-gray-500">
                  ¿No eres consultor?{' '}
                  <Link 
                    href="/signup" 
                    className="font-medium text-[#002D62] hover:text-blue-700"
                  >
                    Registro público
                  </Link>
                </p>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}