'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid, List, Filter, ExternalLink, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { isAdminEmail } from '@/lib/admin-emails';
import PlatformLogo from '@/components/PlatformLogo';
import { TOOL_SLUGS } from '@/lib/tool-slugs';

function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const FREE_PLAN_KEY = 'impulsa_arsenal_count';

export default function ArsenalPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const arsenal = t.herramientasArsenalPage;

  const isUnlimited = isAdminEmail(user?.email);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [hasFreeAccess, setHasFreeAccess] = useState(true);

  useEffect(() => {
    if (isUnlimited) {
      setHasFreeAccess(true);
      return;
    }
    const count = parseInt(localStorage.getItem(FREE_PLAN_KEY) || '0', 10);
    if (count < 1) {
      setHasFreeAccess(true);
      localStorage.setItem(FREE_PLAN_KEY, String(count + 1));
    } else {
      setHasFreeAccess(false);
    }
  }, [isUnlimited]);

  const categories = ['todas', ...Array.from(new Set(tools.map(tool => tool.category)))];

  const filteredTools = useMemo(() => {
    let filtered = tools;

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - SIEMPRE VISIBLE */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Link
            href="/herramientas"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            {arsenal.volver}
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            {arsenal.titulo}
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            {arsenal.masDePrefix}{tools.length} {arsenal.subtitulo}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
            <span className="font-medium">{arsenal.accesoPremium}</span>
          </div>
        </div>
      </div>

      {/* Gate lead capture: usuario sin acceso libre */}
      {!hasFreeAccess && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl bg-gradient-to-br from-[#002D62] to-[#00BCD4] p-8 sm:p-10 text-white shadow-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {arsenal.gateTitle}
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-6 max-w-xl mx-auto">
              {arsenal.gateSubtitle}
            </p>
            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#002D62] font-semibold hover:brightness-95 transition-all text-sm sm:text-base"
            >
              {arsenal.gateCta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Búsqueda + filtros + grid: solo con acceso libre */}
      {hasFreeAccess && (
        <>
          {/* Barra de búsqueda */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={arsenal.buscarPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden" onClick={() => setShowFilters(false)}></div>

            <div className={`
              fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto
              sm:relative sm:inset-auto sm:bg-transparent sm:shadow-none sm:p-0 sm:max-h-none sm:overflow-visible
              ${showFilters ? 'translate-y-0' : 'translate-y-full'}
              sm:translate-y-0 transition-transform duration-300
            `}>
              <button
                onClick={() => setShowFilters(false)}
                className="absolute top-4 right-4 sm:hidden"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="sm:bg-white sm:rounded-2xl sm:shadow-xl sm:p-6 space-y-4">
                  <h3 className="font-semibold text-lg mb-4 sm:hidden">{arsenal.filtrosYVista}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {arsenal.categoria}
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat === 'todas' ? arsenal.todas.charAt(0).toUpperCase() + arsenal.todas.slice(1) : cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {arsenal.ordenarPor}
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="name">{arsenal.nombre}</option>
                        <option value="category">{arsenal.categoriaLabel}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {arsenal.vista}
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                            viewMode === 'grid'
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <Grid className="h-5 w-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                            viewMode === 'list'
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <List className="h-5 w-5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t sm:border-0 sm:pt-0">
                    <p className="text-sm text-gray-600">
                      {filteredTools.length} {arsenal.herramientas}
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('todas');
                        setShowFilters(false);
                      }}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      {arsenal.limpiarFiltros}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón flotante para mostrar filtros en móvil */}
          <button
            onClick={() => setShowFilters(true)}
            className="fixed bottom-4 right-4 sm:hidden bg-blue-500 text-white rounded-full p-3 shadow-lg z-30"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Lista de herramientas */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredTools.map((tool, index) => {
                  const ToolIcon = tool.logo;
                  const domain = extractDomain(tool.url);
                  const slug = TOOL_SLUGS[tool.name];
                  return (
                    <a
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 relative overflow-hidden cursor-pointer block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#002D62]/5 to-[#00BCD4]/5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-1.5 flex items-center justify-center"
                            style={{ color: tool.color }}
                          >
                            <PlatformLogo slug={slug} domain={domain} name={tool.name} fallback={ToolIcon} className="w-full h-full object-contain" />
                          </div>

                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>

                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                          {tool.name}
                        </h3>

                        <div className="mb-3 sm:mb-4">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#002D62]">
                            {tool.category}
                          </span>
                        </div>

                        <div className="block w-full text-center bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white py-1.5 sm:py-2 rounded-lg group-hover:brightness-110 transition-all font-medium text-sm sm:text-base">
                          {arsenal.acceder}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {arsenal.herramienta}
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        {arsenal.categoriaLabel}
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {arsenal.accion}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTools.map((tool, index) => {
                      const ToolIcon = tool.logo;
                      const domain = extractDomain(tool.url);
                      const slug = TOOL_SLUGS[tool.name];
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-1 flex items-center justify-center mr-3"
                                style={{ color: tool.color }}
                              >
                                <PlatformLogo slug={slug} domain={domain} name={tool.name} fallback={ToolIcon} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                                <div className="text-xs text-gray-500 sm:hidden">{tool.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {tool.category}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
