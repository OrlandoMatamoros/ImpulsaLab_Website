'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Shield, AlertCircle, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function VerificationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Obtener datos de la URL
  const email = searchParams.get('email') || ''
  const phone = searchParams.get('phone') || ''
  const name = searchParams.get('name') || ''
  const password = searchParams.get('p') || ''
  const consultantCode = searchParams.get('code') || ''
  
  const [emailCode, setEmailCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  
  const emailRefs = useRef<(HTMLInputElement | null)[]>([])
  
  useEffect(() => {
    // Enviar códigos al cargar
    if (email && typeof window !== 'undefined' && !sessionStorage.getItem('codes_sent')) {
      sendVerificationCodes()
      sessionStorage.setItem('codes_sent', 'true')
    }
    
    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('codes_sent')
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [email])
  
  const sendVerificationCodes = async () => {
    try {
      const response = await fetch('/api/verification/send-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, name })
      })
      
      const data = await response.json()
      
      if (data.debugCodes) {
        console.log('📧 CÓDIGO DE VERIFICACIÓN:', data.debugCodes.emailCode)
      }
    } catch (err) {
      console.error('Error enviando códigos:', err)
    }
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleCodeInput = (value: string, index: number) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('')
      const newCodes = [...emailCode]
      pastedCode.forEach((digit, i) => {
        if (i < 6) newCodes[i] = digit
      })
      setEmailCode(newCodes)
      emailRefs.current[5]?.focus()
    } else {
      const newCodes = [...emailCode]
      newCodes[index] = value
      setEmailCode(newCodes)
      
      if (value && index < 5) {
        emailRefs.current[index + 1]?.focus()
      }
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !emailCode[index] && index > 0) {
      emailRefs.current[index - 1]?.focus()
    }
  }
  
  const handleResend = async () => {
    setResending(true)
    setError('')
    
    try {
      const response = await fetch('/api/verification/send-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, name })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTimeLeft(600)
        setEmailCode(['', '', '', '', '', ''])
        
        if (data.debugCodes) {
          console.log('📧 NUEVO CÓDIGO:', data.debugCodes.emailCode)
        }
      } else {
        setError(data.error || 'Error enviando código')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setResending(false)
    }
  }
  
  const handleVerify = async () => {
    const emailCodeStr = emailCode.join('')
    
    if (emailCodeStr.length !== 6) {
      setError('Por favor ingresa el código completo')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const verifyResponse = await fetch('/api/verification/verify-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          emailCode: emailCodeStr,
          smsCode: emailCodeStr
        })
      })
      
      const verifyData = await verifyResponse.json()
      
      if (!verifyData.success) {
        setError(verifyData.error || 'Código incorrecto')
        setLoading(false)
        return
      }
      
      setSuccess(true)
      
      const decodedPassword = atob(password)
      
      const signupResponse = await fetch('/api/auth/create-verified-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: decodedPassword,
          name,
          phone,
          consultantCode,
          emailVerified: true,
          phoneVerified: true
        })
      })
      
      const signupData = await signupResponse.json()
      
      if (signupData.success) {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('codes_sent')
        }
        
        setTimeout(() => {
          if (signupData.role === 'consultant') {
            router.push('/consultant')
          } else if (signupData.role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/diagnostico')
          }
        }, 2000)
      } else {
        setError(signupData.error || 'Error creando cuenta')
        setSuccess(false)
      }
      
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }
  
  // Función para asignar refs correctamente
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    emailRefs.current[index] = el
  }
  
  if (timeLeft === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Código Expirado
          </h1>
          <p className="text-gray-600 mb-6">
            El código de verificación ha expirado. Por favor, inicia el proceso nuevamente.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al Registro
          </Link>
        </div>
      </div>
    )
  }
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Verificación Exitosa!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada y verificada exitosamente.
          </p>
          <div className="animate-pulse text-blue-600">
            Redirigiendo a tu dashboard...
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifica tu Email
          </h1>
          
          <p className="text-gray-600 mb-2">
            Hemos enviado un código de verificación a:
          </p>
          
          <p className="font-semibold text-gray-900">
            {email}
          </p>
          
          <div className="mt-4 text-sm">
            <span className="text-gray-500">Tiempo restante: </span>
            <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Mail className="h-5 w-5 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">
              Ingresa el código de 6 dígitos
            </label>
          </div>
          <div className="flex gap-2 justify-center">
            {emailCode.map((digit, index) => (
              <input
                key={`email-${index}`}
                ref={setInputRef(index)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeInput(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                inputMode="numeric"
                pattern="[0-9]"
              />
            ))}
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-xs text-amber-700">
            💡 <strong>Tip:</strong> Revisa tu carpeta de spam si no ves el email. 
            El código llegará desde <strong>onboarding@resend.dev</strong> por ahora.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verificando...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                Verificar Código
              </>
            )}
          </button>
          
          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            {resending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                Reenviando...
              </>
            ) : (
              <>
                <RefreshCw className="h-5 w-5 mr-2" />
                Reenviar Código
              </>
            )}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/signup"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Usar otro email
          </Link>
        </div>
      </div>
    </div>
  )
}
