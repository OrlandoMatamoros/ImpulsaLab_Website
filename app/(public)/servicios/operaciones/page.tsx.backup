'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import ProtectedSection from '@/components/ProtectedSection'
import OperationsEnhancedSection from '@/components/operations/OperationsEnhancedSection'

export default function OperacionesPage() {
  return (
    <>
      {/* Sección 1: Hero - SIEMPRE VISIBLE */}
      <section className="relative bg-green-900 text-white pt-24 pb-20 overflow-hidden">
        {/* Patrón de fondo abstracto */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Automatiza tu Negocio. Recupera tu Tiempo. Enfócate en Crecer.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Implementamos agentes de IA que se encargan de las tareas repetitivas mientras 
              tú te dedicas a lo que realmente importa: hacer crecer tu negocio.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-800 rounded-full">
              <span className="font-medium">Próximamente: Automatización completa de procesos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema - SIEMPRE VISIBLE */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              {[
                "¿Pasas horas en tareas administrativas que no agregan valor?",
                "¿Tu equipo pierde tiempo en procesos manuales y repetitivos?",
                "¿Los errores humanos en tareas rutinarias te cuestan dinero?",
                "¿Sientes que trabajas EN tu negocio en lugar de PARA tu negocio?"
              ].map((problema, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <p className="text-lg text-gray-700">{problema}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución - SIEMPRE VISIBLE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Agentes de IA: Tu Equipo Digital 24/7
            </h2>
            
            {/* Video Demo */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/lMFV5mq_IXo"
                title="Automatización Demo - Impulsa Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Características básicas - SIEMPRE VISIBLE */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Automatización de emails y seguimientos",
                  description: "Responde consultas y programa citas automáticamente"
                },
                {
                  title: "Gestión inteligente de agenda",
                  description: "Optimiza tu calendario y evita conflictos de horario"
                },
                {
                  title: "Procesamiento automático de documentos",
                  description: "Extrae datos y genera reportes sin intervención manual"
                },
                {
                  title: "Chatbots de atención al cliente",
                  description: "Atiende a tus clientes 24/7 con respuestas personalizadas"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PROTEGIDO - Proceso detallado y Planes */}
      <ProtectedSection
        message="Regístrate gratis para acceder a nuestra metodología completa de automatización, casos de éxito y planes personalizados para tu negocio"
        showPreview={true}
        previewBlur={false}
      >
        {/* Sección 4: Nuestro Proceso */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                De la Tarea Manual a la Operación Inteligente
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    numero: "1",
                    titulo: "Diagnóstico Operativo",
                    descripcion: "Analizamos tu flujo de trabajo actual para identificar los cuellos de botella y las tareas repetitivas que más tiempo te consumen."
                  },
                  {
                    numero: "2",
                    titulo: "Diseño del Agente de IA",
                    descripcion: "Definimos la \"personalidad\" de tu agente, las tareas que ejecutará y las plataformas con las que se integrará (web, email, etc.)."
                  },
                  {
                    numero: "3",
                    titulo: "Desarrollo y Entrenamiento",
                    descripcion: "Construimos el cerebro de tu agente y lo entrenamos con la información específica de tu negocio: tus servicios, precios, y respuestas a preguntas frecuentes."
                  },
                  {
                    numero: "4",
                    titulo: "Implementación e Integración",
                    descripcion: "Conectamos el agente a tus sistemas y lo ponemos en marcha. Realizamos pruebas exhaustivas para asegurar un funcionamiento impecable."
                  },
                  {
                    numero: "5",
                    titulo: "Monitoreo y Optimización",
                    descripcion: "No te dejamos solo. Monitoreamos el rendimiento de tu agente y hacemos ajustes continuos para maximizar su eficiencia y resultados."
                  }
                ].map((paso, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-lg p-6 shadow-lg h-full">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                        {paso.numero}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
                      <p className="text-gray-600 text-sm">{paso.descripcion}</p>
                    </div>
                    {index < 4 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Casos de éxito específicos */}
              <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                  Casos de Éxito en Automatización
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                    <div className="text-gray-700 font-semibold">Reducción en tiempo administrativo</div>
                    <div className="text-sm text-gray-500 mt-2">Consultoría Legal</div>
                    <div className="text-xs text-gray-400 mt-1">Automatización de contratos y seguimientos</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                    <div className="text-gray-700 font-semibold">Atención al cliente automatizada</div>
                    <div className="text-sm text-gray-500 mt-2">E-commerce</div>
                    <div className="text-xs text-gray-400 mt-1">Chatbot con 95% de resolución automática</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">$15K</div>
                    <div className="text-gray-700 font-semibold">Ahorro mensual en nómina</div>
                    <div className="text-sm text-gray-500 mt-2">Agencia de Marketing</div>
                    <div className="text-xs text-gray-400 mt-1">Automatización de reportes y facturación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 5: Planes y Precios */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                Planes de Automatización Inteligente
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Plan Asistente Digital */}
                <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-xl">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Asistente Digital</h3>
                  <p className="text-gray-600 mb-6">Ideal para: Emprendedores que necesitan su primer asistente virtual inteligente.</p>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-green-600">Desde $500</p>
                    <p className="text-gray-500">Pago único + configuración</p>
                  </div>

                  <div className="mb-8">
                    <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">1 Agente de IA personalizado para tareas específicas</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Automatización de tareas básicas (emails, agenda)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Soporte inicial y capacitación completa</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Manual de operación y mantenimiento</span>
                      </li>
                    </ul>
                  </div>

                  <button className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Agendar Diagnóstico
                  </button>
                </div>

                {/* Plan Equipo Completo */}
                <div className="bg-green-50 rounded-lg p-8 border-2 border-green-200 relative hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-3 right-8 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Equipo Completo</h3>
                  <p className="text-gray-600 mb-6">Ideal para: Negocios listos para escalar sus operaciones con automatización completa.</p>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-green-600">Desde $1,000</p>
                    <p className="text-gray-500">+ $300/mes gestión y soporte</p>
                  </div>

                  <div className="mb-8">
                    <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Todo lo del plan Asistente Digital</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Múltiples agentes especializados por área</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Integración completa con tus sistemas (CRM, ERP)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Dashboard de monitoreo en tiempo real</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Soporte continuo y optimización mensual</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Actualizaciones automáticas de agentes</span>
                      </li>
                    </ul>
                  </div>

                  <button className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Agendar Diagnóstico
                  </button>
                </div>
              </div>

              {/* ROI Calculator Preview */}
              <div className="mt-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                  Calculadora de ROI: ¿Cuánto Podrías Ahorrar?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Salario promedio empleado admin</div>
                    <div className="text-2xl font-bold text-gray-900">$800/mes</div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Costo agente IA</div>
                    <div className="text-2xl font-bold text-green-600">$300/mes</div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Ahorro mensual</div>
                    <div className="text-2xl font-bold text-blue-600">$500/mes</div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  *Basado en automatización del 60% de tareas administrativas
                </p>
              </div>
            </div>
          </div>
        </section>
      </ProtectedSection>

      {/* Sección 6: CTA Final - SIEMPRE VISIBLE */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Recuperar tu Tiempo y Enfocarte en Crecer?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Agenda tu diagnóstico gratuito y descubre cómo la automatización inteligente 
              puede transformar la forma en que operas tu negocio.
            </p>
            <Link href={LINKS.calendly}
                  target="_blank"
                  className="inline-block bg-white text-green-900 px-8 py-4 rounded-lg 
                           font-semibold text-lg transition-all duration-300 
                           hover:scale-105 hover:bg-gray-100">
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}