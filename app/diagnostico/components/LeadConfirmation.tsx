'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail, User, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface LeadConfirmationProps {
  clientInfo: any
  scores: {
    finance: number
    operations: number
    marketing: number
  }
  responses: any[]
  onConfirm: () => void
  onSubmitSuccess?: (submitted: boolean) => void
}

export function LeadConfirmation({
  clientInfo,
  scores,
  responses,
  onConfirm,
  onSubmitSuccess
}: LeadConfirmationProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const tp = t.leadConfirmation
  const [formData, setFormData] = useState({
    nombre: clientInfo?.contactName || '',
    email: clientInfo?.email || '',
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = tp.errorNombre
    }

    if (!formData.email.trim()) {
      newErrors.email = tp.errorEmail
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = tp.errorEmailInvalido
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar datos al API para procesamiento y envío de correos
      const response = await fetch('/api/diagnostic/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData: {
            fecha: new Date().toISOString().split('T')[0],
            nombre: formData.nombre,
            email: formData.email,
            telefono: clientInfo?.phone || tp.noProporcionado,
            empresa: clientInfo?.companyName || tp.noProporcionado,
            industria: clientInfo?.industry || tp.noEspecificada,
            empleados: clientInfo?.employeeCount || 0,
            facturacion_anual: clientInfo?.annualRevenue || null,
            score_finanzas: Math.round(scores.finance),
            score_operaciones: Math.round(scores.operations),
            score_marketing: Math.round(scores.marketing),
            score_promedio: Math.round((scores.finance + scores.operations + scores.marketing) / 3),
            origen: clientInfo?.userType || 'Registrado'
          },
          clientInfo,
          scores,
          responses
        }),
      })

      if (response.ok) {
        // Marcar como enviado exitosamente
        setIsSubmitted(true)
        setIsSubmitting(false)

        // Notificar al wizard que se envió exitosamente para desbloquear botón "Siguiente"
        if (onSubmitSuccess) {
          onSubmitSuccess(true)
        }

        // Redirigir a página de gracias después de 1.5 segundos para que vean el mensaje de éxito
        setTimeout(() => {
          router.push('/gracias')
        }, 1500)
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || tp.errorSubmit })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      setErrors({ submit: tp.errorConexion })
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
    }
  }

  // Si ya se envió exitosamente, mostrar mensaje de confirmación
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
          <CardContent className="pt-6 pb-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-100 rounded-full p-4 animate-pulse">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  ✅ {tp.successTitle}
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {tp.successMsg} <strong>{formData.email}</strong>
                </p>
                <div className="bg-white border border-green-200 rounded-lg p-4 mb-6 inline-block">
                  <p className="text-sm text-gray-600 mb-2">📧 {tp.checkInbox}</p>
                  <p className="text-xs text-gray-500">{tp.checkSpam}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-gray-700 font-semibold mb-2">
                  🚀 {tp.redirecting}
                </p>
                <p className="text-sm text-gray-600">
                  {tp.redirectDesc}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header con mensaje de éxito */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {tp.completedTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {tp.completedDesc}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de confirmación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            {tp.formTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                {tp.labelNombre}
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderNombre}
                disabled={isSubmitting}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 inline mr-2" />
                {tp.labelEmail}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderEmail}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Error de envío */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>📧 {tp.infoTitle}</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                {tp.infoItems.map((item: string, i: number) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#002D62] hover:bg-[#001d42] text-white font-semibold py-4 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {tp.btnSubmitting}
                </>
              ) : (
                <>
                  {tp.btnSubmit}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Nota de privacidad */}
      <p className="text-xs text-gray-500 text-center">
        {tp.privacyText}
        <br />
        {tp.privacyLink} <a href="/legal/datos" className="underline text-blue-600">{tp.privacyLinkText}</a>
      </p>
    </div>
  )
}
