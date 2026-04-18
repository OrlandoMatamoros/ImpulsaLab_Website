// components/CookieBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      // Mostrar el banner después de un pequeño delay para mejor UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('cookies-date', new Date().toISOString());
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookies-accepted', 'false');
    localStorage.setItem('cookies-date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-2xl border-t border-gray-800 animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            🍪 Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. 
            <Link href="/legal/cookies" className="underline ml-1 hover:text-cyan-500">
              Más información
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Aceptar todas
          </button>
          <button 
            onClick={rejectCookies}
            className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Solo esenciales
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;