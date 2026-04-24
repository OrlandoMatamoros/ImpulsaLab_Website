'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

interface User {
  uid: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Obtener información del usuario desde los headers o localStorage
    const checkAuth = async () => {
      try {
        // Temporal: obtener del localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { href: '/dashboard', label: 'Inicio', roles: ['registered', 'client', 'consultant', 'admin'] },
      { href: '/dashboard/configuracion', label: 'Configuración', roles: ['registered', 'client', 'consultant', 'admin'] },
    ];

    const clientItems = [
      { href: '/dashboard/suscripciones', label: 'Suscripciones', roles: ['client', 'admin'] },
      { href: '/dashboard/facturas', label: 'Facturas', roles: ['client', 'admin'] },
    ];

    const consultantItems = [
      { href: '/consultant', label: 'Panel Consultor', roles: ['consultant', 'admin'] },
      { href: '/consultant/diagnosticos', label: 'Diagnósticos', roles: ['consultant', 'admin'] },
      { href: '/consultant/clientes', label: 'Mis Clientes', roles: ['consultant', 'admin'] },
    ];

    const adminItems = [
      { href: '/admin', label: 'Panel Admin', roles: ['admin'] },
      { href: '/admin/usuarios', label: 'Usuarios', roles: ['admin'] },
      { href: '/admin/analytics', label: 'Analytics', roles: ['admin'] },
    ];

    return [...baseItems, ...clientItems, ...consultantItems, ...adminItems]
      .filter(item => item.roles.includes(user?.role || ''));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Impulsa Lab
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {user?.role === 'admin' && '🛡️ Administrador'}
              {user?.role === 'consultant' && '📊 Consultor'}
              {user?.role === 'client' && '💼 Cliente'}
              {user?.role === 'registered' && '👤 Usuario'}
            </p>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">ID: {user?.uid?.slice(0, 8)}...</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {getNavItems().map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-purple-50 text-purple-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-8 py-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {pathname === '/dashboard' && 'Dashboard'}
              {pathname === '/dashboard/configuracion' && 'Configuración'}
              {pathname === '/dashboard/suscripciones' && 'Suscripciones'}
              {pathname === '/dashboard/facturas' && 'Facturas'}
              {pathname === '/consultant' && 'Panel de Consultor'}
              {pathname === '/admin' && 'Panel de Administración'}
            </h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
