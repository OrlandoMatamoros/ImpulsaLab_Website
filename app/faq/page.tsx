'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaArrowRight,
  FaQuestionCircle,
  FaRobot,
  FaChartLine,
  FaCogs,
  FaBullhorn,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaShieldAlt
} from 'react-icons/fa';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
  'General': FaQuestionCircle,
  'Inteligencia Artificial': FaRobot,
  'Artificial Intelligence': FaRobot,
  'Servicios de Finanzas': FaChartLine,
  'Finance Services': FaChartLine,
  'Servicios de Operaciones': FaCogs,
  'Operations Services': FaCogs,
  'Servicios de Marketing': FaBullhorn,
  'Marketing Services': FaBullhorn,
  'Precios y Pagos': FaDollarSign,
  'Pricing & Payments': FaDollarSign,
  'Proceso y Tiempos': FaHandshake,
  'Process & Timelines': FaHandshake,
  'Soporte y Capacitacion': FaGraduationCap,
  'Soporte y Capacitación': FaGraduationCap,
  'Support & Training': FaGraduationCap,
  'Seguridad y Privacidad': FaShieldAlt,
  'Security & Privacy': FaShieldAlt,
};

export default function FAQ() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(t.faqPage.todos);
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQ[] = t.faqPage.faqs.map((faq, i) => ({ ...faq, id: i + 1 }));

  const categoryNames: Record<string, string> = {
    'General': t.faqPage.categoriaGeneral,
    'Inteligencia Artificial': t.faqPage.categoriaIA,
    'Artificial Intelligence': t.faqPage.categoriaIA,
    'Servicios de Finanzas': t.faqPage.categoriaFinanzas,
    'Finance Services': t.faqPage.categoriaFinanzas,
    'Servicios de Operaciones': t.faqPage.categoriaOperaciones,
    'Operations Services': t.faqPage.categoriaOperaciones,
    'Servicios de Marketing': t.faqPage.categoriaMarketing,
    'Marketing Services': t.faqPage.categoriaMarketing,
    'Precios y Pagos': t.faqPage.categoriaPrecios,
    'Pricing & Payments': t.faqPage.categoriaPrecios,
    'Proceso y Tiempos': t.faqPage.categoriaProceso,
    'Process & Timelines': t.faqPage.categoriaProceso,
    'Soporte y Capacitación': t.faqPage.categoriaSoporte,
    'Soporte y Capacitacion': t.faqPage.categoriaSoporte,
    'Support & Training': t.faqPage.categoriaSoporte,
    'Seguridad y Privacidad': t.faqPage.categoriaSeguridad,
    'Security & Privacy': t.faqPage.categoriaSeguridad,
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqs.map(f => f.category)));
    const allCategory = {
      name: t.faqPage.todos,
      icon: FaQuestionCircle,
      count: faqs.length,
    };
    const categoryList = uniqueCategories.map(cat => ({
      name: categoryNames[cat] || cat,
      rawCategory: cat,
      icon: categoryIcons[cat] || FaQuestionCircle,
      count: faqs.filter(f => f.category === cat).length,
    }));
    return [allCategory, ...categoryList];
  }, [faqs, t]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const translatedCategory = categoryNames[faq.category] || faq.category;
    const matchesCategory = selectedCategory === t.faqPage.todos || translatedCategory === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryName: string) => {
    return categoryIcons[categoryName] || FaQuestionCircle;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              {t.common.inicio}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{t.faqPage.breadcrumb}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <FaQuestionCircle className="text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.faqPage.titulo}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-50">
            {t.faqPage.subtitulo}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t.faqPage.buscarPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">{t.faqPage.categorias}</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category.name
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="text-lg" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.name
                            ? 'bg-white/20'
                            : 'bg-gray-200'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:w-3/4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t.faqPage.noResultados}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t.faqPage.noResultadosDesc}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(t.faqPage.todos);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {t.faqPage.limpiarBusqueda}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => {
                    const Icon = getCategoryIcon(faq.category);
                    const isOpen = openItems.includes(faq.id);

                    return (
                      <div
                        key={faq.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <Icon className="text-blue-600 text-lg" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {faq.question}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {categoryNames[faq.category] || faq.category}
                            </span>
                          </div>
                          <div className="flex-shrink-0 mt-1">
                            {isOpen ? (
                              <FaChevronUp className="text-gray-400" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pl-14 animate-fadeIn">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Results count */}
              {searchTerm && filteredFaqs.length > 0 && (
                <div className="mt-6 text-center text-gray-600">
                  {t.faqPage.mostrando} {filteredFaqs.length} {filteredFaqs.length !== 1 ? t.faqPage.resultados : t.faqPage.resultado}
                  {searchTerm && ` ${t.faqPage.para} "${searchTerm}"`}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.faqPage.noEncontraste}
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            {t.faqPage.noEncontrasteDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {t.faqPage.contactarExperto}
              <FaArrowRight />
            </Link>
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg"
            >
              {t.faqPage.solicitarDiagnostico}
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
