'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { isAdminEmail } from '@/lib/admin-emails'

interface HeaderAdminToolsProps {
  /** Mobile variant: renders block links with mobile styling instead of dropdown-item */
  mobile?: boolean
  onClose?: () => void
}

export default function HeaderAdminTools({ mobile = false, onClose }: HeaderAdminToolsProps) {
  const { user } = useAuth()
  const isAdmin = isAdminEmail(user?.email)

  if (!isAdmin) return null

  if (mobile) {
    return (
      <>
        <div className="border-t border-gray-100 mt-2 pt-2">
          <Link
            href="/herramientas/auditoria-web"
            className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm flex items-center gap-2"
            onClick={onClose}
          >
            Web Analyzer
            <span className="text-[10px] bg-cyan-700 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
              Admin
            </span>
          </Link>
          <Link
            href="/herramientas/facturacion"
            className="block text-gray-600 hover:text-brand-navy py-2 pl-4 text-sm flex items-center gap-2"
            onClick={onClose}
          >
            Invoicing
            <span className="text-[10px] bg-cyan-700 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
              Admin
            </span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }} />
      <Link
        href="/herramientas/auditoria-web"
        className="dropdown-item dropdown-item-audit flex items-center justify-between"
      >
        Web Analyzer
        <span className="text-[10px] bg-cyan-700 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ml-2">
          Admin
        </span>
      </Link>
      <Link
        href="/herramientas/facturacion"
        className="dropdown-item dropdown-item-invoice flex items-center justify-between"
      >
        Invoicing
        <span className="text-[10px] bg-cyan-700 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ml-2">
          Admin
        </span>
      </Link>
    </>
  )
}
