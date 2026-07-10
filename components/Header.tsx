'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronDown } from 'lucide-react'
import MascotV15 from '@/components/MascotV15'

// Dynamically imported to keep Firebase SDK (~127 KB) out of the public bundle.
// These components import useAuth → FirebaseAuthContext → firebase/auth + firebase/firestore.
// On public routes (no FirebaseProviders) useAuth() returns safe-null defaults (user: null).
const HeaderAuthSection = dynamic(
  () => import('@/components/HeaderAuthSection').then((m) => m.HeaderAuthSection),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-1 2xl:gap-2 flex-shrink-0">
        <div className="w-20 h-8 bg-gray-100 rounded animate-pulse" />
        <div className="w-24 h-8 bg-gray-100 rounded animate-pulse" />
      </div>
    )
  }
)

const HeaderAuthSectionMobile = dynamic(
  () => import('@/components/HeaderAuthSection').then((m) => m.HeaderAuthSectionMobile),
  {
    ssr: false,
    loading: () => (
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gray-100 rounded-lg animate-pulse" />
        <div className="flex-1 h-12 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    )
  }
)

const HeaderAdminTools = dynamic(() => import('@/components/HeaderAdminTools'), { ssr: false })

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMobileTools, setShowMobileTools] = useState(false)
  const [showMobileAcademy, setShowMobileAcademy] = useState(false)
  const [showMobileServicios, setShowMobileServicios] = useState(false)

  const { language, setLanguage, t } = useLanguage()

  const toolsItems = [
    { name: t.nav.verTodas, href: '/herramientas', className: 'dropdown-item-all' },
    { name: t.nav.arsenalTec, href: '/herramientas/arsenal', className: 'dropdown-item-arsenal' },
    { name: t.nav.agentesIA, href: '/herramientas/agentes', className: 'dropdown-item-agentes' },
    { name: t.nav.juntaEstrategica, href: '/herramientas/agentes/junta-estrategica', className: 'dropdown-item-agentes' },
    { name: t.nav.promptDesigner, href: '/herramientas/prompt-designer', className: 'dropdown-item-prompt' },
    { name: t.nav.agenteNoticias, href: '/herramientas/noticias', className: 'dropdown-item-noticias' },
    { name: t.nav.planDeNegocios, href: '/herramientas/plan-de-negocios', className: 'dropdown-item-plan' }
  ]

  const academyItems = [
    { name: t.nav.vistaGeneral, href: '/capacitacion', className: 'dropdown-item-all' },
    { name: t.nav.mentoria, href: '/capacitacion/mentoria-personalizada', className: 'dropdown-item-mentoria' },
    { name: t.nav.capacitacionCorporativa, href: '/capacitacion/equipos-empresariales', className: 'dropdown-item-corporate' },
    { name: t.nav.planesPrecios, href: '/capacitacion#precios', className: 'dropdown-item-nova' }
  ]

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

        .dropdown-item-audit:hover {
          background: #ecfeff;
          color: #0e7490;
        }

        .dropdown-item-invoice:hover {
          background: #f0fdf4;
          color: #15803d;
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

        .dropdown-section-label {
          padding: 8px 16px 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          border-top: 1px solid #f3f4f6;
          margin-top: 4px;
        }

        .dropdown-section-label:first-of-type {
          border-top: none;
          margin-top: 0;
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
        <div className="container mx-auto px-4 2xl:px-6 py-3 max-w-[1600px]">
          <div className="flex justify-between items-center gap-2">
            {/* Logo: mascota V15 + isotipo + wordmark */}
            <Link href="/" prefetch={false} className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0" aria-label={COMPANY_INFO.name}>
              <MascotV15
                size={32}
                variant="default"
                expression="neutral"
                className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 mr-2"
                ariaLabel=""
              />
              <Image
                src={IMAGES.isotipo}
                alt=""
                width={40}
                height={40}
                priority
                className="w-9 h-9 md:w-10 md:h-10 2xl:w-11 2xl:h-11 mr-2"
                aria-hidden="true"
              />
              <div className="flex items-baseline">
                <span className="text-lg md:text-xl 2xl:text-2xl font-bold text-brand-navy tracking-tight">
                  IMPULSA
                </span>
                <span className="text-lg md:text-xl 2xl:text-2xl font-bold text-cyan-700 tracking-tight ml-1">
                  LAB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1 2xl:gap-4 min-w-0">
              <nav className="flex items-center gap-0.5 2xl:gap-2 min-w-0">
                <Link href="/diagnostico" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap">
                  {t.nav.diagnostico}
                </Link>

                {/* Herramientas dropdown */}
                <div className="nav-dropdown">
                  <Link href="/herramientas" prefetch={false} className="nav-link text-sm 2xl:text-base flex items-center gap-1 whitespace-nowrap">
                    {t.nav.herramientas}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    {toolsItems.map((item) => (
                      <Link key={item.href} href={item.href} prefetch={false} className={`dropdown-item ${item.className}`}>
                        {item.name}
                      </Link>
                    ))}
                    <HeaderAdminTools />
                  </div>
                </div>

                {/* Servicios dropdown — Vista General + 3 ejes */}
                <div className="nav-dropdown">
                  <Link href="/servicios" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap flex items-center gap-1">
                    {t.nav.servicios}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    <Link href="/servicios" prefetch={false} className="dropdown-item dropdown-item-all">
                      Vista general
                    </Link>
                    <Link href="/servicios/finanzas" prefetch={false} className="dropdown-item dropdown-item-nova">
                      Finanzas
                    </Link>
                    <Link href="/servicios/operaciones" prefetch={false} className="dropdown-item dropdown-item-agentes">
                      Operaciones
                    </Link>
                    <Link href="/servicios/marketing" prefetch={false} className="dropdown-item dropdown-item-prompt">
                      Marketing
                    </Link>
                  </div>
                </div>

                <Link href="/blog" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap">
                  Blog
                </Link>

                {/* Academy dropdown */}
                <div className="nav-dropdown">
                  <Link href="/capacitacion" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap flex items-center gap-1">
                    {t.nav.academy}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                  <div className="nav-dropdown-menu">
                    {academyItems.map((item) => (
                      <Link key={item.href} href={item.href} prefetch={false} className={`dropdown-item ${item.className}`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/#equipo" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap hidden 2xl:inline-block">
                  {t.nav.nosotros}
                </Link>
                <Link href="/#contacto" prefetch={false} className="nav-link text-sm 2xl:text-base whitespace-nowrap hidden 2xl:inline-block">
                  {t.nav.contacto}
                </Link>
              </nav>

              {/* Auth section - separated with divider */}
              <div className="flex items-center gap-1.5 2xl:gap-2 ml-1 2xl:ml-2 pl-2 2xl:pl-3 border-l border-gray-200 flex-shrink-0">
                <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                      language === 'EN'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('ES')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                      language === 'ES'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    ES
                  </button>
                </div>

                {/* Auth buttons/avatar — dynamically loaded to exclude Firebase from public bundle */}
                <HeaderAuthSection />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                    language === 'EN'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ES')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                    language === 'ES'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  ES
                </button>
              </div>

              <button
                className="p-2 text-gray-700 hover:text-brand-navy transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={isMenuOpen}
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
          <div className="xl:hidden bg-white border-t shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="px-4 py-4 space-y-1">
              {/* Auth section móvil — dynamically loaded */}
              <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-gray-100">
                <HeaderAuthSectionMobile onClose={() => setIsMenuOpen(false)} />
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
                  aria-label="Expandir sección Herramientas"
                  aria-expanded={showMobileTools}
                  aria-controls="mobile-panel-herramientas"
                >
                  <span>{t.nav.herramientas}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileTools ? 'rotate-180' : ''}`} />
                </button>

                {showMobileTools && (
                  <div id="mobile-panel-herramientas" className="pl-4 space-y-1 mt-2">
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
                    <HeaderAdminTools mobile onClose={() => { setIsMenuOpen(false); setShowMobileTools(false) }} />
                  </div>
                )}
              </div>

              {/* Servicios móvil — expandible */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-brand-navy py-3"
                  onClick={() => setShowMobileServicios(!showMobileServicios)}
                  aria-label="Expandir sección Servicios"
                  aria-expanded={showMobileServicios}
                  aria-controls="mobile-panel-servicios"
                >
                  <span>{t.nav.servicios}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileServicios ? 'rotate-180' : ''}`} />
                </button>

                {showMobileServicios && (
                  <div id="mobile-panel-servicios" className="pl-4 space-y-1 mt-2">
                    <Link
                      href="/servicios"
                      className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm border-b border-gray-100 pb-3 mb-2 font-medium"
                      onClick={() => { setIsMenuOpen(false); setShowMobileServicios(false) }}
                    >
                      Vista general
                    </Link>
                    <Link
                      href="/servicios/finanzas"
                      className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm"
                      onClick={() => { setIsMenuOpen(false); setShowMobileServicios(false) }}
                    >
                      Finanzas
                    </Link>
                    <Link
                      href="/servicios/operaciones"
                      className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm"
                      onClick={() => { setIsMenuOpen(false); setShowMobileServicios(false) }}
                    >
                      Operaciones
                    </Link>
                    <Link
                      href="/servicios/marketing"
                      className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm"
                      onClick={() => { setIsMenuOpen(false); setShowMobileServicios(false) }}
                    >
                      Marketing
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className="block text-gray-700 font-medium hover:text-brand-navy py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Academy móvil */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-brand-navy py-3"
                  onClick={() => setShowMobileAcademy(!showMobileAcademy)}
                  aria-label="Expandir sección Academy"
                  aria-expanded={showMobileAcademy}
                  aria-controls="mobile-panel-academy"
                >
                  <span>{t.nav.academy}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileAcademy ? 'rotate-180' : ''}`} />
                </button>

                {showMobileAcademy && (
                  <div id="mobile-panel-academy" className="pl-4 space-y-1 mt-2">
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
