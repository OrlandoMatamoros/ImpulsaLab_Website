'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaCheckCircle, FaLightbulb, FaRocket, FaHandshake, FaChartLine, FaBrain, FaUsers, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NosotrosPage() {
  const { t } = useLanguage();

  // Timeline data from translations
  const timeline = t.nosotrosPage.timeline;

  // Valores de la empresa - merge translated text with icons
  const valoresIcons = [
    <FaHandshake className="w-8 h-8" key="handshake" />,
    <FaBrain className="w-8 h-8" key="brain" />,
    <FaUsers className="w-8 h-8" key="users" />,
    <FaChartLine className="w-8 h-8" key="chart" />,
  ];
  const valores = t.nosotrosPage.valores.map((v, i) => ({ ...v, icon: valoresIcons[i] }));

  // Diferenciadores from translations
  const diferenciadores = t.nosotrosPage.diferenciadores;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              {t.common.inicio}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{t.nosotrosPage.breadcrumb}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.nosotrosPage.heroTitulo}
            </h1>
            <p className="text-xl mb-8">
              {t.nosotrosPage.heroSubtitulo}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">{t.nosotrosPage.fundada}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">{t.nosotrosPage.ubicacion}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">{t.nosotrosPage.bilingue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia y Propósito */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.nosotrosPage.nuestraHistoria}</h2>
              <p className="text-gray-600 text-lg">
                {t.nosotrosPage.historiaSubtitulo}
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                <span className="font-semibold text-2xl text-blue-600">{t.nosotrosPage.historiaP1}</span>{' '}
                {t.nosotrosPage.historiaP1Bold}
              </p>

              <p className="mb-6">
                {t.nosotrosPage.historiaP2}
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 my-8 text-xl italic text-gray-600">
                {t.nosotrosPage.historiaCita}
                <footer className="text-sm mt-2 not-italic">{`— ${t.nosotrosPage.historiaCitaAutor}`}</footer>
              </blockquote>

              <p className="mb-6">
                {t.nosotrosPage.historiaP3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t.nosotrosPage.nuestroCamino}
            </h2>

            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start mb-12 last:mb-0">
                  {/* Círculo */}
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-blue-600 rounded-full -translate-x-1/2"></div>

                  {/* Contenido */}
                  <div className="ml-20">
                    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="text-blue-600 font-bold text-sm">{item.year}</span>
                      <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Misión y Visión */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <FaRocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.nosotrosPage.nuestraMision}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {t.nosotrosPage.misionDesc}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <FaLightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.nosotrosPage.nuestraVision}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {t.nosotrosPage.visionDesc}
                </p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <h3 className="text-3xl font-bold text-center mb-12">{t.nosotrosPage.nuestrosValores}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valores.map((valor, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                      {valor.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{valor.title}</h4>
                    <p className="text-gray-600 text-sm">{valor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.nosotrosPage.porQueImpulsa}</h2>
              <p className="text-gray-600 text-lg">
                {t.nosotrosPage.porQueSubtitulo}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {diferenciadores.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                          {item.stat}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <FaAward className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-6">{t.nosotrosPage.compromisoTitulo}</h2>
              <p className="text-lg mb-8 leading-relaxed">
                {t.nosotrosPage.compromisoDesc}
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">{t.nosotrosPage.transparenciaTotal}</h4>
                  <p className="text-sm text-white/90">{t.nosotrosPage.transparenciaDesc}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">{t.nosotrosPage.resultadosGarantizados}</h4>
                  <p className="text-sm text-white/90">{t.nosotrosPage.resultadosDesc}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">{t.nosotrosPage.soporteContinuo}</h4>
                  <p className="text-sm text-white/90">{t.nosotrosPage.soporteDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto Social */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaGlobeAmericas className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.nosotrosPage.impactoComunidad}</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              {t.nosotrosPage.impactoDesc}
            </p>

            <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg">
              <div className="text-6xl md:text-7xl font-bold text-blue-600 mb-3">50+</div>
              <div className="text-lg text-gray-700 font-medium">{t.nosotrosPage.negociosTransformados}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.common.listoTransformar}
          </h2>
          <p className="text-xl mb-8">
            {t.nosotrosPage.uneteEmprendedores}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.common.solicitarConsultoria}
              <FaArrowRight />
            </Link>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              {t.common.diagnosticoGratuito}
              <FaCheckCircle />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
