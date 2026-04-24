'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FaArrowRight,
  FaCheckCircle,
  FaHandshake,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaAward,
  FaBriefcase,
  FaCogs,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaStar
} from 'react-icons/fa';
import { IconType } from 'react-icons';

const reasonsConfig: { icon: IconType; color: string }[] = [
  { icon: FaRocket, color: 'text-blue-600' },
  { icon: FaLightbulb, color: 'text-purple-600' },
  { icon: FaChartLine, color: 'text-green-600' },
  { icon: FaUsers, color: 'text-orange-600' },
  { icon: FaGlobe, color: 'text-indigo-600' },
  { icon: FaAward, color: 'text-red-600' },
];

const partnerTypesConfig: { icon: IconType; color: string }[] = [
  { icon: FaBriefcase, color: 'text-blue-600' },
  { icon: FaCogs, color: 'text-purple-600' },
  { icon: FaUsers, color: 'text-green-600' },
  { icon: FaGlobe, color: 'text-orange-600' },
];

const benefitsConfig: { iconColor: string; bgColor: string }[] = [
  { iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  { iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  { iconColor: 'text-green-600', bgColor: 'bg-green-50' },
  { iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
  { iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { iconColor: 'text-red-600', bgColor: 'bg-red-50' },
];

const partnerLogos: { name: string; icon: IconType }[] = [
  { name: "TechSolutions NYC", icon: FaCogs },
  { name: "Brooklyn Chamber", icon: FaBuilding },
  { name: "Latino Business Hub", icon: FaUsers },
  { name: "Digital Innovators", icon: FaLightbulb },
  { name: "Queens Enterprise", icon: FaBriefcase },
  { name: "AI Partners Group", icon: FaRocket },
  { name: "NYC Growth Lab", icon: FaChartLine },
  { name: "Global Tech Alliance", icon: FaGlobe },
];

export default function Partners() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
          {/* Breadcrumb */}
          <div className="bg-white border-b">
              <div className="container mx-auto px-4 py-4">
                  <nav className="text-sm">
                      <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                          {t.partnersPage.breadcrumbInicio}
                      </Link>
                      <span className="mx-2 text-gray-400">/</span>
                      <span className="text-gray-900">{t.partnersPage.breadcrumbPartners}</span>
                  </nav>
              </div>

              {/* Hero Section */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
                  <div className="container mx-auto px-4 text-center">
                      <div className="flex justify-center mb-6">
                          <FaHandshake className="text-6xl animate-pulse" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-6">
                          {t.partnersPage.heroTitle}
                      </h1>
                      <p className="text-xl mb-8 max-w-3xl mx-auto">
                          {t.partnersPage.heroSubtitle}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                          <Link
                              href="/contacto"
                              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                          >
                              {t.partnersPage.convertirsePartner}
                              <FaArrowRight />
                          </Link>
                          <a
                              href="#beneficios"
                              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                          >
                              {t.partnersPage.verBeneficios}
                          </a>
                      </div>
                  </div>
              </section>

              {/* Por que ser Partner */}
              <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {t.partnersPage.porQueSerPartner}
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              {t.partnersPage.porQueSerPartnerDesc}
                          </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {t.partnersPage.reasons.map((reason, index) => {
                              const config = reasonsConfig[index];
                              const Icon = config.icon;
                              return (
                                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                      <Icon className={`text-4xl ${config.color} mb-4`} />
                                      <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                                      <p className="text-gray-600">{reason.description}</p>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </section>

              {/* Tipos de Alianzas */}
              <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {t.partnersPage.tiposAlianzas}
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              {t.partnersPage.tiposAlianzasDesc}
                          </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                          {t.partnersPage.partnerTypes.map((partnerType, index) => {
                              const config = partnerTypesConfig[index];
                              const Icon = config.icon;
                              return (
                                  <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                      <div className="flex items-center mb-4">
                                          <Icon className={`text-3xl ${config.color} mr-4`} />
                                          <h3 className="text-2xl font-bold">{partnerType.title}</h3>
                                      </div>
                                      <p className="text-gray-600 mb-4">{partnerType.description}</p>
                                      <ul className="space-y-3 mb-6">
                                          {partnerType.benefits.map((benefit, bIndex) => (
                                              <li key={bIndex} className="flex items-start gap-2">
                                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                  <span>{benefit}</span>
                                              </li>
                                          ))}
                                      </ul>
                                      <div className="text-sm text-gray-500">
                                          <strong>{partnerType.profileLabel}</strong> {partnerType.profile}
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </section>

              {/* Beneficios */}
              <section id="beneficios" className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {t.partnersPage.beneficiosTitulo}
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              {t.partnersPage.beneficiosSubtitulo}
                          </p>
                      </div>

                      <div className="max-w-5xl mx-auto">
                          <div className="grid md:grid-cols-2 gap-6">
                              {t.partnersPage.benefits.map((benefit, index) => {
                                  const config = benefitsConfig[index];
                                  return (
                                      <div key={index} className={`flex items-start gap-4 p-6 ${config.bgColor} rounded-lg hover:shadow-md transition-shadow`}>
                                          <FaCheckCircle className={`text-2xl ${config.iconColor} flex-shrink-0 mt-1`} />
                                          <div>
                                              <h3 className="font-bold mb-2">{benefit.title}</h3>
                                              <p className="text-gray-600">{benefit.description}</p>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  </div>
              </section>

              {/* Partners Actuales */}
              <section className="py-16 bg-gray-100">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {t.partnersPage.ecosistemaTitulo}
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              {t.partnersPage.ecosistemaSubtitulo}
                          </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                          {partnerLogos.map((partner, i) => (
                              <div
                                  key={i}
                                  className="bg-white rounded-lg p-8 flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow cursor-pointer group"
                              >
                                  <partner.icon className="text-3xl text-gray-400 mb-2 group-hover:text-blue-600 transition-colors" />
                                  <p className="text-sm text-center text-gray-600 group-hover:text-gray-900 transition-colors">
                                      {partner.name}
                                  </p>
                              </div>
                          ))}
                      </div>

                      <div className="mt-12 text-center">
                          <div className="flex justify-center items-center gap-4 mb-4">
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                          </div>
                          <p className="text-gray-600 mb-2">
                              {t.partnersPage.masDeLabel} <span className="font-bold text-2xl text-blue-600">25 {t.partnersPage.partnersActivos}</span>
                          </p>
                          <p className="text-gray-500">
                              {t.partnersPage.ecosistemaDesc}
                          </p>
                      </div>
                  </div>
              </section>

              {/* Proceso para ser Partner */}
              <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {t.partnersPage.procesoTitulo}
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              {t.partnersPage.procesoSubtitulo}
                          </p>
                      </div>

                      <div className="max-w-5xl mx-auto">
                          <div className="grid md:grid-cols-4 gap-8">
                              {t.partnersPage.processSteps.map((step, index) => (
                                  <div key={index} className="text-center group">
                                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                                          {index + 1}
                                      </div>
                                      <h3 className="font-bold mb-2">{step.title}</h3>
                                      <p className="text-sm text-gray-600">{step.description}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </section>

              {/* Contacto Directo */}
              <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto">
                          <div className="text-center mb-12">
                              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                  {t.partnersPage.listoTitulo}
                              </h2>
                              <p className="text-xl text-gray-600">
                                  {t.partnersPage.listoSubtitulo}
                              </p>
                          </div>

                          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                              <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-6">
                                      <h3 className="text-2xl font-bold mb-4">{t.partnersPage.infoContacto}</h3>

                                      <div className="flex items-start gap-4">
                                          <FaEnvelope className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">{t.partnersPage.emailPartnersLabel}</p>
                                              <a href={`mailto:${t.partnersPage.emailPartners}`} className="text-blue-600 hover:underline">
                                                  {t.partnersPage.emailPartners}
                                              </a>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaPhone className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">{t.partnersPage.telefonoDirecto}</p>
                                              <a href="tel:+13474509281" className="text-blue-600 hover:underline">
                                                  {t.partnersPage.telefono}
                                              </a>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaBuilding className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">{t.partnersPage.oficinaPrincipal}</p>
                                              <p className="text-gray-600">{t.partnersPage.oficinaCiudad}</p>
                                              <p className="text-gray-600">{t.partnersPage.oficinaPais}</p>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaGlobe className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">{t.partnersPage.horarioAtencion}</p>
                                              <p className="text-gray-600">{t.partnersPage.horarioDias}</p>
                                              <p className="text-gray-600">{t.partnersPage.horarioHoras}</p>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="space-y-6">
                                      <h3 className="text-2xl font-bold mb-4">{t.partnersPage.proximosPasos}</h3>

                                      <div className="bg-blue-50 rounded-lg p-6">
                                          <h4 className="font-semibold mb-3">{t.partnersPage.techTitle}</h4>
                                          <p className="text-gray-600 mb-4">
                                              {t.partnersPage.techDesc}
                                          </p>
                                          <Link
                                              href="/contacto"
                                              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                                          >
                                              {t.partnersPage.techCTA}
                                              <FaArrowRight />
                                          </Link>
                                      </div>

                                      <div className="bg-purple-50 rounded-lg p-6">
                                          <h4 className="font-semibold mb-3">{t.partnersPage.consultoresTitle}</h4>
                                          <p className="text-gray-600 mb-4">
                                              {t.partnersPage.consultoresDesc}
                                          </p>
                                          <Link
                                              href="/contacto"
                                              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
                                          >
                                              {t.partnersPage.consultoresCTA}
                                              <FaArrowRight />
                                          </Link>
                                      </div>
                                  </div>
                              </div>

                              <div className="mt-8 pt-8 border-t text-center">
                                  <p className="text-gray-600 mb-4">
                                      {t.partnersPage.prefieroConversacion}
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                      <a
                                          href="tel:+13474509281"
                                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                                      >
                                          <FaPhone />
                                          {t.partnersPage.llamarAhora}
                                      </a>

                                      <Link
                                          href="/contacto"
                                          className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                                      >
                                          <FaEnvelope />
                                          {t.partnersPage.enviarEmail}
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* CTA Final */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
                  <div className="container mx-auto px-4 text-center">
                      <h2 className="text-3xl font-bold mb-4">
                          {t.partnersPage.ctaFinalTitulo}
                      </h2>
                      <p className="text-xl mb-8 max-w-3xl mx-auto">
                          {t.partnersPage.ctaFinalSubtitulo}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                          <Link
                              href="/contacto"
                              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                          >
                              {t.partnersPage.agendaReunion}
                              <FaArrowRight />
                          </Link>
                          <a
                              href="tel:+13474509281"
                              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                          >
                              <FaPhone />
                              {t.partnersPage.hablarAsesor}
                          </a>
                      </div>
                  </div>
                  </section>
              </div>
          </div>
      );
    }
