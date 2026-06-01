import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Blog slugs eliminados permanentemente — devuelven 410 Gone para limpiar GSC.
// 410 es preferible a 404 porque Google lo desindexará más rápido.
// Actualizado: 2026-04-28 (sesión SEO fix — slugs eran soft-404 en GSC)
const DELETED_BLOG_SLUGS = new Set([
  '/blog/marketing-digital-presupuesto-limitado',
  '/blog/automatizacion-procesos-restaurantes',
]);

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
  const host = request.headers.get('host') || '';

  // TASK-01: Canonicalizar non-www → www con 301 permanente.
  // https://tuimpulsalab.com/* → https://www.tuimpulsalab.com/*
  // Se excluye localhost para no romper desarrollo local.
  if (host === 'tuimpulsalab.com') {
    const wwwUrl = new URL(request.url);
    wwwUrl.host = 'www.tuimpulsalab.com';
    return NextResponse.redirect(wwwUrl, { status: 301 });
  }

  // Redirects 301 explícitos.
  // next.config.js redirects() genera 308 (permanent:true en Next.js 13+),
  // lo que GSC marca como "Error de redirección". Middleware emite 301 universal.
  if (path === '/legal') {
    const url = request.nextUrl.clone();
    url.pathname = '/legal/privacidad';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /partners → /casos-de-exito (slug legacy, renombrado 2026-05)
  if (path === '/partners') {
    const url = request.nextUrl.clone();
    url.pathname = '/casos-de-exito';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /noticias → /herramientas/noticias (ruta movida a sección herramientas)
  if (path === '/noticias') {
    const url = request.nextUrl.clone();
    url.pathname = '/herramientas/noticias';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /servicios/operaciones/precios → /servicios/operaciones#precios (sub-ruta nunca existió, fix GSC 404)
  if (path === '/servicios/operaciones/precios') {
    const url = request.nextUrl.clone();
    url.pathname = '/servicios/operaciones';
    url.hash = '#precios';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /recursos → /blog (sección renombrada, fix GSC 404)
  if (path === '/recursos') {
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    return NextResponse.redirect(url, { status: 301 });
  }

  // Slugs de blog eliminados: responder 410 Gone para que Google los desindexe.
  if (DELETED_BLOG_SLUGS.has(path)) {
    return new NextResponse(
      '<!DOCTYPE html><html><head><title>410 Gone</title></head><body><h1>410 Gone</h1><p>This page has been permanently removed.</p></body></html>',
      {
        status: 410,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      },
    );
  }

  // Solo interceptar rutas protegidas. Todo lo demás pasa directo
  // a Next.js routing (que devolverá 404 real si la ruta no existe).
  // OJO: matching por boundary de slash, NO prefix de string — para evitar que
  // /dashboards/* (assets estáticos plural) matchee la ruta protegida /dashboard.
  const matchesRoute = (route: string) => path === route || path.startsWith(route + '/');
  const isProtectedPage = protectedRoutes.some(matchesRoute);
  const isProtectedApi = protectedApiRoutes.some(matchesRoute);

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
