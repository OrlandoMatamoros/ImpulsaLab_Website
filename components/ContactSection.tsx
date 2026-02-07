'use client'

import { useState, useEffect } from 'react'
import { LINKS } from '@/lib/constants'

// Tipos para mejor type safety
interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

// Función para verificar rate limiting
const checkRateLimit = (email: string): { allowed: boolean; timeLeft?: number } => {
  const rateLimitKey = `rateLimit_${email}`
  const lastSubmit = localStorage.getItem(rateLimitKey)
  
  if (lastSubmit) {
    const timePassed = Date.now() - parseInt(lastSubmit)
    const timeLimit = 60000 // 1 minuto entre envíos por email
    
    if (timePassed < timeLimit) {
      return { 
        allowed: false, 
        timeLeft: Math.ceil((timeLimit - timePassed) / 1000) // segundos restantes
      }
    }
  }
  
  return { allowed: true }
}

// Guardar timestamp del envío
const saveRateLimit = (email: string) => {
  localStorage.setItem(`rateLimit_${email}`, Date.now().toString())
}

export default function ContactSection() {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [rateLimitError, setRateLimitError] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  // Webhook URL - Considera moverlo a variable de entorno en producción
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_CONTACT || 
    'https://orlandom88.app.n8n.cloud/webhook/fa05d73f-28a6-4827-8353-5b3a5780ad11'

  // Timer para actualizar el contador de rate limit
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setRateLimitError('')
    }
  }, [timeLeft])

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validación de teléfono (ajusta según tu país)
  const validatePhone = (phone: string): boolean => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8
  }

  // Validación del formulario
  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email inválido'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido'
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Teléfono inválido'
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validar antes de enviar
    if (!validateForm()) {
      return
    }

    // Verificar rate limiting
    const rateCheck = checkRateLimit(formData.email)
    if (!rateCheck.allowed) {
      setRateLimitError(`Por favor espera ${rateCheck.timeLeft} segundos antes de enviar otro mensaje`)
      setTimeLeft(rateCheck.timeLeft || 0)
      return
    }

    setFormStatus('loading')
    setErrorMessage('')
    setRateLimitError('')

    // Preparar datos para enviar
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      timestamp: new Date().toISOString(),
      source: 'ImpulsaLab-Website',
      page: 'homepage',
      // Agregar UTM parameters si existen
      ...(typeof window !== 'undefined' && {
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
      })
    }

    try {
      // Enviar a n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        setFormStatus('success')
        saveRateLimit(formData.email) // Guardar rate limit después del éxito
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'general',
          message: ''
        })
        
        // Tracking de conversión (si tienes GA4/GTM)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            value: 1
          })
        }
        
        // Ocultar mensaje de éxito después de 7 segundos
        setTimeout(() => setFormStatus('idle'), 7000)
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error enviando formulario:', error)
      setFormStatus('error')
      setErrorMessage('Hubo un problema enviando tu mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.')
      
      // Reintentar una vez después de 2 segundos
      setTimeout(async () => {
        try {
          const retryResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          })
          
          if (retryResponse.ok) {
            setFormStatus('success')
            saveRateLimit(formData.email)
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: 'general',
              message: ''
            })
            setTimeout(() => setFormStatus('idle'), 7000)
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError)
        }
      }, 2000)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para Encontrar la 'Coordenada' de tu Negocio?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El primer paso es nuestro Diagnóstico 3D gratuito. Agenda una videollamada 
            de 30 minutos sin ningún tipo de compromiso. Nuestros planes son flexibles 
            y se adaptan a la realidad de cada negocio; la primera conversación es para 
            ayudarte, no para venderte.
          </p>
          
          <a href={LINKS.calendly}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block bg-brand-navy text-white px-8 py-4 rounded-lg
                      font-semibold text-lg transition-all duration-300
                      hover:bg-brand-navy/90 hover:scale-105 mb-12">
            Obtén tu Diagnóstico 3D Gratis
          </a>

          {/* Formulario de Contacto */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              {/* Campo Nombre */}
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-brand-cyan/30'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-brand-cyan focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.name}</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  placeholder="Correo Electrónico *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-brand-cyan/30'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-brand-cyan focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.email}</p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange} 
                  placeholder="Teléfono *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-brand-cyan/30'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-brand-cyan focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.phone}</p>
                )}
              </div>

              {/* Campo Servicio */}
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           bg-white text-gray-900
                           focus:border-brand-cyan focus:outline-none focus:ring-2 
                           focus:ring-brand-cyan/30 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="general">Consulta General</option>
                  <option value="diagnostico">Diagnóstico 3D</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="desarrollo">Desarrollo Web</option>
                  <option value="consultoria">Consultoría</option>
                </select>
              </div>

              {/* Campo Mensaje */}
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange} 
                  placeholder="Mensaje *" 
                  rows={4}
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.message 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-brand-cyan/30'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-brand-cyan focus:outline-none focus:ring-2
                    resize-none disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.message}</p>
                )}
              </div>

              {/* Honeypot field para bots (oculto) */}
              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Botón de envío */}
              <button 
                type="submit"
                disabled={formStatus === 'loading'} 
                className="w-full bg-brand-navy text-white px-6 py-3 rounded-lg
                         font-semibold hover:bg-brand-navy/90 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2">
                {formStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" 
                              stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-gray-600">
              <p className="mb-2">O si lo prefieres, escríbenos a:</p>
              <a href={`mailto:${LINKS.email}`} 
                 className="text-brand-cyan hover:underline block">
                {LINKS.email}
              </a>
            </div>

            {/* Mensaje de Rate Limit */}
            {rateLimitError && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg 
                              animate-shake flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" 
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium">{rateLimitError}</p>
                  {timeLeft > 0 && (
                    <p className="text-sm mt-1 text-amber-700">
                      Tiempo restante: {timeLeft} segundos
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Mensaje de éxito mejorado */}
            {formStatus === 'success' && (
              <div className="mt-4 relative overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 
                                rounded-lg shadow-sm animate-slideIn">
                  {/* Barra de progreso superior */}
                  <div className="absolute top-0 left-0 h-1 bg-green-500 animate-shrink"></div>
                  
                  <div className="flex items-start gap-3">
                    {/* Icono con animación */}
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full 
                                    flex items-center justify-center animate-bounce-once">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" 
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                              clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-green-800 font-semibold text-lg">
                        ¡Mensaje enviado exitosamente!
                      </h3>
                      <p className="text-green-700 mt-1">
                        Hemos recibido tu mensaje. Nuestro equipo te contactará dentro de las próximas 
                        <span className="font-semibold"> 24 horas hábiles</span>.
                      </p>
                      <p className="text-green-600 text-sm mt-2">
                        📧 Revisa tu correo, te hemos enviado una confirmación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de error mejorado */}
            {formStatus === 'error' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 
                              rounded-lg shadow-sm animate-shake">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full 
                                  flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                            clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-red-800 font-semibold">
                      Ups, algo salió mal
                    </h3>
                    <p className="text-red-700 mt-1">
                      {errorMessage}
                    </p>
                    <div className="mt-3 flex gap-3">
                      <button 
                        onClick={() => setFormStatus('idle')}
                        type="button"
                        className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md 
                                 hover:bg-red-200 transition-colors">
                        Intentar de nuevo
                      </button>
                      <a href={`mailto:${LINKS.email}`} 
                         className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md 
                                  hover:bg-gray-200 transition-colors">
                        Contactar por email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
