'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  FaArrowRight,
  FaChartLine,
  FaRobot,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaPercentage,
  FaQuoteLeft,
  FaCheckCircle,
  FaIndustry,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLightbulb
} from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

// Non-translatable config: icons, emojis, IDs
const caseConfig = [
  {
    id: 1,
    logo: '🍽️',
    metricIcons: [FaChartLine, FaPercentage, FaUsers, FaClock],
  },
  {
    id: 2,
    logo: '💻',
    metricIcons: [FaDollarSign, FaChartLine, FaUsers, FaClock],
  },
  {
    id: 3,
    logo: '💆‍♀️',
    metricIcons: [FaMapMarkerAlt, FaDollarSign, FaPercentage, FaUsers],
  },
  {
    id: 4,
    logo: '⚖️',
    metricIcons: [FaIndustry, FaClock, FaChartLine, FaUsers],
  },
];

const industryIcons = ['🍽️', '💻', '💆‍♀️', '🛍️', '⚖️', '🏗️'];

export default function CasosDeExito() {
  const { t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState(0);

  const tp = t.casosExitoPage;

  // Merge translated case data with non-translatable config
  const casosDeEstudio = tp.casos.map((caso: any, i: number) => ({
    ...caso,
    id: caseConfig[i].id,
    logo: caseConfig[i].logo,
    resultados: {
      ...caso.resultados,
      metricas: caso.resultados.metricas.map((m: any, j: number) => ({
        ...m,
        icono: caseConfig[i].metricIcons[j],
      })),
    },
  }));

  const selectedCaseData = casosDeEstudio[selectedCase];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              {tp.breadcrumbInicio}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{tp.breadcrumbCasos}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaLightbulb className="text-yellow-300" />
            <span className="text-sm font-medium">{tp.heroTag}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {tp.heroTitle} <span className="text-yellow-300">{tp.heroTitleHighlight}</span> {tp.heroTitleEnd}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            {tp.heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">420%</span>
              <p>{tp.roiPromedio}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">2.5x</span>
              <p>{tp.aumentoVentas}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">30h</span>
              <p>{tp.horasLiberadas}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Casos */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{tp.seleccionaCaso}</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {casosDeEstudio.map((caso: any, index: number) => (
              <button
                key={caso.id}
                onClick={() => setSelectedCase(index)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedCase === index
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{caso.logo}</div>
                <h3 className="font-bold text-sm mb-1">{caso.empresa}</h3>
                <p className="text-xs text-gray-600">{caso.industria}</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-500">{caso.ubicacion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Caso de Estudio Detallado */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header del Caso */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-5xl mb-3">{selectedCaseData.logo}</div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCaseData.empresa}</h2>
                  <p className="text-gray-600 mt-2">{selectedCaseData.resumen}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-blue-600" />
                    <span>{selectedCaseData.industria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{selectedCaseData.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>{selectedCaseData.duracion}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* El Problema */}
            <div className="bg-red-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <span className="bg-red-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                {selectedCaseData.problema.titulo}
              </h3>
              <p className="text-gray-700 mb-6">{selectedCaseData.problema.descripcion}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedCaseData.problema.puntosDolor.map((dolor: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-red-500 mt-1">✗</div>
                    <p className="text-gray-700">{dolor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* La Solución */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                {selectedCaseData.solucion.titulo}
              </h3>
              <p className="text-gray-700 mb-6">{selectedCaseData.solucion.descripcion}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {selectedCaseData.solucion.implementaciones.map((impl: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRobot className="text-blue-600" />
                      <h4 className="font-bold text-blue-900">{impl.area}</h4>
                    </div>
                    <p className="text-sm text-gray-700">{impl.accion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Los Resultados */}
            <div className="bg-green-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="bg-green-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                {selectedCaseData.resultados.titulo}
              </h3>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {selectedCaseData.resultados.metricas.map((metrica: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center">
                    <metrica.icono className="text-3xl text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-900">{metrica.valor}</div>
                    <p className="text-sm text-gray-600 mt-1">{metrica.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6 text-center">
                <p className="text-3xl font-bold">{selectedCaseData.resultados.roi}</p>
              </div>
            </div>

            {/* Testimonio */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <FaQuoteLeft className="text-4xl text-purple-300 mb-4" />
              <blockquote className="text-lg text-gray-800 italic mb-4">
                &ldquo;{selectedCaseData.testimonio.texto}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-900">{selectedCaseData.testimonio.autor}</p>
                  <p className="text-sm text-gray-600">{selectedCaseData.testimonio.cargo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Agregadas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{tp.impactoTitle}</h2>
            <p className="text-xl text-gray-600 mb-12">
              {tp.impactoSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <FaDollarSign className="text-4xl text-blue-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">185%</div>
                <p className="text-gray-600">{tp.aumentoRentabilidad}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                <FaClock className="text-4xl text-green-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">32h</div>
                <p className="text-gray-600">{tp.horasLiberadasSemana}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <FaUsers className="text-4xl text-purple-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">2.3x</div>
                <p className="text-gray-600">{tp.crecimientoClientes}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Transformación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {tp.procesoTitle}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              {tp.procesoSubtitle}
            </p>
            <div className="space-y-4">
              {tp.procesoSteps.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{item.titulo}</h3>
                    <p className="text-gray-600 mb-2">{item.descripcion}</p>
                    <span className="text-sm text-blue-600 font-medium">{item.duracion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {tp.industriasTitle}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              {tp.industriasSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {tp.industrias.map((industria: any, index: number) => (
                <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="text-4xl mb-3">{industryIcons[index]}</div>
                  <h3 className="font-bold mb-1">{industria.nombre}</h3>
                  <p className="text-sm text-gray-600">{industria.casos}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {tp.ctaTitle}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            {tp.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {tp.ctaDiagnostico}
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              {tp.ctaAsesor}
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>{tp.sinCompromisos}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>{tp.resultadosGarantizados}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>{tp.roiMedible}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
