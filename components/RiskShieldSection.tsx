'use client';

import React from 'react';

export default function RiskShieldSection() {
  // Data para la comparación
  const comparisons = [
    {
      aspect: "Modelo",
      generic: "Tips genéricos sin ejecución",
      impulsaLab: "Implementación llave en mano"
    },
    {
      aspect: "Responsabilidad",
      generic: 'Ninguna: "Suerte con eso"',
      impulsaLab: "KPIs acordados + Garantía de entrega"
    },
    {
      aspect: "Metodología",
      generic: "Opinión sin datos",
      impulsaLab: "Diagnóstico 3D + Hoja de Ruta clara"
    },
    {
      aspect: "Transparencia",
      generic: "Costos ocultos después",
      impulsaLab: "Precios claros desde el día 1"
    },
    {
      aspect: "Tecnología",
      generic: "Herramientas aleatorias",
      impulsaLab: "Arsenal IA probado y validado"
    },
    {
      aspect: "Resultado",
      generic: "Motivación momentánea",
      impulsaLab: "ROI medible y sostenible"
    }
  ];

  return (
    <section id="risk-shield" className="relative animate-fadeIn">
      {/* Banner Superior - ALTO CONTRASTE */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-cyan py-5 px-4 shadow-lg">
        <p className="text-center font-bold text-white text-lg md:text-xl">
          ¿Otro consejo gratis? 
          <span className="block md:inline md:ml-2 text-yellow-300 drop-shadow-md">
            Preferimos entregarte resultados medibles.
          </span>
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="py-16 px-4 max-w-6xl mx-auto bg-white">
        {/* Título y Subtítulo */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            De las buenas intenciones a los KPIs
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            En Impulsa Lab no te damos "tips"; implementamos sistemas que elevan 
            tu margen, automatizan tus procesos y potencian tu marca.
          </p>
        </div>

        {/* Tabla Comparativa - Desktop */}
        <div className="hidden md:block overflow-hidden rounded-xl shadow-xl border-2 border-gray-300">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                <th className="p-6 text-left font-bold text-white"></th>
                <th className="p-6 text-center font-bold text-gray-300">
                  Asesoría "Gratis"
                </th>
                <th className="p-6 text-center font-bold bg-gradient-to-r from-brand-navy to-brand-cyan text-white">
                  Impulsa Lab
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-cyan-50 transition-colors duration-200`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <td className="p-6 font-bold text-gray-900 border-r-2 border-gray-200">{item.aspect}</td>
                  <td className="p-6 text-center text-gray-600 font-medium border-r-2 border-gray-200">{item.generic}</td>
                  <td className="p-6 text-center bg-gradient-to-r from-cyan-50 to-brand-cyan/5">
                    <span className="text-green-600 font-bold text-xl mr-2">✓</span>
                    <span className="text-gray-900 font-bold">{item.impulsaLab}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Versión Móvil - Cards MEJORADAS */}
        <div className="md:hidden space-y-4">
          {comparisons.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-200"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <h3 className="font-bold text-xl text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                {item.aspect}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 bg-red-50 p-3 rounded-lg">
                  <span className="text-red-600 font-bold text-xl mt-0.5">✗</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700 mb-1">Asesoría "Gratis"</p>
                    <p className="text-gray-800 font-medium">{item.generic}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-green-50 p-3 rounded-lg">
                  <span className="text-green-600 font-bold text-xl mt-0.5">✓</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-brand-navy mb-1">Impulsa Lab</p>
                    <p className="text-gray-900 font-bold">{item.impulsaLab}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA adicional en la sección - NÚMERO ACTUALIZADO */}
        <div className="mt-12 text-center">
          <a 
            href="https://wa.me/19295007815?text=Quiero%20agendar%20mi%20Diagnóstico%203D"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-navy to-brand-cyan text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">Agenda tu Diagnóstico 3D Gratis</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Botón flotante eliminado - ahora usamos WidgetProvider unificado */}
    </section>
  );
}
