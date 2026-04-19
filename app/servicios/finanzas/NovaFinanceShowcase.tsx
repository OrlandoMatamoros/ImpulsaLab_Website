// app/servicios/finanzas/NovaFinanceShowcase.tsx
'use client';

import { ExternalLink, TrendingUp, Brain, Bell, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function NovaFinanceShowcase() {
  const { t } = useLanguage();
  const n = t.finanzasPage.novaFinance;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Badge de NUEVO */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <span className="animate-pulse mr-2">✨</span>
            {n.badge}
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {n.title}
          </h2>
          <p className="text-xl text-gray-600">
            {n.subtitle}
          </p>
        </div>

        {/* Live Demo Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-12 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-t-lg p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-sm">nova.tuimpulsalab.com</span>
            </div>
          </div>

          <a
            href="https://nova.tuimpulsalab.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={n.previewAriaLabel}
            className="group block aspect-video rounded-b-lg relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 hover:shadow-2xl transition-shadow"
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium mb-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {n.demoStatus}
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                nova.tuimpulsalab.com
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6 max-w-md">
                {n.previewDescription}
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold group-hover:scale-105 transition-transform shadow-xl">
                <Play className="w-4 h-4" />
                {n.previewCta}
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">{n.feature1Title}</h3>
            <p className="text-gray-600 text-sm">
              {n.feature1Desc}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">{n.feature2Title}</h3>
            <p className="text-gray-600 text-sm">{n.feature2Desc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">{n.feature3Title}</h3>
            <p className="text-gray-600 text-sm">{n.feature3Desc}</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <a
            href="https://nova.tuimpulsalab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            aria-label={n.mainCtaAriaLabel}
          >
            <Play className="mr-2" />
            {n.mainCta}
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>

          <p className="text-sm text-gray-600">
            {n.footerLine}
          </p>
        </div>
      </div>
    </section>
  );
}
