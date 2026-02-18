'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function VerifyEmailPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const tp = t.verifyEmailPage

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setIsVerified(firebaseUser.emailVerified)
        
        // Si ya está verificado, redirigir
        if (firebaseUser.emailVerified) {
          setTimeout(() => {
            router.push('/diagnostico')
          }, 2000)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    // Verificar cada 3 segundos si el email fue verificado
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload()
        if (auth.currentUser.emailVerified) {
          setIsVerified(true)
          clearInterval(interval)
        }
      }
    }, 3000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [router])

  const handleResendEmail = async () => {
    if (!user || sending) return
    
    setSending(true)
    try {
      await sendEmailVerification(user)
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 5000)
    } catch (error) {
      console.error('Error enviando email:', error)
      alert(tp.errorEnviarEmail)
    } finally {
      setSending(false)
    }
  }

  const handleCheckVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload()
      if (auth.currentUser.emailVerified) {
        setIsVerified(true)
        setTimeout(() => {
          router.push('/diagnostico')
        }, 1000)
      } else {
        alert(tp.emailNoVerificado)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {tp.emailVerificado}
          </h1>
          <p className="text-gray-600 mb-6">
            {tp.cuentaVerificada}
          </p>
          <div className="animate-pulse text-blue-600">
            {tp.entrandoCuenta}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {tp.verificaTuEmail}
          </h1>
          
          <p className="text-gray-600 mb-2">
            {tp.hemosEnviadoEmail}
          </p>
          
          <p className="font-semibold text-gray-900 mb-6">
            {user?.email}
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-amber-800">
                  {tp.revisaBandeja}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  {tp.revisaSpam}
                </p>
              </div>
            </div>
          </div>

          {emailSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                {tp.emailReenviado}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              {tp.yaVerifique}
            </button>
            
            <button
              onClick={handleResendEmail}
              disabled={sending}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {sending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                  {tp.enviando}
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  {tp.reenviarEmail}
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                auth.signOut()
                router.push('/login')
              }}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              {tp.usarOtroEmail}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
