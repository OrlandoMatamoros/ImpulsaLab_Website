'use client'
import React, { useState, useEffect } from 'react';
import { LINKS } from '@/lib/constants'
import Link from 'next/link';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle,
  Play,
  ArrowRight,
  Brain,
  Globe,
  Shield,
  ChevronRight,
  AlertCircle,
  BarChart3,
  Phone,
  MessageSquare,
  FileText,
  ShoppingCart,
  Users,
  Package,
  Lightbulb,
  Send,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

// Iconos extraídos de tu HorizontalTechTicker
const ChatGPTIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.707 2.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L11 7.586l5.293-5.293a1 1 0 0 1 1.414 0zM17.707 21.707a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 16.414l5.293 5.293a1 1 0 0 0 1.414 0z"/>
  </svg>
);

const GeminiIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2zm0 4.83L10.42 11.17 6.08 12l4.34.83L12 17.17l1.58-4.34L17.92 12l-4.34-.83L12 6.83z"/>
  </svg>
);

const ZapierIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 3h-2v7H6v2h7v7h2v-7h7v-2h-7V3z"/>
  </svg>
);

const MakeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

const N8nIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 8c1.66 0 3 1.34 3 3h-6c0-1.66 1.34-3 3-3z"/>
  </svg>
);

// Componente principal que se insertará en tu página
export default function OperationsEnhancedSection() {
  const [activeTab, setActiveTab] = useState('what-is-agent');
  const [selectedAgent, setSelectedAgent] = useState('unificador');
  const [userQuery, setUserQuery] = useState('');
  const [aiResponses, setAiResponses] = useState({
    chatgpt: '',
    claude: '',
    gemini: '',
    unified: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Datos de las plataformas de automatización con videos actualizados
  const automationPlatforms = [
    {
      id: 'make',
      name: "Make (Integromat)",
      icon: <MakeIcon className="w-8 h-8" />,
      description: "Automatización visual sin código para conectar apps y servicios",
      features: [
        "1000+ integraciones pre-construidas",
        "Interface visual drag & drop",
        "Sin necesidad de código",
        "Webhooks y API REST"
      ],
      videoId: "g6u28CpxXoQ",
      bestFor: "Pequeñas y medianas empresas",
      pricing: "Desde $9/mes",
      color: "#6D00CC"
    },
    {
      id: 'n8n',
      name: "n8n",
      icon: <N8nIcon className="w-8 h-8" />,
      description: "Plataforma de automatización de código abierto y auto-hospedable",
      features: [
        "200+ nodos nativos",
        "Self-hosted o cloud",
        "Código personalizable",
        "Comunidad activa"
      ],
      videoId: "1MwSoB0gnM4",
      bestFor: "Empresas con equipo técnico",
      pricing: "Gratis (self-hosted) o desde $20/mes",
      color: "#EA4B71"
    },
    {
      id: 'zapier',
      name: "Zapier",
      icon: <ZapierIcon className="w-8 h-8" />,
      description: "El líder mundial en automatización no-code",
      features: [
        "5000+ aplicaciones",
        "Plantillas pre-hechas",
        "Interface super simple",
        "Filtros y formateadores"
      ],
      videoId: "ZzzjVfJsJPA",
      bestFor: "Usuarios no técnicos",
      pricing: "Desde $19.99/mes",
      color: "#FF4A00"
    },
    {
      id: 'dapta',
      name: "DAPTA AI",
      icon: <Phone className="w-8 h-8" />,
      description: "Agentes de voz con IA para atención al cliente",
      features: [
        "Voz 100% natural",
        "Disponible 24/7",
        "Multi-idioma nativo",
        "Integración con CRM"
      ],
      videoId: "r5RPBBzDyd0",
      bestFor: "Centros de atención",
      pricing: "Personalizado",
      color: "#10B981"
    }
  ];

  // Casos de uso por industria
  const industryCases = [
    {
      industry: "Retail / Minimarket",
      icon: <ShoppingCart className="w-8 h-8" />,
      painPoints: [
        "Control manual de inventarios",
        "Pérdida por productos vencidos",
        "Precios no competitivos",
        "Promociones poco efectivas"
      ],
      aiSolution: {
        title: "Sistema Inteligente de Gestión Retail",
        agents: [
          {
            name: "Agente Monitor de Precios",
            tasks: [
              "Escanea precios de competencia diariamente",
              "Analiza tendencias de mercado",
              "Sugiere ajustes de precio óptimos",
              "Alerta sobre oportunidades de compra"
            ]
          },
          {
            name: "Agente de Inventario",
            tasks: [
              "Predice demanda por producto",
              "Alerta productos próximos a vencer",
              "Optimiza niveles de stock",
              "Genera órdenes de compra automáticas"
            ]
          }
        ],
        metrics: {
          waste: "-45% desperdicio",
          margin: "+30% margen neto",
          time: "20 hrs/semana ahorradas"
        }
      }
    },
    {
      industry: "Salud / Consultorios",
      icon: <Users className="w-8 h-8" />,
      painPoints: [
        "Alta tasa de inasistencia",
        "Agenda desorganizada",
        "Seguimiento manual de pacientes",
        "Cobranza ineficiente"
      ],
      aiSolution: {
        title: "Asistente Médico Digital",
        agents: [
          {
            name: "Agente de Citas",
            tasks: [
              "Confirmación automática por WhatsApp",
              "Reagendamiento inteligente",
              "Lista de espera dinámica",
              "Recordatorios personalizados"
            ]
          },
          {
            name: "Agente de Seguimiento",
            tasks: [
              "Recordatorios de medicación",
              "Seguimiento post-consulta",
              "Alertas de controles pendientes",
              "Encuestas de satisfacción"
            ]
          }
        ],
        metrics: {
          noShow: "-70% inasistencias",
          revenue: "+40% ingresos",
          satisfaction: "95% satisfacción"
        }
      }
    },
    {
      industry: "Restaurantes",
      icon: <Package className="w-8 h-8" />,
      painPoints: [
        "Pérdida de pedidos telefónicos",
        "Errores en órdenes",
        "Inventario descontrolado",
        "Personal sobrecargado"
      ],
      aiSolution: {
        title: "Sistema Gastronómico Inteligente",
        agents: [
          {
            name: "Agente de Pedidos",
            tasks: [
              "Toma pedidos por voz/chat 24/7",
              "Sugiere complementos y bebidas",
              "Procesa pagos automáticamente",
              "Coordina con cocina y delivery"
            ]
          },
          {
            name: "Agente de Cocina",
            tasks: [
              "Optimiza tiempos de preparación",
              "Alerta ingredientes faltantes",
              "Sugiere menú del día por stock",
              "Calcula costos por plato"
            ]
          }
        ],
        metrics: {
          sales: "+45% ventas nocturnas",
          accuracy: "99% pedidos correctos",
          speed: "50% más rápido"
        }
      }
    }
  ];

  // Comparación de IAs
  const aiComparison = [
    {
      name: "OpenAI (ChatGPT)",
      icon: <ChatGPTIcon className="w-12 h-12" />,
      strengths: [
        "Mejor razonamiento lógico",
        "Excelente para código",
        "Análisis de datos complejos",
        "Visión por computadora"
      ],
      weaknesses: [
        "Puede alucinar datos",
        "Límite de contexto menor",
        "Sin acceso a internet directo"
      ],
      bestUseCase: "Análisis técnico y programación",
      apiCost: "$0.03/1K tokens",
      color: "#00A67E"
    },
    {
      name: "Anthropic (Claude)",
      icon: <ClaudeIcon className="w-12 h-12" />,
      strengths: [
        "Respuestas más naturales",
        "100K tokens de contexto",
        "Más ético y seguro",
        "Excelente redacción"
      ],
      weaknesses: [
        "Sin capacidades visuales",
        "Menos datos de entrenamiento",
        "API más limitada"
      ],
      bestUseCase: "Contenido y análisis extenso",
      apiCost: "$0.024/1K tokens",
      color: "#D97757"
    },
    {
      name: "Google (Gemini)",
      icon: <GeminiIcon className="w-12 h-12" />,
      strengths: [
        "Multimodal nativo",
        "Integración con Google",
        "Búsqueda en tiempo real",
        "Múltiples idiomas"
      ],
      weaknesses: [
        "Menos preciso en código",
        "Respuestas más genéricas",
        "API en desarrollo"
      ],
      bestUseCase: "Búsqueda y productividad",
      apiCost: "$0.025/1K tokens",
      color: "#4285F4"
    }
  ];

  // Simulación del Agente Unificador
  const processUnifiedQuery = async () => {
    if (!userQuery.trim()) return;
    
    setIsProcessing(true);
    setAiResponses({
      chatgpt: '',
      claude: '',
      gemini: '',
      unified: ''
    });

    try {
      const response = await fetch('/api/unified-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userQuery
        })
      });

      if (!response.ok) {
        throw new Error('Error en la consulta');
      }

      const data = await response.json();
      
      // Mostrar respuestas con animación secuencial
      const showResponse = async (key: string, delay: number) => {
        await new Promise(resolve => setTimeout(resolve, delay));
        setAiResponses(prev => ({ ...prev, [key]: data[key] }));
      };

      await showResponse('chatgpt', 500);
      await showResponse('claude', 1000);
      await showResponse('gemini', 1500);
      await showResponse('unified', 2000);

    } catch (error) {
      console.error('Error:', error);
      setAiResponses({
        chatgpt: 'Error al conectar con ChatGPT',
        claude: 'Error al conectar con Claude',
        gemini: 'Error al conectar con Gemini',
        unified: 'Por favor, intenta de nuevo más tarde.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Sección 1: ¿Qué es un Agente de IA? */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              ¿Qué es un Agente de IA y qué puede hacer REALMENTE por tu negocio?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Un agente de IA no es solo un chatbot. Es un empleado digital que trabaja 24/7, 
              aprende de tu negocio y ejecuta tareas complejas de forma autónoma.
            </p>

            {/* Visual comparativo */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                <h3 className="text-xl font-bold mb-6 text-red-700">❌ Lo que NO es un Agente IA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <strong>Un simple chatbot</strong>
                      <p className="text-sm text-gray-600">Que solo responde preguntas predefinidas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <strong>Una herramienta aislada</strong>
                      <p className="text-sm text-gray-600">Que no se conecta con tus sistemas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <strong>Tecnología del futuro</strong>
                      <p className="text-sm text-gray-600">Es tecnología disponible HOY</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
                <h3 className="text-xl font-bold mb-6 text-green-700">✅ Lo que SÍ es un Agente IA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Empleado digital autónomo</strong>
                      <p className="text-sm text-gray-600">Toma decisiones y ejecuta tareas complejas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Sistema integrado</strong>
                      <p className="text-sm text-gray-600">Se conecta con todas tus herramientas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Solución lista para usar</strong>
                      <p className="text-sm text-gray-600">Implementable en días, no meses</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ejemplos visuales de tareas */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Tareas Reales que un Agente IA hace HOY
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                  <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Ventas 24/7</h4>
                  <p className="text-sm text-gray-600">
                    Atiende clientes, cotiza, negocia precios y cierra ventas mientras duermes
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Análisis en Tiempo Real</h4>
                  <p className="text-sm text-gray-600">
                    Monitorea métricas, detecta anomalías y sugiere acciones correctivas
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                  <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Automatización Total</h4>
                  <p className="text-sm text-gray-600">
                    Ejecuta flujos completos desde la orden hasta la entrega sin intervención
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Agente Unificador 4IA */}
      <section className="py-20 bg-gradient-to-br from-brand-navy via-slate-900 to-black text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/40 rounded-full text-sm font-semibold text-amber-100">
                🛠️ Servicio custom · Desde $99/mes
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Exclusivo Impulsa Lab
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Agente Unificador 4IA
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Powered by Claude Opus: Consultamos ChatGPT, Claude y Gemini simultáneamente, 
              y nuestro 4to modelo avanzado (Claude Opus) unifica y sintetiza las mejores respuestas.
            </p>
          </div>

          {/* Demo del Unificador */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Hazle cualquier pregunta sobre tu negocio:
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && processUnifiedQuery()}
                    placeholder="Ej: ¿Cómo puedo automatizar mi gestión de inventario?"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    onClick={processUnifiedQuery}
                    disabled={!userQuery || isProcessing}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Consultando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Consultar 3 IAs
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Respuestas de las IAs */}
              {(aiResponses.chatgpt || aiResponses.claude || aiResponses.gemini) && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* ChatGPT */}
                    <div className={`p-4 bg-white/10 rounded-lg ${aiResponses.chatgpt ? 'animate-fadeIn' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <ChatGPTIcon className="w-6 h-6 text-green-400" />
                        <span className="font-semibold">ChatGPT</span>
                      </div>
                      <p className="text-sm text-gray-200">
                        {aiResponses.chatgpt || 'Analizando...'}
                      </p>
                    </div>

                    {/* Claude */}
                    <div className={`p-4 bg-white/10 rounded-lg ${aiResponses.claude ? 'animate-fadeIn' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <ClaudeIcon className="w-6 h-6 text-orange-400" />
                        <span className="font-semibold">Claude</span>
                      </div>
                      <p className="text-sm text-gray-200">
                        {aiResponses.claude || 'Procesando...'}
                      </p>
                    </div>

                    {/* Gemini */}
                    <div className={`p-4 bg-white/10 rounded-lg ${aiResponses.gemini ? 'animate-fadeIn' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <GeminiIcon className="w-6 h-6 text-blue-400" />
                        <span className="font-semibold">Gemini</span>
                      </div>
                      <p className="text-sm text-gray-200">
                        {aiResponses.gemini || 'Investigando...'}
                      </p>
                    </div>
                  </div>

                  {/* Respuesta Unificada */}
                  {aiResponses.unified && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-6 h-6 text-yellow-400" />
                        <span className="font-bold text-lg">Respuesta Unificada 4IA (Claude Opus)</span>
                      </div>
                      <p className="text-gray-100 whitespace-pre-wrap">{aiResponses.unified}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Comparación de IAs */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {aiComparison.map((ai, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      {ai.icon}
                      <div>
                        <h4 className="font-semibold">{ai.name}</h4>
                        <p className="text-xs text-gray-300">{ai.apiCost}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Ideal para:</strong> {ai.bestUseCase}
                    </p>
                    <div className="space-y-1">
                      {ai.strengths.slice(0, 2).map((strength, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-gray-300">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">
                Acceso al Agente Unificador 4IA desde{' '}
                <span className="text-3xl font-bold text-white">$99/mes</span>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                🔐 Requiere cuenta activa. <Link href="/login" className="text-blue-300 hover:text-blue-200 underline">Inicia sesión</Link> o <Link href="/signup" className="text-blue-300 hover:text-blue-200 underline">regístrate</Link> para comenzar.
              </p>
              <Link href="/servicios/operaciones/precios" className="inline-block px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100 transition">
                Ver Planes y Precios →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Casos de Uso por Industria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Casos Reales: IA Transformando Negocios Como el Tuyo
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              No son conceptos futuristas. Son implementaciones reales que están 
              funcionando HOY en negocios de todos los tamaños.
            </p>

            <div className="space-y-12">
              {industryCases.map((caseStudy, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        {caseStudy.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{caseStudy.industry}</h3>
                        <p className="text-gray-600">Transformación Digital con IA</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Problemas */}
                      <div>
                        <h4 className="font-bold text-red-600 mb-4">🔴 Problemas Actuales</h4>
                        <ul className="space-y-3">
                          {caseStudy.painPoints.map((pain, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{pain}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solución */}
                      <div>
                        <h4 className="font-bold text-green-600 mb-4">🟢 {caseStudy.aiSolution.title}</h4>
                        <div className="space-y-4">
                          {caseStudy.aiSolution.agents.map((agent, i) => (
                            <div key={i} className="bg-green-50 rounded-lg p-4">
                              <h5 className="font-semibold mb-2">{agent.name}</h5>
                              <ul className="space-y-1">
                                {agent.tasks.map((task, j) => (
                                  <li key={j} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Métricas */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {Object.entries(caseStudy.aiSolution.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Plataformas de Automatización */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Plataformas de Automatización que Implementamos
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              No vendemos software. Curamos, implementamos y optimizamos las mejores 
              soluciones del mercado para tu negocio específico.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {automationPlatforms.map((platform) => (
                <div key={platform.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${platform.color}20` }}>
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{platform.name}</h3>
                          <p className="text-sm text-gray-600">{platform.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-700">Características principales:</h4>
                      <ul className="space-y-2">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Ideal para</div>
                        <div className="font-semibold text-sm">{platform.bestFor}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Precio</div>
                        <div className="font-semibold text-sm">{platform.pricing}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(`https://youtube.com/watch?v=${platform.videoId}`, '_blank')}
                      className="w-full px-4 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
                    >
                      <Play className="w-5 h-5" />
                      Ver Demo en Video
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                ¿No sabes cuál plataforma es mejor para tu negocio?
              </h3>
              <p className="mb-6 opacity-90">
                Te ayudamos a elegir e implementar la solución perfecta en menos de 2 semanas
              </p>
              <a href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition">
                Agendar Consultoría Gratuita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: ROI y Urgencia */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              El Mundo se Está Dividiendo en Dos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Los que NO usan IA
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">↓</span>
                    <span>Pierden 30-40% más tiempo en tareas manuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">↓</span>
                    <span>Sus competidores les quitan clientes 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">↓</span>
                    <span>Costos operativos creciendo sin control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">↓</span>
                    <span>Empleados frustrados con trabajo repetitivo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold mb-4 text-green-400">
                  Los que SÍ usan IA
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">↑</span>
                    <span>Atienden 10x más clientes con menos recursos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">↑</span>
                    <span>Venden mientras duermen (literalmente)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">↑</span>
                    <span>Reducen costos operativos 40-60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">↑</span>
                    <span>Empleados enfocados en trabajo estratégico</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Tu Decisión HOY Define tu Futuro</h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-3 text-yellow-400">Opción 1: Hacerlo Solo</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 6-12 meses aprendiendo</li>
                    <li>• Miles de dólares en errores</li>
                    <li>• Perder foco de tu negocio</li>
                    <li>• Sin garantía de éxito</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-green-400">Opción 2: Con Impulsa Lab</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Implementación en 2-4 semanas</li>
                    <li>• ROI garantizado desde día 1</li>
                    <li>• 100% enfocado en crecer</li>
                    <li>• Soporte continuo incluido</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-bold">
                Cada día que esperas, tu competencia automatiza más
              </p>
              <p className="text-lg opacity-80">
                La pregunta no es SI implementar IA, es CUÁNDO. Y ese cuándo es AHORA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/diagnostico" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition transform hover:scale-105 inline-flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Obtén tu Diagnóstico IA Gratis
                </Link>
                <Link href="/servicios/operaciones/precios" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition inline-flex items-center gap-2">
                  Cotizar mi Agente Personalizado
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación a otras páginas */}
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/marketing" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Marketing Digital</span>
            </Link>
            <Link href="/servicios/operaciones/precios" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-semibold">
              <span>Ver Planes de Agentes a Medida</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}