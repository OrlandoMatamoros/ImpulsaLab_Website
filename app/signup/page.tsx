'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function SignupForm() {
  const router = useRouter()
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const isConsultant = searchParams.get('consultor') === 'true'
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    consultantCode: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Validación de contraseña
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })

  useEffect(() => {
    if (formData.password) {
      setPasswordChecks({
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /\d/.test(formData.password),
        special: /[!@#$%^&*]/.test(formData.password)
      })
    }
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError(t.signupPage.errorContrasenas)
      return
    }

    if (!Object.values(passwordChecks).every(check => check)) {
      setError(t.signupPage.errorRequisitos)
      return
    }

    if (isConsultant && !formData.consultantCode) {
      setError(t.signupPage.errorCodigoRequerido)
      return
    }
    
    setLoading(true)
    setError('')

    try {
      // Guardar datos temporalmente
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('signupData', JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          consultantCode: formData.consultantCode,
          isConsultant
        }))
      }
      
      // Redirigir a verificación
      const params = new URLSearchParams({
        email: formData.email,
        name: formData.name
      })
      
      if (isConsultant) {
        params.append('consultant', 'true')
        params.append('code', formData.consultantCode)
      }
      
      router.push(`/verification?${params.toString()}`)
      
    } catch (err) {
      setError(t.signupPage.errorProcesar)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isConsultant ? t.signupPage.registroConsultor : t.signupPage.crearCuenta}
          </h2>
          <p className="text-gray-600 mt-2">
            {isConsultant ? t.signupPage.accesoConsultores : t.signupPage.uneteImpulsa}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.signupPage.nombreCompleto}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.signupPage.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          {isConsultant && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.signupPage.codigoConsultor}
              </label>
              <input
                type="text"
                value={formData.consultantCode}
                onChange={(e) => setFormData({...formData, consultantCode: e.target.value.toUpperCase()})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 uppercase"
                placeholder="XXXXXX"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.signupPage.contrasena}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className={`flex items-center text-xs ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.length ? <Check size={14} /> : <X size={14} />}
                  <span className="ml-1">{t.signupPage.min8caracteres}</span>
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.uppercase ? <Check size={14} /> : <X size={14} />}
                  <span className="ml-1">{t.signupPage.unaMayuscula}</span>
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.lowercase ? <Check size={14} /> : <X size={14} />}
                  <span className="ml-1">{t.signupPage.unaMinuscula}</span>
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.number ? <Check size={14} /> : <X size={14} />}
                  <span className="ml-1">{t.signupPage.unNumero}</span>
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.special ? <Check size={14} /> : <X size={14} />}
                  <span className="ml-1">{t.signupPage.unEspecial}</span>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.signupPage.confirmarContrasena}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{t.signupPage.contrasenasNoCoinciden}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.signupPage.telefonoWhatsapp}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              placeholder="+1234567890"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !Object.values(passwordChecks).every(check => check) || formData.password !== formData.confirmPassword}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {loading ? t.signupPage.procesando : t.signupPage.continuarVerificacion}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          {!isConsultant && (
            <p className="text-gray-600 mb-2">
              {t.signupPage.eresConsultor}{' '}
              <Link href="/signup?consultor=true" className="text-purple-600 hover:text-purple-700 font-medium">
                {t.signupPage.registrarseConCodigo}
              </Link>
            </p>
          )}
          
          <p className="text-gray-600">
            {t.signupPage.yaTienesCuenta}{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              {t.signupPage.iniciarSesion}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}
