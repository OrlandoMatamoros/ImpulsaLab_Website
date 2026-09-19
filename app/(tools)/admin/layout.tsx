'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Users,
  Menu,
  X,
  LogOut,
  Shield,
  MessageSquare,
  UserCog,
  FolderKanban,
  Contact
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { isAdminEmail } from '@/lib/admin-emails';

// `soloAdmin`: secciones con datos de clientes y de la operación. Solo las ve la
// cuenta de administración (ADMIN_EMAILS), nunca un rol 'consultant'.
const menuItems = [
  {
    title: 'Dashboard Chatbot',
    href: '/admin',
    icon: MessageSquare,
    soloAdmin: false,
  },
  {
    title: 'Proyectos',
    href: '/admin/proyectos',
    icon: FolderKanban,
    soloAdmin: true,
  },
  {
    title: 'CRM',
    href: '/admin/crm',
    icon: Contact,
    soloAdmin: true,
  },
  {
    title: 'Gestión de Usuarios',
    href: '/admin/users',
    icon: UserCog,
    soloAdmin: true,
  },
  {
    title: 'Lista Simple',
    href: '/admin/usuarios',
    icon: Users,
    soloAdmin: true,
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // En celular el menú arranca plegado (solo íconos): con 256px de barra lateral
  // no queda pantalla para la tabla del CRM.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }

      // Permitir admin Y consultant. El correo de la allowlist server-side
      // también vale como admin: el middleware deriva el rol igual (un usuario
      // sin custom claim quedaría fuera de su propio panel).
      const token = await firebaseUser.getIdTokenResult();
      const esAdminPorCorreo = isAdminEmail(firebaseUser.email);
      const rol = (token.claims.role as string) || (esAdminPorCorreo ? 'admin' : 'registered');
      if (rol !== 'admin' && rol !== 'consultant') {
        toast.error('No tienes permisos para acceder a esta sección');
        router.push('/dashboard');
        return;
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        role: rol,
        esAdmin: rol === 'admin' && esAdminPorCorreo
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      toast.success('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Determinar título según el rol
  const getRoleTitle = () => {
    if (user?.role === 'admin') return 'Panel Admin';
    if (user?.role === 'consultant') return 'Panel Consultor';
    return 'Panel';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } transition-all duration-300 bg-white border-r border-gray-200`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {sidebarOpen && (
              <Link href="/admin" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-[#00BCD4]" />
                <span className="text-xl font-bold text-gray-900">
                  {getRoleTitle()}
                </span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation - Filtrar items según el rol */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              // Las secciones con datos de clientes y de la operación son solo
              // para la cuenta de administración (un consultor no las ve).
              if (item.soloAdmin && !user?.esAdmin) {
                return null;
              }

              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#00BCD4]/10 text-[#002D62] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`${sidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5`} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                {sidebarOpen && (
                  <>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role === 'admin' ? 'Administrador' : 'Consultor'}
                    </p>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}


