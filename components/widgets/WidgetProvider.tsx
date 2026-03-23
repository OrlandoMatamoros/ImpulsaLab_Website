'use client'

import { useState } from 'react'
import { X, Phone, Bot, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Message {
  id: string
  text: string
  isUser: boolean
  options?: string[]
}

export default function WidgetProvider() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showWebChat, setShowWebChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  // NÚMEROS ACTUALIZADOS
  const whatsappNumber = '19295007815'  // WhatsApp con IA
  const phoneNumber = '13474509281'      // Número para llamadas

  const initialMessage: Message = {
    id: '1',
    text: '¡Hola! 👋 Soy el asistente de Impulsa Lab. ¿En qué puedo ayudarte?',
    isUser: false,
    options: [
      '📊 Quiero hacer el Diagnóstico 3D',
      '💡 ¿Qué es Impulsa Lab?',
      '🚀 Ver servicios disponibles',
      '💬 Hablar con Orlando'
    ]
  }

  const responses: { [key: string]: string } = {
    '📊 Quiero hacer el Diagnóstico 3D': 'El Diagnóstico 3D es una evaluación gratuita de 30 minutos donde analizamos tu negocio en 3 dimensiones: Finanzas, Operaciones y Marketing.\n\n📅 Puedes agendar aquí: https://calendly.com/orlando-tuimpulsalab/30min',
    '💡 ¿Qué es Impulsa Lab?': 'Impulsa Lab es tu socio estratégico en transformación digital. Ayudamos a negocios a automatizar procesos con IA, tomar decisiones basadas en datos y escalar operaciones eficientemente.',
    '🚀 Ver servicios disponibles': 'Ofrecemos:\n\n💰 FINANZAS: Dashboards en tiempo real\n📈 MARKETING: Estrategia de contenidos\n⚙️ OPERACIONES: Automatización con IA\n\n¿Te gustaría saber más sobre alguno?',
    '💬 Hablar con Orlando': 'Puedes contactar a Orlando de estas formas:\n\n📅 Agendar reunión: https://calendly.com/orlando-tuimpulsalab/30min\n📱 WhatsApp: Usa el botón de WhatsApp\n📞 Llamar: Usa el botón de llamada'
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent('¡Hola! Me gustaría conocer más sobre Impulsa Lab')
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank')
    setShowOptions(false)
  }

  const handleCall = () => {
    window.location.href = `tel:+${phoneNumber}`
    setShowOptions(false)
  }

  const handleOpenWebChat = () => {
    setShowWebChat(true)
    setShowOptions(false)
    if (messages.length === 0) {
      setMessages([initialMessage])
    }
  }

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      isUser: true
    }
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responses[option] || 'Gracias por tu mensaje. Un especialista te contactará pronto.',
      isUser: false,
      options: option === '🚀 Ver servicios disponibles' ? 
        ['💰 Más sobre Finanzas', '📈 Más sobre Marketing', '⚙️ Más sobre Operaciones'] : 
        ['📊 Quiero hacer el Diagnóstico 3D', '💬 Hablar con Orlando', '🔙 Menú principal']
    }
    
    setMessages(prev => [...prev, userMessage, botResponse])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true
    }

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Gracias por tu mensaje. Para una respuesta más completa, te recomiendo:\n\n📱 Continuar por WhatsApp con nuestra IA\n📅 Agendar una reunión con Orlando',
      isUser: false,
      options: ['📱 Ir a WhatsApp', '📅 Agendar reunión', '🔙 Menú principal']
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setInputValue('')
  }

  return (
    <>
      {/* Chat Web Modal */}
      {showWebChat && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl w-[380px] max-w-[calc(100vw-3rem)] h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl text-white flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Chat Impulsa Lab</h3>
              <p className="text-xs opacity-90">Respuesta inmediata</p>
            </div>
            <button onClick={() => setShowWebChat(false)} className="hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
                
                {/* Options */}
                {!message.isUser && message.options && (
                  <div className="mt-2 space-y-2">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left bg-white hover:bg-gray-50 text-gray-700 
                                 px-3 py-2 rounded-lg text-sm border border-gray-200 
                                 hover:border-blue-300 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm
                         focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Opciones expandidas */}
      <div className={`fixed bottom-24 right-6 z-40 flex flex-col gap-3 transition-all duration-300 ${
        showOptions ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg 
                   hover:shadow-xl transform transition-all duration-200 hover:scale-105"
        >
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
            <p className="text-xs text-gray-500">Chat con IA 24/7</p>
          </div>
        </button>

        {/* Chat Web */}
        <button
          onClick={handleOpenWebChat}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg 
                   hover:shadow-xl transform transition-all duration-200 hover:scale-105"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Chat Web</p>
            <p className="text-xs text-gray-500">Sin WhatsApp</p>
          </div>
        </button>

        {/* Llamada */}
        <button
          onClick={handleCall}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg 
                   hover:shadow-xl transform transition-all duration-200 hover:scale-105"
        >
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">{language === 'es' ? 'Llamar' : 'Call'}</p>
            <p className="text-xs text-gray-500">+1 347 450 9281</p>
          </div>
        </button>
      </div>

      {/* Botón principal con ícono WhatsApp y gradiente morado/azul */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white rounded-full p-4 shadow-lg hover:shadow-xl transform 
                   transition-all duration-300 hover:scale-110 ${showOptions ? 'rotate-45' : ''}`}
      >
        {showOptions ? (
          <X className="w-6 h-6" />
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
        {!showOptions && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        )}
      </button>
    </>
  )
}
