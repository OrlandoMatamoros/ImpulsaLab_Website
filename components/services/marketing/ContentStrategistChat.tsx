'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type Message = {
  type: 'bot' | 'user'
  text?: string
  content?: React.ReactNode
  timestamp: Date
}

type UserResponses = {
  industry?: string
  idealClient?: string
  objective?: string
}

interface InstagramIdea {
  type: string
  content: string
}

interface ContentPlan {
  objective: string
  instagram: InstagramIdea[]
  blog: string[]
  video: { title: string; description: string }
  email: { subject: string; content: string }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContentStrategistChat = () => {
  const { t, language } = useLanguage()
  const tp = t.contentStrategistChat

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [userResponses, setUserResponses] = useState<UserResponses>({})
  const [showEmailGate, setShowEmailGate] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [started, setStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const questions = [tp.contentStrategistQ1, tp.contentStrategistQ2, tp.contentStrategistQ3]

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatMessages = chatContainerRef.current.querySelector('.chat-messages')
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: 'bot', text, timestamp: new Date() }])
  }

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: 'user', text, timestamp: new Date() }])
  }

  const startChat = () => {
    setMessages([])
    setCurrentStep(0)
    setUserResponses({})
    setInput('')

    setTimeout(() => {
      addBotMessage(tp.contentStrategistWelcome)
      setTimeout(() => {
        addBotMessage(questions[0])
      }, 900)
    }, 400)
  }

  function handleEmailGateSubmit() {
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError(tp.emailInvalid)
      return
    }
    setEmailError('')
    setShowEmailGate(false)
    setStarted(true)
    startChat()
  }

  async function generateContentPlan(responses: UserResponses): Promise<ContentPlan | null> {
    try {
      const res = await fetch('/api/content-strategist/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: responses.industry,
          idealClient: responses.idealClient,
          objective: responses.objective,
          email: email.trim(),
          locale: language,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        return null
      }
      return data.plan as ContentPlan
    } catch (err) {
      console.error('Content strategist fetch error:', err)
      return null
    }
  }

  const renderPlan = (plan: ContentPlan) => (
    <div className="bg-[#00BCD4]/5 border border-[#00BCD4]/20 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold text-[#002D62] flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#00BCD4]" />
        {tp.contentStrategistPlanTitle}
      </h3>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-[#002D62] mb-2">
            {tp.contentStrategistObjective}: {plan.objective}
          </h4>
        </div>

        <div>
          <h4 className="font-semibold text-[#002D62] mb-2">{tp.contentStrategistInstagram}:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {plan.instagram.map((item, i) => (
              <li key={i} className="pl-4 border-l-2 border-[#00BCD4]">
                <strong>{item.type}:</strong>
                <br />
                {item.content}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#002D62] mb-2">{tp.contentStrategistBlog}:</h4>
          <ul className="space-y-1 text-sm text-slate-700">
            {plan.blog.map((title, i) => (
              <li key={i} className="pl-4">
                &rarr; {title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#002D62] mb-2">{tp.contentStrategistVideo}:</h4>
          <p className="text-sm text-slate-700 pl-4">
            <strong>{plan.video.title}</strong>
            <br />
            {plan.video.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[#002D62] mb-2">{tp.contentStrategistEmail}:</h4>
          <p className="text-sm text-slate-700 pl-4">
            <strong>Subject:</strong> {plan.email.subject}
            <br />
            <strong>Body:</strong> {plan.email.content}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[#00BCD4]/20">
        <a
          href="https://calendly.com/orlando-tuimpulsalab/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white px-6 py-2 rounded-full font-semibold hover:brightness-110 transition-all"
        >
          {tp.contentStrategistCTA} &rarr;
        </a>
      </div>
    </div>
  )

  const handleSend = async () => {
    if (!input.trim()) return

    addUserMessage(input)
    const responseKeys = ['industry', 'idealClient', 'objective'] as const
    const newResponses = {
      ...userResponses,
      [responseKeys[currentStep]]: input,
    }
    setUserResponses(newResponses)
    setInput('')

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      setTimeout(() => {
        addBotMessage(questions[currentStep + 1])
      }, 700)
    } else {
      setIsLoading(true)
      addBotMessage(tp.contentStrategistAnalyzing)

      const plan = await generateContentPlan(newResponses)
      setIsLoading(false)

      if (!plan) {
        addBotMessage(tp.contentStrategistError)
        return
      }

      setMessages((prev) => [...prev, { type: 'bot', content: renderPlan(plan), timestamp: new Date() }])
    }
  }

  // Email gate modal
  if (showEmailGate) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{tp.contentStrategistTitle}</h2>
              <p className="text-[#00BCD4]/90 text-sm">{tp.contentStrategistSubtitle}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{tp.emailGateTitle}</h3>
          <p className="text-slate-600 mb-6">{tp.emailGateSubtitle}</p>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEmailGateSubmit()
            }}
            placeholder={tp.emailGatePlaceholder}
            autoFocus
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCD4] text-slate-900"
          />

          {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}

          <button
            type="button"
            onClick={handleEmailGateSubmit}
            disabled={!email.trim()}
            className="w-full mt-5 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#002D62] to-[#00BCD4] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tp.emailGateStart}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={chatContainerRef}
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{tp.contentStrategistTitle}</h2>
              <p className="text-[#00BCD4]/90 text-sm">{tp.contentStrategistSubtitle}</p>
            </div>
          </div>
          {started && (
            <button
              type="button"
              onClick={startChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={tp.contentStrategistRestart}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="chat-messages h-96 overflow-y-auto p-6 bg-slate-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-[#00BCD4]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 border border-[#00BCD4]/30">
                  <Bot className="w-5 h-5 text-[#002D62]" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white'
                    : 'bg-white shadow-sm border border-slate-100'
                }`}
              >
                {message.content || message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-[#00BCD4]/10 rounded-full flex items-center justify-center mr-3 border border-[#00BCD4]/30">
                <Bot className="w-5 h-5 text-[#002D62]" />
              </div>
              <div className="bg-white shadow-sm rounded-2xl px-4 py-3 border border-slate-100">
                <Loader2 className="w-5 h-5 animate-spin text-[#00BCD4]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={tp.contentStrategistInputPlaceholder}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-full focus:outline-none focus:border-[#00BCD4] transition-colors text-slate-900"
            disabled={isLoading || messages.length === 0}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white rounded-full font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            {tp.contentStrategistSend}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentStrategistChat
