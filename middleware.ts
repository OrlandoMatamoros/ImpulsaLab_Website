import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas protegidas que requieren autenticación
// IMPORTANTE: Solo estas rutas requieren auth. Todo lo demás pasa directo
// a Next.js para que sirva la página o un 404 real.
const protectedRoutes = [
  '/dashboard',
  '/consultant',
  '/admin',
  '/diagnostico-interno',
];

// Rutas de API protegidas
const protectedApiRoutes = [
  '/api/admin',
  '/api/consultant',
];

// Rutas y roles requeridos
const roleBasedRoutes: Record<string, string[]> = {
  '/dashboard': ['registered', 'client', 'consultant', 'admin', 'free', 'premium'],
  '/consultant': ['consultant', 'admin'],
  '/admin': ['admin', 'consultant'],
  '/api/admin': ['admin', 'consultant'],
  '/api/consultant': ['consultant', 'admin'],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Solo interceptar rutas protegidas. Todo lo demás pasa directo
  // a Next.js routing (que devolverá 404 real si la ruta no existe).
  const isProtectedPage = protectedRoutes.some(route => path.startsWith(route));
  const isProtectedApi = protectedApiRoutes.some(route => path.startsWith(route));

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Verificar autenticación para rutas protegidas
  const token = request.cookies.get('auth-token');

  if (!token) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar roles para rutas específicas
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (path.startsWith(route)) {
      try {
        const userRole = await getUserRoleFromToken(token.value);

        if (!allowedRoles.includes(userRole)) {
          if (isProtectedApi) {
            return NextResponse.json({ error: 'Sin permisos suficientes' }, { status: 403 });
          }
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      } catch (error) {
        console.error('Error verificando rol:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Función auxiliar para obtener el rol del token
async function getUserRoleFromToken(_token: string): Promise<string> {
  try {
    // TODO: Decodificar JWT o verificar con Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(_token);
    // return decodedToken.role || 'registered';
    return 'registered';
  } catch (error) {
    console.error('Error decodificando token:', error);
    return 'registered';
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
