// next.config.js - Configuración mejorada para Codespaces
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
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
