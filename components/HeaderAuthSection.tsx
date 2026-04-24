'use client'

// Dynamically imported by Header — keeps Firebase SDK out of the initial
// public-route bundle. On public routes FirebaseProviders is not mounted,
// so useAuth() returns the safe-null default (user: null, loading: false).
// The section renders the Login/Signup buttons in that case.
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAdminEmail } from '@/lib/admin-emails'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, LogOut, LayoutDashboard, Shield, UserCog, MessageSquare } from 'lucide-react'

export function HeaderAuthSection() {
  const { user, userData, signOut } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const userInitials = (() => {
    const name = userData?.name || user?.displayName || user?.email || ''
    if (name.includes('@')) return name[0].toUpperCase()
    const parts = name.trim().split(/\s+/)
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  })()

  const userDisplayName = userData?.name || user?.displayName || user?.email || ''
  const userPhotoURL = user?.photoURL || null
  const isAdmin = isAdminEmail(user?.email)

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

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
          className="text-cyan-700 font-medium"
        >
          <Shield className="mr-2 h-4 w-4" />
          {t.nav.panelAdmin}
        </DropdownMenuItem>
      )
    }

    return items
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1 2xl:gap-2 flex-shrink-0">
        <Link
          href="/login"
          className="px-2 2xl:px-3 py-1.5 text-sm font-medium text-brand-navy hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          {t.nav.iniciarSesion}
        </Link>
        <Link
          href="/signup"
          className="px-3 2xl:px-4 py-1.5 text-sm font-medium text-white bg-brand-navy rounded-lg hover:bg-brand-navy/90 transition-all whitespace-nowrap"
        >
          {t.nav.crearCuenta}
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative flex items-center gap-1.5 hover:bg-gray-100 px-1.5 flex-shrink-0 rounded-full" title={userDisplayName}>
          {userPhotoURL ? (
            <img
              src={userPhotoURL}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-navy/10"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold ring-2 ring-brand-navy/10">
              {userInitials}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userDisplayName}</p>
            {user.email && userData?.name && (
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            )}
            {userData?.role && (
              <span className="text-xs text-gray-400">
                {userData.role === 'admin' ? 'Administrador' :
                  userData.role === 'consultant' ? 'Consultor' :
                  userData.role === 'premium' ? 'Premium' :
                  userData.role === 'free' ? 'Free' : 'Usuario'}
              </span>
            )}
          </div>
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
  )
}

export function HeaderAuthSectionMobile({
  onClose
}: {
  onClose: () => void
}) {
  const { user, userData, signOut } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const userInitials = (() => {
    const name = userData?.name || user?.displayName || user?.email || ''
    if (name.includes('@')) return name[0].toUpperCase()
    const parts = name.trim().split(/\s+/)
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  })()

  const userDisplayName = userData?.name || user?.displayName || user?.email || ''
  const userPhotoURL = user?.photoURL || null

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (!user) {
    return (
      <div className="flex gap-3">
        <Link
          href="/login"
          className="flex-1 px-4 py-3 text-sm font-medium text-brand-navy border border-brand-navy/20 rounded-lg text-center hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          {t.nav.iniciarSesion}
        </Link>
        <Link
          href="/signup"
          className="flex-1 px-4 py-3 text-sm font-medium text-white bg-brand-navy rounded-lg text-center"
          onClick={onClose}
        >
          {t.nav.crearCuenta}
        </Link>
      </div>
    )
  }

  const renderMobileMenuItems = () => {
    const items = []

    if (!userData?.role || userData?.role === 'free' || userData?.role === 'premium') {
      items.push(
        <Link
          key="dashboard-mobile"
          href="/dashboard"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={onClose}
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
          onClick={onClose}
        >
          {t.nav.dashboardChatbot}
        </Link>
      )
      items.push(
        <Link
          key="consultant-mobile"
          href="/consultant"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
          onClick={onClose}
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
          onClick={onClose}
        >
          {t.nav.dashboardConsultor}
        </Link>
      )
      items.push(
        <div key="separator-mobile" className="border-t pt-2 mt-2">
          <Link
            href="/admin"
            className="block px-3 py-2 text-sm text-cyan-700 font-medium hover:bg-cyan-50 rounded"
            onClick={onClose}
          >
            {t.nav.panelAdmin}
          </Link>
        </div>
      )
    }

    return items
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-3 px-3 py-2">
        {userPhotoURL ? (
          <img
            src={userPhotoURL}
            alt=""
            className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-navy/10 flex-shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center text-sm font-bold ring-2 ring-brand-navy/10 flex-shrink-0">
            {userInitials}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{userDisplayName}</p>
          {userData?.role && (
            <span className="text-xs text-gray-500">
              {userData.role === 'admin' ? 'Admin' :
                userData.role === 'consultant' ? 'Consultor' :
                userData.role === 'premium' ? 'Premium' :
                userData.role === 'free' ? 'Free' : 'Usuario'}
            </span>
          )}
        </div>
      </div>
      {renderMobileMenuItems()}
      <button
        onClick={handleSignOut}
        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
      >
        {t.nav.cerrarSesion}
      </button>
    </div>
  )
}
