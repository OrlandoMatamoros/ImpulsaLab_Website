'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'

// Iconos existentes
const HubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    {/* Nodo central */}
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    
    {/* Conexiones lado izquierdo - azul oscuro */}
    <g className="text-[#002D62]">
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <path d="M7 12h2" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      <path d="M9 9l-1.5-1.5" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="6" cy="18" r="2" fill="currentColor" />
      <path d="M9 15l-1.5 1.5" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 7v2" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      <path d="M12 17v-2" stroke="currentColor" strokeWidth="2" />
    </g>
    
    {/* Conexiones lado derecho - azul eléctrico */}
    <g className="text-blue-500">
      <path d="M15 12h3l1 1v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="15" r="1" fill="currentColor" />
      
      <path d="M15 10h2l1-1v-2l1-1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      
      <path d="M15 14h2v3l1 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      
      <path d="M14 9l2-2h2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="7" r="0.5" fill="currentColor" />
      
      <path d="M14 15l1 2h2l1 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="16" r="0.5" fill="currentColor" />
    </g>
  </svg>
);

const ToolsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M11 6h6M11 10h6M11 14h6M11 18h6"/>
  </svg>
);

const PromptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
    <path d="M5 12l7-7 7 7"/>
  </svg>
);

export default function HeroSection() {
  return (
    <section className="bg-brand-navy text-white pt-24 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col justify-center h-full">
            {/* Badge animado */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                +50 Empresas Transformadas
              </span>
            </div>

            {/* Título principal - más grande */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              El Crecimiento de tu Negocio, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-cyan-300"> Impulsado por IA.</span>
            </h1>
            
            {/* Subtítulo - ajustado */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 leading-relaxed">
              Deja de ahogarte en el día a día. Te entregamos las herramientas 
              de IA y la estrategia que necesitas para liberar tu tiempo, 
              aumentar tu rentabilidad y tomar decisiones con total confianza.
            </p>

            {/* CTAs mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href={LINKS.calendly}
                target="_blank"
                className="inline-flex items-center justify-center bg-white text-brand-navy px-8 py-4 rounded-lg 
                         font-semibold text-lg transition-all duration-300 
                         hover:scale-105 hover:bg-gray-100 hover:shadow-xl group"
              >
                Obtén tu Diagnóstico 3D Gratis
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="#risk-shield"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white 
                         px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 
                         hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                Nuestro Valor
              </Link>
            </div>

            {/* Métricas de impacto */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">20+</div>
                <div className="text-sm md:text-base text-gray-300">Horas ahorradas por semana</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">3X</div>
                <div className="text-sm md:text-base text-gray-300">Aumento en productividad</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                <div className="text-sm md:text-base text-gray-300">Soporte en español</div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA - HUB DE HERRAMIENTAS */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl space-y-6">
              
              {/* HUB DE HERRAMIENTAS IA */}
              <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl"></div>
                
                <div className="relative">
                  {/* HEADER */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <HubIcon className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                    </div>
                    <Link 
                      href="/herramientas"
                      className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-navy group-hover:text-brand-cyan transition-colors">
                        Hub de Herramientas IA
                      </h3>
                      <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-brand-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-3">
                      Tu arsenal completo para dominar la IA en tu negocio
                    </p>
                  </div>

                  {/* GRID DE AGENTES */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                    
                    {/* ARSENAL TECNOLÓGICO */}
                    <Link 
                      href="/herramientas/arsenal"
                      className="group relative bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-blue-500 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-2 right-2 bg-white text-blue-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Gratis
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <ToolsIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Arsenal</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          <span className="font-bold text-white">100+ herramientas</span> con buscador inteligente
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Ahorra 20+ horas semanales
                        </p>
                      </div>
                    </Link>

                    {/* AGENTE UNIFICADOR */}
                    <Link 
                      href="/herramientas/agentes"
                      className="group relative bg-gradient-to-br from-purple-600 to-purple-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-purple-500 hover:border-purple-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-2 right-2 bg-white text-purple-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Popular
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <AIIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Agentes IA</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          4 Agentes especializados trabajando para ti
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          ChatGPT, Claude, Gemini y Perplexity
                        </p>
                      </div>
                    </Link>

                    {/* NOTICIAS IA */}
                    <Link 
                      href="/herramientas/noticias"
                      className="group relative bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-emerald-500 hover:border-emerald-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-2 right-2 bg-white text-emerald-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Actualizado
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <NewsIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Noticias</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          IA aplicada a negocios reales
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Mantente a la vanguardia
                        </p>
                      </div>
                    </Link>

                    {/* ESTRUCTURADOR PROMPTS */}
                    <Link 
                      href="/herramientas/prompt-designer"
                      className="group relative bg-gradient-to-br from-orange-600 to-red-600 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-orange-500 hover:border-orange-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-2 right-2 bg-white text-orange-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Pro
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <PromptIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Prompt Designer</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          Resultados 10x mejores
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Domina el arte del prompting
                        </p>
                      </div>
                    </Link>

                  </div>

                  {/* CTA PRINCIPAL */}
                  <div className="mt-8 text-center">
                    <Link 
                      href="/herramientas"
                      className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-brand-navy via-brand-cyan to-brand-navy rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-cyan/30 animate-gradient bg-[length:200%_auto] group"
                    >
                      <ToolsIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Explorar Todas las Herramientas
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  {/* TEXTO DE CIERRE */}
                  <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
                    Sin tarjeta de crédito • Acceso inmediato • Soporte en español
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ESTILOS PARA ANIMACIONES */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}