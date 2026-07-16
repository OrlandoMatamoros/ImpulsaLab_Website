import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyFirebaseIdToken } from './lib/firebase-jwt-verify';
import { isAdminEmail } from './lib/admin-emails';

// Blog slugs eliminados permanentemente — devuelven 410 Gone para limpiar GSC.
// 410 es preferible a 404 porque Google lo desindexará más rápido.
// Actualizado: 2026-06-01 (+2 slugs del lanzamiento inicial del blog que GSC
//   seguía marcando como 404 — la validación del 30-may falló por estos dos).
const DELETED_BLOG_SLUGS = new Set([
  '/blog/marketing-digital-presupuesto-limitado',
  '/blog/automatizacion-procesos-restaurantes',
  '/blog/transformacion-digital-paso-a-paso',
  '/blog/ia-transformacion-pymes-2025',
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

  // Verificar autenticación para rutas protegidas.
  // La cookie contiene el ID token de Firebase CRUDO (JWT firmado por Google).
  // Se verifica su firma/expiración/issuer/audience — un valor arbitrario o
  // falsificado NO pasa (antes bastaba con que la cookie existiera).
  const token = request.cookies.get('auth-token');
  const denyAuth = () =>
    isProtectedApi
      ? NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url));

  if (!token) {
    return denyAuth();
  }

  const claims = await verifyFirebaseIdToken(token.value);
  if (!claims) {
    // Token inválido, expirado o de otro proyecto → tratar como no autenticado.
    return denyAuth();
  }

  // El rol SIEMPRE se deriva del token ya verificado, NUNCA de la cookie:
  // custom claim `role` si el proyecto lo emite; si no, admin por email de la
  // allowlist server-side; en cualquier otro caso, 'registered'.
  const userRole = claims.role ?? (isAdminEmail(claims.email) ? 'admin' : 'registered');

  // Verificar roles para rutas específicas
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (path.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        if (isProtectedApi) {
          return NextResponse.json({ error: 'Sin permisos suficientes' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }

  return NextResponse.next();
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
