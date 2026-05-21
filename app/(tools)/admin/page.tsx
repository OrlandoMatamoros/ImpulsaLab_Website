'use client'


import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, getDocs, limit, where, Timestamp } from 'firebase/firestore'
import { Calendar, MessageCircle, Clock, Users, Download, Filter, ChevronDown, ChevronRight } from 'lucide-react'
import AdminAuthWrapper from './components/AdminAuthWrapper'
import { useLanguage } from '@/contexts/LanguageContext'

interface ChatSession {
  id: string
  startedAt: any
  lastActivity: any
  messages: Array<{
    text: string
    isUser: boolean
    timestamp: any
  }>
  userInfo: {
    userAgent: string
    referrer: string
    url: string
  }
  status: string
  isBusinessOpen: boolean
}

interface Stats {
  totalChats: number
  todayChats: number
  weekChats: number
  averageMessages: number
}

export default function AdminDashboard() {
  const { t } = useLanguage()
  const tp = t.adminDashboardPage
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    totalChats: 0,
    todayChats: 0,
    weekChats: 0,
    averageMessages: 0
  })
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'week' | 'month'>('all')

  // Cargar sesiones de chat
  const loadSessions = async () => {
    try {
      let q = query(
        collection(db, 'chat-sessions'),
        orderBy('startedAt', 'desc'),
        limit(100)
      )

      // Aplicar filtros de fecha
      const now = new Date()
      const today = new Date(now.setHours(0, 0, 0, 0))
      const weekAgo = new Date(now.setDate(now.getDate() - 7))
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1))

      if (filterDate === 'today') {
        q = query(
          collection(db, 'chat-sessions'),
          where('startedAt', '>=', Timestamp.fromDate(today)),
          orderBy('startedAt', 'desc')
        )
      } else if (filterDate === 'week') {
        q = query(
          collection(db, 'chat-sessions'),
          where('startedAt', '>=', Timestamp.fromDate(weekAgo)),
          orderBy('startedAt', 'desc')
        )
      } else if (filterDate === 'month') {
        q = query(
          collection(db, 'chat-sessions'),
          where('startedAt', '>=', Timestamp.fromDate(monthAgo)),
          orderBy('startedAt', 'desc')
        )
      }

      const querySnapshot = await getDocs(q)
      const sessionsData: ChatSession[] = []
      
      querySnapshot.forEach((doc) => {
        sessionsData.push({
          id: doc.id,
          ...doc.data() as Omit<ChatSession, 'id'>
        })
      })

      setSessions(sessionsData)
      calculateStats(sessionsData)
      setLoading(false)
    } catch (error) {
      console.error('Error cargando sesiones:', error)
      setLoading(false)
    }
  }

  // Calcular estadísticas
  const calculateStats = (sessionsData: ChatSession[]) => {
    const now = new Date()
    const today = new Date(now.setHours(0, 0, 0, 0))
    const weekAgo = new Date(now.setDate(now.getDate() - 7))

    const todayChats = sessionsData.filter(s => 
      s.startedAt?.toDate && s.startedAt.toDate() >= today
    ).length

    const weekChats = sessionsData.filter(s => 
      s.startedAt?.toDate && s.startedAt.toDate() >= weekAgo
    ).length

    const totalMessages = sessionsData.reduce((acc, s) => 
      acc + (s.messages?.length || 0), 0
    )

    setStats({
      totalChats: sessionsData.length,
      todayChats,
      weekChats,
      averageMessages: sessionsData.length > 0 
        ? Math.round(totalMessages / sessionsData.length) 
        : 0
    })
  }

  useEffect(() => {
    loadSessions()
  }, [filterDate])

  // Exportar a CSV
  const exportToCSV = () => {
    const csvContent = sessions.map(session => {
      const date = session.startedAt?.toDate 
        ? session.startedAt.toDate().toLocaleString('es-ES') 
        : tp.sinFecha
      const messages = session.messages?.map(m => 
        `${m.isUser ? 'Usuario' : 'Nova'}: ${m.text}`
      ).join(' | ') || ''
      const source = session.userInfo?.referrer || tp.directo
      
      return `"${date}","${messages}","${source}","${session.status || tp.activo}"`
    }).join('\n')

    const header = `"${tp.csvFecha}","${tp.csvMensajes}","${tp.csvFuente}","${tp.csvEstado}"\n`
    const blob = new Blob([header + csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `impulsa-lab-chats-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Dashboard principal con wrapper de autenticación
  return (
    <AdminAuthWrapper title={tp.wrapperTitle}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {tp.conversaciones}
            </h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 
                       rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {tp.exportarCSV}
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tp.totalChats}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalChats}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tp.chatsHoy}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayChats}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tp.ultimos7Dias}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.weekChats}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tp.promedioMensajes}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageMessages}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <button
              onClick={() => setFilterDate('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterDate === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tp.todos}
            </button>
            <button
              onClick={() => setFilterDate('today')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterDate === 'today' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tp.hoy}
            </button>
            <button
              onClick={() => setFilterDate('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterDate === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tp.dias7}
            </button>
            <button
              onClick={() => setFilterDate('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterDate === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tp.dias30}
            </button>
          </div>
        </div>

        {/* Insights Avanzados */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {tp.insightsConversaciones}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preguntas más frecuentes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {tp.consultasFrecuentes}
              </h4>
              <div className="space-y-2">
                {(() => {
                  const buttonTexts = [
                    'Quiero mi Diagnóstico 3D Gratis',
                    'Información sobre servicios',
                    'Ver planes y precios',
                    'Hablar con un especialista',
                    'Tengo otra consulta'
                  ];
                  
                  return Object.entries(
                    sessions.reduce((acc, session) => {
                      session.messages?.forEach(msg => {
                        if (msg.isUser && buttonTexts.includes(msg.text)) {
                          acc[msg.text] = (acc[msg.text] || 0) + 1
                        }
                      })
                      return acc
                    }, {} as Record<string, number>)
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([text, count]) => (
                      <div key={text} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 truncate pr-2">{text}</span>
                        <span className="text-sm font-semibold text-gray-900">{count}</span>
                      </div>
                    ))
                })()}
              </div>
            </div>

            {/* Horarios pico */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {tp.horariosActividad}
              </h4>
              <div className="space-y-2">
                {Object.entries(
                  sessions.reduce((acc, session) => {
                    if (session.startedAt?.toDate) {
                      const hour = session.startedAt.toDate().getHours()
                      const timeSlot = `${hour}:00 - ${hour + 1}:00`
                      acc[timeSlot] = (acc[timeSlot] || 0) + 1
                    }
                    return acc
                  }, {} as Record<string, number>)
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([time, count]) => (
                    <div key={time} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{time}</span>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Tasa de conversión */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {tp.metricasConversion}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{tp.movidosWhatsapp}</span>
                  <span className="text-sm font-semibold text-green-600">
                    {sessions.filter(s => s.status === 'moved_to_whatsapp').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{tp.completados}</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {sessions.filter(s => s.status === 'closed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{tp.abandonados}</span>
                  <span className="text-sm font-semibold text-gray-600">
                    {sessions.filter(s => s.status === 'active').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de conversaciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 
                            border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">{tp.cargandoConversaciones}</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {tp.noConversaciones}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sessions.map((session) => {
                const date = session.startedAt?.toDate 
                  ? session.startedAt.toDate() 
                  : new Date()
                const userMessages = session.messages?.filter(m => m.isUser) || []
                
                return (
                  <div key={session.id} className="p-4 hover:bg-gray-50">
                    <div 
                      className="cursor-pointer"
                      onClick={() => setExpandedSession(
                        expandedSession === session.id ? null : session.id
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <button
                            className="mt-1"
                            aria-label={expandedSession === session.id ? "Colapsar sesión" : "Expandir sesión"}
                            aria-expanded={expandedSession === session.id}
                          >
                            {expandedSession === session.id
                              ? <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
                              : <ChevronRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                            }
                          </button>
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-semibold text-gray-900">
                                {date.toLocaleDateString('es-ES')} - {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                session.isBusinessOpen 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {session.isBusinessOpen ? tp.enHorario : tp.fueraHorario}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {userMessages.length > 0 
                                ? userMessages[0].text.substring(0, 100) + '...'
                                : tp.sinMensajes
                              }
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{session.messages?.length || 0} {tp.mensajes}</span>
                              {session.userInfo?.referrer && (
                                <span>{tp.desde} {new URL(session.userInfo.referrer).hostname}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conversación expandida */}
                    {expandedSession === session.id && (
                      <div className="mt-4 ml-7 bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {session.messages?.map((message, idx) => (
                            <div 
                              key={idx}
                              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-xs rounded-lg px-4 py-2 ${
                                message.isUser 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white text-gray-800 border border-gray-200'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Información adicional */}
                        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                          <p><strong>{tp.navegador}</strong> {session.userInfo?.userAgent.substring(0, 50)}...</p>
                          <p><strong>{tp.pagina}</strong> {session.userInfo?.url}</p>
                          {session.userInfo?.referrer && (
                            <p><strong>{tp.referidoDesde}</strong> {session.userInfo.referrer}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
