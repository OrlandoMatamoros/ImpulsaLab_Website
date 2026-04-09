// next.config.js - Configuración mejorada para Codespaces
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Redirects para SEO - evitar 404s en URLs antiguas o mal escritas
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/servicios/:path*',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/ayuda',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal/privacidad',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terminos',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/herramientas',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: '/herramientas/:path*',
        permanent: true,
      },
      {
        source: '/training',
        destination: '/capacitacion',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/carreras',
        permanent: true,
      },
      {
        source: '/diagnostic',
        destination: '/diagnostico',
        permanent: true,
      },
      // Junta Estrategica AI — relocated to /herramientas/agentes/junta-estrategica
      // (public marketing) with the private app at /app
      {
        source: '/herramientas/strategic-board',
        destination: '/herramientas/agentes/junta-estrategica',
        permanent: true,
      },
      {
        source: '/herramientas/strategic-board/:path*',
        destination: '/herramientas/agentes/junta-estrategica/app/:path*',
        permanent: true,
      },
    ];
  },

  // Configuración para manejar Firebase Auth en Codespaces
  async rewrites() {
    // Solo aplicar rewrites en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/__/auth/:path*',
          destination: 'https://impulsa-lab.firebaseapp.com/__/auth/:path*',
        },
        {
          source: '/identitytoolkit/:path*',
          destination: 'https://identitytoolkit.googleapis.com/:path*',
        },
      ];
    }
    return [];
  },
  
  // Headers de seguridad y CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Prevenir indexación de archivos estáticos y rutas técnicas
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/__/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  
  // Configuración de imágenes
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
  },
  
  // Variables de entorno que se exponen al cliente
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 
      (process.env.CODESPACES ? `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}` : 'http://localhost:3000'),
  },
  
  // Configuración de Webpack para mejor debugging
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
