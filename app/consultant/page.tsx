'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import Link from 'next/link'
import { 
  Users,
  FileText,
  Download,
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ConsultantData {
  email: string
  name?: string
  role: string
  consultantCode?: string
  assignedClients?: number
  totalDiagnostics?: number
}

interface Diagnostic {
  id: string
  clientName: string
  clientEmail: string
  date: string
  status: 'completed' | 'pending' | 'in-progress'
  score?: number
}

export default function ConsultantDashboard() {
  const [user, setUser] = useState<any>(null)
  const [consultantData, setConsultantData] = useState<ConsultantData | null>(null)
  const [recentDiagnostics, setRecentDiagnostics] = useState<Diagnostic[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useLanguage()
  const tp = t.consultantPage

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data() as ConsultantData
            
            // Verificar que sea consultor o admin
            if (data.role !== 'consultant' && data.role !== 'admin') {
              router.push('/unauthorized')
              return
            }
            
            setConsultantData(data)
            
            // Cargar diagnósticos recientes
            await loadRecentDiagnostics(firebaseUser.uid)
          }
        } catch (error) {
          console.error('Error obteniendo datos del consultor:', error)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const loadRecentDiagnostics = async (consultantId: string) => {
    try {
      // Por ahora simulamos datos, luego conectaremos con Firebase
      const mockDiagnostics: Diagnostic[] = [
        {
          id: '1',
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com',
          date: '2024-08-14',
          status: 'completed',
          score: 85
        },
        {
          id: '2',
          clientName: 'María García',
          clientEmail: 'maria@example.com',
          date: '2024-08-13',
          status: 'in-progress',
          score: 72
        },
        {
          id: '3',
          clientName: 'Carlos López',
          clientEmail: 'carlos@example.com',
          date: '2024-08-12',
          status: 'pending'
        }
      ]
      setRecentDiagnostics(mockDiagnostics)
    } catch (error) {
      console.error('Error cargando diagnósticos:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || !consultantData) {
    return null
  }

  const stats = [
    {
      label: tp.clientesAsignados,
      value: consultantData.assignedClients || 12,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+15%'
    },
    {
      label: tp.diagnosticosCompletados,
      value: consultantData.totalDiagnostics || 45,
      icon: FileText,
      color: 'bg-green-500',
      trend: '+23%'
    },
    {
      label: tp.tasaConversion,
      value: '68%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: '+5%'
    },
    {
      label: tp.citasEstaSemana,
      value: 8,
      icon: Calendar,
      color: 'bg-orange-500',
      trend: '0%'
    }
  ]

  const quickActions = [
    {
      title: tp.verDiagnosticos,
      description: tp.accedeDiagnosticos,
      icon: FileText,
      href: '/consultant/diagnosticos',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: tp.misClientes,
      description: tp.gestionaCartera,
      icon: Users,
      href: '/consultant/clientes',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: tp.descargarPDFs,
      description: tp.exportaDiagnosticos,
      icon: Download,
      href: '/consultant/diagnosticos',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: tp.metricas,
      description: tp.analizaRendimiento,
      icon: BarChart3,
      href: '/consultant/metricas',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': { bg: 'bg-green-100', text: 'text-green-800', label: tp.completado },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: tp.enProgreso },
      'pending': { bg: 'bg-gray-100', text: 'text-gray-800', label: tp.pendiente }
    }
    return badges[status as keyof typeof badges] || badges.pending
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tp.panelConsultor}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {tp.bienvenido} {consultantData.name || consultantData.email}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {tp.codigo} <span className="font-mono font-bold">{consultantData.consultantCode || 'N/A'}</span>
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Target className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {action.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {action.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent Diagnostics Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {tp.diagnosticosRecientes}
            </h2>
            <Link
              href="/consultant/diagnosticos"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {tp.verTodos}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tp.cliente}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tp.fecha}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tp.estado}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tp.puntuacion}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tp.acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDiagnostics.map((diagnostic) => {
                  const statusBadge = getStatusBadge(diagnostic.status)
                  return (
                    <tr key={diagnostic.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {diagnostic.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {diagnostic.clientEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {diagnostic.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {diagnostic.score ? (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              {diagnostic.score}%
                            </span>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${diagnostic.score}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          {tp.ver}
                        </button>
                        {diagnostic.status === 'completed' && (
                          <button className="text-green-600 hover:text-green-900">
                            <Download className="h-4 w-4 inline" />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tp.rendimientoSemanal}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{tp.diagnosticosCompletados}</span>
                <span className="text-sm font-medium">12/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500">{tp.tasaConversion}</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tp.proximasCitas}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ana Martínez</p>
                    <p className="text-xs text-gray-500">{tp.hoy3PM}</p>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Roberto Silva</p>
                    <p className="text-xs text-gray-500">{tp.manana10AM}</p>
                  </div>
                </div>
                <XCircle className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
