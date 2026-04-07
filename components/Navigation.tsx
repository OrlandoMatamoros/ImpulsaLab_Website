'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Shield, 
  ChevronDown,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Target,
  Brain,
  Wrench,
  Newspaper,
  Bot,
  BookOpen
} from 'lucide-react'

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, userData, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Impulsa Lab
            </Link>
            
            <div className="hidden md:flex ml-10 items-center space-x-1">
              {/* Servicios Dropdown - MEJORADO */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center ${
                      pathname?.startsWith('/servicios') ? 'text-blue-600' : ''
                    }`}
                  >
                    Servicios
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <DropdownMenuLabel className="text-lg font-semibold">
                    Nuestros Servicios
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Finanzas Section - EXPANDIDO */}
                  <div className="py-2">
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal uppercase tracking-wider">
                      Inteligencia Financiera
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem 
                      onClick={() => router.push('/servicios/finanzas')}
                      className="py-3"
                    >
                      <TrendingUp className="h-5 w-5 mr-3 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium">Consultoría Financiera</div>
                        <div className="text-xs text-gray-500">Análisis y estrategia personalizada</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => window.open('https://nova.tuimpulsalab.com', '_blank')}
                      className="py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 my-1 group hover:from-purple-100 hover:to-blue-100 transition-all duration-300"
                    >
                      <div className="relative">
                        <Sparkles className="h-5 w-5 mr-3 text-purple-600 group-hover:animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Nova Finance
                          </span>
                          <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                            NUEVO
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">Dashboard IA en tiempo real</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-purple-600 opacity-50 group-hover:opacity-100" />
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Marketing Section */}
                  <div className="py-2">
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal uppercase tracking-wider">
                      Crecimiento Digital
                    </DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => router.push('/servicios/marketing')}
                      className="py-3"
                    >
                      <Target className="h-5 w-5 mr-3 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">Marketing con IA</div>
                        <div className="text-xs text-gray-500">Campañas que convierten</div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Operaciones Section */}
                  <div className="py-2">
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal uppercase tracking-wider">
                      Automatización
                    </DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => router.push('/servicios/operaciones')}
                      className="py-3"
                    >
                      <Brain className="h-5 w-5 mr-3 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-medium">Agentes de IA</div>
                        <div className="text-xs text-gray-500">Automatiza procesos complejos</div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Herramientas Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center ${
                      pathname?.startsWith('/herramientas') ? 'text-blue-600' : ''
                    }`}
                  >
                    Herramientas
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72">
                  <DropdownMenuLabel>Recursos y Herramientas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => router.push('/herramientas/arsenal')}>
                    <Wrench className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Arsenal Tecnológico</div>
                      <div className="text-xs text-gray-500">139 herramientas de IA</div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => router.push('/herramientas/agentes')}>
                    <Bot className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Agentes de IA</div>
                      <div className="text-xs text-gray-500">Catálogo de asistentes</div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => router.push('/herramientas/noticias')}>
                    <Newspaper className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Noticias IA</div>
                      <div className="text-xs text-gray-500">Últimas novedades</div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => router.push('/herramientas/prompt-designer')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Prompt Designer</div>
                      <div className="text-xs text-gray-500">Crea prompts efectivos</div>
                    </div>
                  </DropdownMenuItem>

                  {user?.email === 'orlando@tuimpulsalab.com' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.open('https://audit.tuimpulsalab.com', '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <div className="flex-1">
                          <div>Auditoría Web</div>
                          <div className="text-xs text-gray-500">Herramienta interna</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open('https://board.tuimpulsalab.com', '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <div className="flex-1">
                          <div>Strategic Board</div>
                          <div className="text-xs text-gray-500">Junta Estratégica AI</div>
                        </div>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Diagnóstico 3D Link */}
              <Link 
                href="/diagnostico" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/diagnostico' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Diagnóstico 3D
              </Link>

              {/* Blog Link */}
              <Link 
                href="/blog" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname?.startsWith('/blog')
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Blog
              </Link>

              {/* User specific links */}
              {user && (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === '/dashboard'
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Mis Diagnósticos
                  </Link>
                  {userData?.role === 'consultant' && (
                    <Link 
                      href="/consultant" 
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Panel Consultor
                    </Link>
                  )}
                  {userData?.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  {userData?.role === 'consultant' && (
                    <DropdownMenuItem onClick={() => router.push('/consultant')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Panel Consultor
                    </DropdownMenuItem>
                  )}
                  {userData?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => router.push('/admin')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Panel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  size="sm"
                  onClick={() => router.push('/signup')}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}