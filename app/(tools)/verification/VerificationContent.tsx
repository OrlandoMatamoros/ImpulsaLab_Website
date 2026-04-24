'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerificationContentInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [step, setStep] = useState<'input' | 'verify'>('input')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
      if (emailParam) {
        handleSendCode(emailParam)
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleSendCode = async (emailToSend?: string) => {
    const targetEmail = emailToSend || email
    if (!targetEmail) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verification/send-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: targetEmail,
          isConsultant: sessionStorage.getItem('isConsultant') === 'true'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error enviando código')
      }

      setStep('verify')
      setResendTimer(60)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setLoading(true)
    setError('')

    try {
      // Obtener datos del signup desde sessionStorage
      const signupData = sessionStorage.getItem('signupData')
      const userData = signupData ? JSON.parse(signupData) : {}
      
      const response = await fetch('/api/verification/verify-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          code: verificationCode
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error verificando código')
      }

      setSuccess(true)

      // Guardar datos para el siguiente paso
      sessionStorage.setItem('verifiedEmailData', JSON.stringify({
        email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone,
        consultantCode: userData.consultantCode
      }))

      // Redirigir a verificación de WhatsApp
      setTimeout(() => {
        router.push('/verification-whatsapp')
      }, 1500)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    await handleSendCode()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verificación de Email
          </h1>
          <p className="text-gray-600">
            {step === 'input' 
              ? 'Ingresa tu email para continuar'
              : 'Ingresa el código que te enviamos'}
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Email verificado! Continuando...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">❌ {error}</p>
          </div>
        )}

        {step === 'input' && !success && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>

            <button
              onClick={() => handleSendCode()}
              disabled={loading || !email}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </div>
        )}

        {step === 'verify' && !success && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de 6 dígitos
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg tracking-widest focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
                autoComplete="off"
              />
              <p className="text-sm text-gray-500 mt-2">
                Enviamos un código a: <strong>{email}</strong>
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>Importante:</strong> Revisa tu carpeta de SPAM
                </p>
              </div>
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verificando...' : 'Verificar Email'}
            </button>

            <button
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className="w-full text-purple-600 hover:text-purple-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {resendTimer > 0 
                ? `Reenviar en ${resendTimer}s`
                : '¿No recibiste el código? Reenviar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerificationContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-purple-600 text-lg">Cargando...</div>
      </div>
    }>
      <VerificationContentInner />
    </Suspense>
  )
}