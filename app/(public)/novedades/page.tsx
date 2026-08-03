'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  FaArrowRight,
  FaCodeBranch,
  FaGlobe,
  FaLayerGroup,
  FaRocket,
} from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

// Non-translatable config. El contenido del changelog vive en
// utils/translations/novedades.ts — ver las reglas de edicion en ese archivo.
type Producto = 'sitio' | 'somatt';
type Filtro = 'todo' | Producto;

const PRODUCTO_STYLE: Record<Producto, { badge: string; dot: string; icon: typeof FaGlobe }> = {
  sitio: {
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-brand-navy',
    icon: FaGlobe,
  },
  somatt: {
    badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    dot: 'bg-brand-cyan',
    icon: FaRocket,
  },
};

export default function Novedades() {
  const { t } = useLanguage();
  const [filtro, setFiltro] = useState<Filtro>('todo');

  const tp = t.novedadesPage;

  const etiquetas: Record<Producto, string> = {
    sitio: tp.etiquetaSitio,
    somatt: tp.etiquetaSomatt,
  };

  // Meses con sus entradas ya filtradas. Un mes sin entradas visibles no se pinta.
  const mesesVisibles = useMemo(
    () =>
      (tp.meses as any[])
        .map((mes: any) => ({
          ...mes,
          entradas: mes.entradas.filter(
            (e: any) => filtro === 'todo' || e.producto === filtro
          ),
        }))
        .filter((mes: any) => mes.entradas.length > 0),
    [tp.meses, filtro]
  );

  const filtros: { id: Filtro; label: string }[] = [
    { id: 'todo', label: tp.filtroTodo },
    { id: 'sitio', label: tp.filtroSitio },
    { id: 'somatt', label: tp.filtroSomatt },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              {tp.breadcrumbInicio}
            </Link>
            <span className="mx-2 text-gray-500" aria-hidden="true">/</span>
            <span className="text-gray-900 font-medium">{tp.breadcrumbNovedades}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaCodeBranch className="text-yellow-300" />
            <span className="text-sm font-medium">{tp.heroTag}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {tp.heroTitle} <span className="text-yellow-300">{tp.heroTitleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-blue-100">
            {tp.heroSubtitle}
          </p>
          <p className="text-sm text-blue-200 max-w-2xl mx-auto">
            {tp.heroNota}
          </p>
        </div>
      </section>

      {/* Leyenda + filtro */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="sr-only">{tp.leyendaTitulo}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                <FaGlobe className="text-brand-navy mt-1 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-700">{tp.leyendaSitio}</p>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                <FaRocket className="text-cyan-700 mt-1 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-700">{tp.leyendaSomatt}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaLayerGroup className="text-gray-600" aria-hidden="true" />
                {tp.filtroLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {filtros.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFiltro(f.id)}
                    aria-pressed={filtro === f.id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      filtro === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {mesesVisibles.length === 0 && (
              <p className="text-center text-gray-700">{tp.sinResultados}</p>
            )}

            {mesesVisibles.map((mes: any) => (
              <div key={mes.id} className="mb-12 last:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  {mes.nombre}
                </h2>

                <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                  {mes.entradas.map((entrada: any, index: number) => {
                    const producto = entrada.producto as Producto;
                    const style = PRODUCTO_STYLE[producto];
                    const Icono = style.icon;

                    return (
                      <li key={`${mes.id}-${index}`} className="ml-6">
                        {/* top:auto => usa la posicion estatica dentro del <li>,
                            asi cada punto queda a la altura de su tarjeta. */}
                        <span
                          className={`absolute -left-[9px] mt-6 block h-4 w-4 rounded-full ring-4 ring-gray-50 ${style.dot}`}
                          aria-hidden="true"
                        />
                        <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <time className="text-sm font-semibold text-gray-700">
                              {entrada.fecha}
                            </time>
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${style.badge}`}
                            >
                              <Icono className="text-[0.7rem]" aria-hidden="true" />
                              {etiquetas[producto]}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {entrada.titulo}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">{entrada.detalle}</p>
                        </article>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-navy to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{tp.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">{tp.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {tp.ctaDiagnostico}
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              {tp.ctaContacto}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
