'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  Calendar,
  Clock,
  ExternalLink,
  Filter,
  Search,
  TrendingUp,
  Mail,
  X,
  ChevronRight,
  Sparkles,
  Building2,
  FileText,
  Shield,
  BookOpen,
  Trophy,
  BarChart3,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const NEWS_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23002D62'/><stop offset='100%25' stop-color='%2300BCD4'/></linearGradient></defs><rect width='800' height='450' fill='url(%23g)'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='system-ui,sans-serif' font-size='32' font-weight='700' opacity='0.85'>Impulsa Lab</text></svg>"

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

// Tipos de datos
export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  category: string
  source: string
  sourceUrl: string
  date: string
  readTime: number
  imageUrl: string
  tags: string[]
  isTrending?: boolean
  isFeatured?: boolean
}

// Icon config for categories (labels come from translations)
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'all': Sparkles,
  'business-ai': Building2,
  'product-launches': FileText,
  'success-stories': Trophy,
  'market-trends': BarChart3,
  'research': BookOpen,
  'regulations': Shield,
}

interface NoticiasInteractiveProps {
  initialNews: NewsItem[]
}

export default function NoticiasInteractive({ initialNews }: NoticiasInteractiveProps) {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle')
  const [newsletterError, setNewsletterError] = useState('')

  // Initial state hydrated from server-fetched data — Google sees the full grid in SSR HTML.
  const [newsData, setNewsData] = useState<NewsItem[]>(initialNews)

  // Categories and sort options from translations with icons from config
  const categories = t.herramientasNoticiasPage.categories.map((cat: { id: string; label: string }) => ({
    ...cat,
    icon: categoryIcons[cat.id] || Sparkles,
  }))

  const sortOptions = t.herramientasNoticiasPage.sortOptions

  // Optional client-side refresh: re-fetch every hour while the tab is open.
  // The server already provided fresh data on initial load (revalidate=3600).
  // This keeps long-lived sessions current without forcing a navigation.
  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch('/api/news/sync')
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setNewsData(data)
        }
      } catch (error) {
        console.error('Error refreshing news:', error)
      }
    }

    const interval = setInterval(refresh, 3600000) // 1h
    return () => clearInterval(interval)
  }, [])

  // Filtrar y ordenar noticias
  const filteredNews = useMemo(() => {
    let filtered = newsData

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Ordenar
    const sorted = [...filtered]
    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'relevance':
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case 'trending':
        sorted.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0))
        break
    }

    return sorted
  }, [selectedCategory, searchQuery, sortBy, newsData])

  // Noticias destacadas y en tendencia
  const featuredNews = newsData.filter(news => news.isFeatured)
  const trendingNews = newsData.filter(news => news.isTrending)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    setNewsletterError('')

    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'noticias-newsletter',
          locale: language,
          metadata: {
            selectedCategory,
            currentCategoryCount: String(filteredNews.length),
          },
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.status === 400 && data?.error === 'invalid_email') {
        setNewsletterStatus('error')
        setNewsletterError(t.herramientasNoticiasPage.newsletterErrorInvalido)
        return
      }

      if (!res.ok) {
        setNewsletterStatus('error')
        setNewsletterError(t.herramientasNoticiasPage.newsletterErrorGeneral)
        return
      }

      setNewsletterStatus('success')
      setEmail('')
      setTimeout(() => {
        setShowNewsletter(false)
        setNewsletterStatus('idle')
      }, 2200)
    } catch (err) {
      console.error('newsletter submit error:', err)
      setNewsletterStatus('error')
      setNewsletterError(t.herramientasNoticiasPage.newsletterErrorGeneral)
    }
  }

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag)
  }

  // Si no hay noticias (raro: el server fetch falló y devolvió [])
  if (newsData.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00BCD4] to-white">
              {t.herramientasNoticiasPage.titulo}
            </h1>
            <div className="mt-12 p-8 border border-white/10 rounded-xl">
              <h2 className="text-2xl mb-4">{t.herramientasNoticiasPage.tituloSinNoticias}</h2>
              <p className="text-gray-400">{t.herramientasNoticiasPage.descripcionSinNoticias}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .news-card {
          animation: fadeInUp 0.5s ease-out;
          animation-fill-mode: both;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002D62]/40 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00BCD4] to-white">
            {t.herramientasNoticiasPage.titulo}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            {t.herramientasNoticiasPage.subtitulo}
          </p>

          {/* Barra de búsqueda principal */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder={t.herramientasNoticiasPage.buscarPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all shadow-lg"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            {newsData.length} {t.herramientasNoticiasPage.noticiasDisponibles} • {t.herramientasNoticiasPage.actualizadoAutomaticamente}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon
                const count = category.id === 'all'
                  ? newsData.length
                  : newsData.filter(n => n.category === category.id).length

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#00BCD4] text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                    <span className="text-xs opacity-75">({count})</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Principal - Noticias */}
            <div className="lg:col-span-2">
              {/* Noticia Destacada (si existe) */}
              {featuredNews.length > 0 && filteredNews.includes(featuredNews[0]) && (
                <article className="mb-8 group cursor-pointer animate-fadeInUp">
                  <a
                    href={featuredNews[0].sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#002D62]/30 to-[#00BCD4]/10 border border-white/10 group"
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-[#00BCD4] text-white text-xs font-semibold rounded-full">
                        {t.herramientasNoticiasPage.destacado}
                      </span>
                    </div>

                    <img
                      src={featuredNews[0].imageUrl || NEWS_PLACEHOLDER}
                      alt={featuredNews[0].title}
                      onError={(e) => {
                        const img = e.currentTarget
                        if (img.src !== NEWS_PLACEHOLDER) img.src = NEWS_PLACEHOLDER
                      }}
                      className="w-full h-96 object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#00BCD4] text-sm font-medium">
                          {featuredNews[0].source}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(featuredNews[0].date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="text-3xl font-bold mb-3 transition-colors group-hover:text-[#00BCD4]">
                        {featuredNews[0].title}
                      </h2>

                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {featuredNews[0].summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {featuredNews[0].tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              onClick={(e) => {
                                e.preventDefault()
                                handleTagClick(tag)
                              }}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 text-[#00BCD4]">
                          <span className="text-sm font-medium">{t.herramientasNoticiasPage.leerMas}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              )}

              {/* Grid de Noticias - TODAS las noticias */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews
                  .filter(news => !news.isFeatured || news !== featuredNews[0])
                  .map((news) => (
                  <article
                    key={news.id}
                    className="group cursor-pointer news-card h-full"
                  >
                    <a
                      href={news.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-full flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={news.imageUrl || NEWS_PLACEHOLDER}
                          alt={news.title}
                          onError={(e) => {
                            const img = e.currentTarget
                            if (img.src !== NEWS_PLACEHOLDER) img.src = NEWS_PLACEHOLDER
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {news.isTrending && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {t.herramientasNoticiasPage.trending}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <span className="text-[#00BCD4] font-medium">{news.source}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">
                            {new Date(news.date).toLocaleDateString('es-ES')}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {news.readTime} min
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-[#00BCD4] line-clamp-2">
                          {news.title}
                        </h3>

                        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                          {news.summary}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {news.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleTagClick(tag)
                                }}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 cursor-pointer"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <ExternalLink className="w-4 h-4 text-[#00BCD4] opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">{t.herramientasNoticiasPage.noResultados}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#002D62]/40 to-[#00BCD4]/10 border border-white/10 rounded-xl p-6 mb-8 animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00BCD4] rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{t.herramientasNoticiasPage.newsletterTitulo}</h3>
                </div>

                <p className="text-gray-300 mb-4">
                  {t.herramientasNoticiasPage.newsletterDescripcion}
                </p>

                <button
                  onClick={() => setShowNewsletter(true)}
                  className="w-full py-3 bg-[#00BCD4] hover:bg-[#00BCD4]/80 rounded-lg font-medium transition-colors"
                >
                  {t.herramientasNoticiasPage.suscribirseGratis}
                </button>
              </div>

              {/* Trending Topics */}
              {trendingNews.length > 0 && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    {t.herramientasNoticiasPage.enTendencia}
                  </h3>

                  <div className="space-y-4">
                    {trendingNews.slice(0, 5).map((news, index) => (
                      <a
                        key={news.id}
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer block"
                      >
                        <div className="flex gap-3">
                          <span className="text-2xl font-bold text-gray-600">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-medium transition-colors group-hover:text-[#00BCD4] line-clamp-2">
                              {news.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {news.source} • {news.readTime} min
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags populares dinámicos */}
              <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-xl font-bold mb-4">{t.herramientasNoticiasPage.tagsPopulares}</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(newsData.flatMap(n => n.tags)))
                    .slice(0, 10)
                    .map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Modal Newsletter */}
      {showNewsletter && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowNewsletter(false)
            setNewsletterStatus('idle')
            setNewsletterError('')
          }}
        >
          <div
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{t.herramientasNoticiasPage.suscribirseAlNewsletter}</h3>
              <button
                onClick={() => {
                  setShowNewsletter(false)
                  setNewsletterStatus('idle')
                  setNewsletterError('')
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              {t.herramientasNoticiasPage.newsletterModalDesc}
            </p>

            {newsletterStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-4 rounded-lg bg-[#00BCD4]/15 border border-[#00BCD4]/40 text-[#00BCD4] text-sm text-center"
              >
                {t.herramientasNoticiasPage.newsletterExito}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={newsletterStatus === 'loading'}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] mb-4 disabled:opacity-60"
                />

                {newsletterStatus === 'error' && newsletterError && (
                  <p
                    role="alert"
                    className="text-sm text-red-400 mb-3"
                  >
                    {newsletterError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full py-3 bg-[#00BCD4] hover:bg-[#00BCD4]/80 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading'
                    ? t.herramientasNoticiasPage.suscribiendo
                    : t.herramientasNoticiasPage.suscribirse}
                </button>
              </form>
            )}

            <p className="text-xs text-gray-500 mt-4 text-center">
              {t.herramientasNoticiasPage.newsletterPrivacidad}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
