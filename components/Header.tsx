'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  UserCog,
  MessageSquare,
  ChevronDown
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMobileTools, setShowMobileTools] = useState(false)
  const [showMobileOperations, setShowMobileOperations] = useState(false)
  const [showMobileAcademy, setShowMobileAcademy] = useState(false)
  const { user, userData, signOut } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const handleLanguageToggle = () => setLanguage(language === 'ES' ? 'EN' : 'ES')

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const isAdmin = user?.email === 'orlando@tuimpulsalab.com'

  const toolsItems = [
    { name: t.nav.verTodas, href: '/herramientas', className: 'dropdown-item-all' },
    { name: t.nav.arsenalTec, href: '/herramientas/arsenal', className: 'dropdown-item-arsenal' },
    { name: t.nav.agentesIA, href: '/herramientas/agentes', className: 'dropdown-item-agentes' },
    { name: t.nav.promptDesigner, href: '/herramientas/prompt-designer', className: 'dropdown-item-prompt' },
    { name: t.nav.agenteNoticias, href: '/herramientas/noticias', className: 'dropdown-item-noticias' }
  ]

  const adminToolsItems = [
    { name: t.nav.auditoriaWeb, href: '/herramientas/auditoria-web', className: 'dropdown-item-nova', external: false },
    { name: t.nav.juntaEstrategica, href: '/herramientas/strategic-board', className: 'dropdown-item-nova', external: false },
    { name: t.nav.facturacion, href: '/herramientas/facturacion', className: 'dropdown-item-nova', external: false }
  ]

  const academyItems = [
    { name: t.nav.vistaGeneral, href: '/capacitacion', className: 'dropdown-item-all' },
    { name: t.nav.mentoria, href: '/capacitacion/mentoria-personalizada', className: 'dropdown-item-mentoria' },
    { name: t.nav.capacitacionCorporativa, href: '/capacitacion/equipos-empresariales', className: 'dropdown-item-corporate' }
  ]

  const renderMenuItems = () => {
    const items = []

    if (!userData?.role || userData?.role === 'free' || userData?.role === 'premium') {
      items.push(
        <DropdownMenuItem key="dashboard" onClick={() => router.push('/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          {t.nav.dashboard}
        </DropdownMenuItem>
      )
    }

    if (userData?.role === 'consultant') {
      items.push(
        <DropdownMenuItem key="chatbot" onClick={() => router.push('/admin')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {t.nav.dashboardChatbot}
        </DropdownMenuItem>
      )
      items.push(
        <DropdownMenuItem key="consultant" onClick={() => router.push('/consultant')}>
          <UserCog className="mr-2 h-4 w-4" />
          {t.nav.dashboardConsultor}
        </DropdownMenuItem>
      )
    }

    if (userData?.role === 'admin') {
      items.push(
        <DropdownMenuItem key="consultant-admin" onClick={() => router.push('/consultant')}>
          <UserCog className="mr-2 h-4 w-4" />
          {t.nav.dashboardConsultor}
        </DropdownMenuItem>
      )
      items.push(<DropdownMenuSeparator key="separator" />)
      items.push(
        <DropdownMenuItem
          key="admin-panel"
          onClick={() => router.push('/admin')}
          className="text-brand-cyan font-medium"
        >
          <Shield className="mr-2 h-4 w-4" />
          {t.nav.panelAdmin}
        </DropdownMenuItem>
      )
    }

    return items
  }

  const renderMobileMenuItems = () => {
    const items = []

    if (!userData?.role || userData?.role === 'free' || userData?.role === 'premium') {
      items.push(
        <Link
          key="dashboard-mobile"
          href="/dashboard"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          {t.nav.dashboard}
        </Link>
      )
    }

    if (userData?.role === 'consultant') {
      items.push(
        <Link
          key="chatbot-mobile"
          href="/admin"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          {t.nav.dashboardChatbot}
        </Link>
      )
      items.push(
        <Link
          key="consultant-mobile"
          href="/consultant"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          {t.nav.dashboardConsultor}
        </Link>
      )
    }

    if (userData?.role === 'admin') {
      items.push(
        <Link
          key="consultant-admin-mobile"
          href="/consultant"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          {t.nav.dashboardConsultor}
        </Link>
      )
      items.push(
        <div key="separator-mobile" className="border-t pt-2 mt-2">
          <Link
            href="/admin"
            className="block px-3 py-2 text-sm text-brand-cyan font-medium hover:bg-cyan-50 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.panelAdmin}
          </Link>
        </div>
      )
    }

    return items
  }

  return (
    <>
      <style jsx global>{`
        /* Fix para dropdown de usuario en fondos oscuros */
        [data-radix-popper-content-wrapper] {
          z-index: 100 !important;
        }

        [role="menu"] {
          background: white !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }

        [role="menuitem"] {
          color: #111827 !important;
        }

        [role="menuitem"]:hover {
          background: #f3f4f6 !important;
          color: #111827 !important;
        }

        [role="menuitem"] svg {
          color: #6b7280 !important;
        }

        [role="menuitem"]:hover svg {
          color: #111827 !important;
        }

        /* Dropdown Container */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 50;
          padding: 8px 0;
        }

        .nav-dropdown:hover .nav-dropdown-menu {
          opacity: 1;
          visibility: visible;
          margin-top: 6px;
        }

        .nav-dropdown-menu::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          width: 12px;
          height: 12px;
          background: white;
          transform: translateX(-50%) rotate(45deg);
          box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
        }

        .dropdown-item {
          display: block;
          padding: 10px 16px;
          color: #374151;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dropdown-item-all {
          font-weight: 600;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 4px;
          padding-bottom: 10px;
        }

        .dropdown-item-all:hover {
          background: #f9fafb;
          color: #111827;
        }

        .dropdown-item-arsenal:hover {
          background: #e0f7fa;
          color: #006064;
        }

        .dropdown-item-agentes:hover {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .dropdown-item-prompt:hover {
          background: #fed7aa;
          color: #ea580c;
        }

        .dropdown-item-noticias:hover {
          background: #1f2937;
          color: #ffffff;
        }

        .dropdown-item-nova {
          position: relative;
          overflow: hidden;
        }

        .dropdown-item-nova:hover {
          background: linear-gradient(135deg, #f3e8ff 0%, #e0f7fa 100%);
          color: #006064;
        }

        .dropdown-item-nova::after {
          content: '';
          position: absolute;
          right: 16px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .dropdown-item-mentoria:hover {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #065f46;
        }

        .dropdown-item-corporate:hover {
          background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
          color: #5b21b6;
        }

        /* Nav link styling */
        .nav-link {
          position: relative;
          color: #374151;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 4px;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #002D62;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #00BCD4;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-dropdown:hover .nav-link::after,
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-dropdown::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 10px;
        }
      `}</style>

      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
              <Image
                src={IMAGES.isotipo}
                alt={COMPANY_INFO.name}
                width={40}
                height={40}
                className="w-10 h-10 md:w-11 md:h-11 mr-2"
              />
              <div className="flex items-baseline">
                <span className="text-xl md:text-2xl font-bold text-brand-navy tracking-tight">
                  IMPULSA
                </span>
                <span className="text-xl md:text-2xl font-bold text-brand-cyan tracking-tight ml-1">
                  LAB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              <nav className="flex items-center gap-1 xl:gap-3">
                <Link href="/diagnostico" className="nav-link text-sm xl:text-base whitespace-nowrap">
                  {t.nav.diagnostico}
                </Link>

                {/* Herramientas dropdown */}
                <div className="nav-dropdown">
                  <Link href="/herramientas" className="nav-link text-sm xl:text-base flex items-center gap-1">
                    {t.nav.herramientas}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    {toolsItems.map((item) => (
                      <Link key={item.href} href={item.href} className={`dropdown-item ${item.className}`}>
                        {item.name}
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-200 my-1" />
                        {adminToolsItems.map((item) => (
                          <Link key={item.href} href={item.href} className={`dropdown-item ${item.className}`}>
                            {item.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Finanzas dropdown */}
                <div className="nav-dropdown">
                  <Link href="/servicios/finanzas" className="nav-link text-sm xl:text-base flex items-center gap-1">
                    {t.nav.finanzas}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    <Link href="/servicios/finanzas" className="dropdown-item dropdown-item-all">
                      {t.nav.consultoriaFinanciera}
                    </Link>
                    <Link href="https://nova.tuimpulsalab.com" target="_blank" rel="noopener noreferrer" className="dropdown-item dropdown-item-nova">
                      <span className="flex items-center justify-between">
                        <span>Nova Finance</span>
                        <span className="text-xs bg-gradient-to-r from-brand-navy to-brand-cyan text-white px-2 py-0.5 rounded-full font-bold">
                          NUEVO
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Operaciones dropdown */}
                <div className="nav-dropdown">
                  <Link href="/servicios/operaciones" className="nav-link text-sm xl:text-base flex items-center gap-1">
                    {t.nav.operaciones}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    <Link href="/servicios/operaciones" className="dropdown-item dropdown-item-all">{t.nav.vistaGeneral}</Link>
                    <Link href="/servicios/operaciones/agentes" className="dropdown-item dropdown-item-agentes">{t.nav.agente4IA}</Link>
                    <Link href="/servicios/operaciones/arsenal" className="dropdown-item dropdown-item-arsenal">{t.nav.arsenal5670}</Link>
                    <Link href="/servicios/operaciones/plataformas" className="dropdown-item dropdown-item-prompt">{t.nav.plataformas}</Link>
                    <Link href="/servicios/operaciones/precios" className="dropdown-item dropdown-item-nova">{t.nav.planesPrecios}</Link>
                  </div>
                </div>

                <Link href="/servicios/marketing" className="nav-link text-sm xl:text-base whitespace-nowrap">
                  {t.nav.marketing}
                </Link>

                {/* Academy dropdown */}
                <div className="nav-dropdown">
                  <Link href="/capacitacion" className="nav-link text-sm xl:text-base whitespace-nowrap flex items-center gap-1">
                    {t.nav.academy}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    {academyItems.map((item) => (
                      <Link key={item.href} href={item.href} className={`dropdown-item ${item.className}`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/#equipo" className="nav-link text-sm xl:text-base whitespace-nowrap">
                  {t.nav.nosotros}
                </Link>
                <Link href="/#contacto" className="nav-link text-sm xl:text-base whitespace-nowrap">
                  {t.nav.contacto}
                </Link>
              </nav>

              {/* Auth section - separated with divider */}
              <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
                <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                      language === 'EN'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('ES')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                      language === 'ES'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ES
                  </button>
                </div>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 border-brand-navy/20 hover:border-brand-cyan">
                        <User className="h-4 w-4" />
                        <span className="hidden xl:inline max-w-[120px] truncate">{userData?.name || user.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        {t.nav.miCuenta}
                        {userData?.role && (
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            ({userData.role === 'admin' ? 'Administrador' :
                              userData.role === 'consultant' ? 'Consultor' :
                              userData.role === 'premium' ? 'Premium' :
                              userData.role === 'free' ? 'Free' : 'Usuario'})
                          </span>
                        )}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {renderMenuItems()}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t.nav.cerrarSesion}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-3 py-1.5 text-sm font-medium text-brand-navy hover:text-brand-cyan transition-colors whitespace-nowrap"
                    >
                      {t.nav.iniciarSesion}
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-1.5 text-sm font-medium text-white bg-brand-navy rounded-lg hover:bg-brand-navy/90 transition-all whitespace-nowrap"
                    >
                      {t.nav.crearCuenta}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                    language === 'EN'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ES')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                    language === 'ES'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ES
                </button>
              </div>

              <button
                className="p-2 text-gray-700 hover:text-brand-navy transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="px-4 py-4 space-y-1">
              {/* Auth section móvil */}
              <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-gray-100">
                {user ? (
                  <div className="w-full space-y-2">
                    <div className="px-3 py-2 text-sm font-medium text-gray-900">
                      {userData?.name || user.email}
                      {userData?.role && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({userData.role === 'admin' ? 'Admin' :
                            userData.role === 'consultant' ? 'Consultor' :
                            userData.role === 'premium' ? 'Premium' :
                            userData.role === 'free' ? 'Free' : 'Usuario'})
                        </span>
                      )}
                    </div>
                    {renderMobileMenuItems()}
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      {t.nav.cerrarSesion}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="flex-1 px-4 py-3 text-sm font-medium text-brand-navy border border-brand-navy/20 rounded-lg text-center hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav.iniciarSesion}
                    </Link>
                    <Link
                      href="/signup"
                      className="flex-1 px-4 py-3 text-sm font-medium text-white bg-brand-navy rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav.crearCuenta}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/diagnostico"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.diagnostico}
              </Link>

              {/* Herramientas móvil */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-brand-navy py-3"
                  onClick={() => setShowMobileTools(!showMobileTools)}
                >
                  <span>{t.nav.herramientas}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileTools ? 'rotate-180' : ''}`} />
                </button>

                {showMobileTools && (
                  <div className="pl-4 space-y-1 mt-2">
                    {toolsItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm ${
                          index === 0 ? 'border-b border-gray-100 pb-3 mb-2 font-medium' : ''
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false)
                          setShowMobileTools(false)
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-200 my-2" />
                        {adminToolsItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm"
                            onClick={() => {
                              setIsMenuOpen(false)
                              setShowMobileTools(false)
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/servicios/finanzas"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.finanzas}
              </Link>

              {/* Operaciones móvil */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-brand-navy py-3"
                  onClick={() => setShowMobileOperations(!showMobileOperations)}
                >
                  <span>{t.nav.operaciones}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileOperations ? 'rotate-180' : ''}`} />
                </button>

                {showMobileOperations && (
                  <div className="pl-4 space-y-1 mt-2">
                    <Link href="/servicios/operaciones" className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm border-b border-gray-100 pb-3 mb-2 font-medium" onClick={() => { setIsMenuOpen(false); setShowMobileOperations(false) }}>
                      {t.nav.vistaGeneral}
                    </Link>
                    <Link href="/servicios/operaciones/agentes" className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm" onClick={() => { setIsMenuOpen(false); setShowMobileOperations(false) }}>
                      {t.nav.agente4IA}
                    </Link>
                    <Link href="/servicios/operaciones/arsenal" className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm" onClick={() => { setIsMenuOpen(false); setShowMobileOperations(false) }}>
                      {t.nav.arsenal5670}
                    </Link>
                    <Link href="/servicios/operaciones/plataformas" className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm" onClick={() => { setIsMenuOpen(false); setShowMobileOperations(false) }}>
                      {t.nav.plataformas}
                    </Link>
                    <Link href="/servicios/operaciones/precios" className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm" onClick={() => { setIsMenuOpen(false); setShowMobileOperations(false) }}>
                      {t.nav.planesPrecios}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/servicios/marketing"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.marketing}
              </Link>

              {/* Academy móvil */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-brand-navy py-3"
                  onClick={() => setShowMobileAcademy(!showMobileAcademy)}
                >
                  <span>{t.nav.academy}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileAcademy ? 'rotate-180' : ''}`} />
                </button>

                {showMobileAcademy && (
                  <div className="pl-4 space-y-1 mt-2">
                    {academyItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm ${
                          index === 0 ? 'border-b border-gray-100 pb-3 mb-2 font-medium' : ''
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false)
                          setShowMobileAcademy(false)
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/#equipo"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.nosotros}
              </Link>
              <Link
                href="/#contacto"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contacto}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
