'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaUserCog,
  FaDatabase,
  FaGlobe,
  FaArrowRight,
  FaClock,
  FaBalanceScale
} from 'react-icons/fa';
import { useState } from 'react';
import { IconType } from 'react-icons';

export default function ProteccionDatos() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('politica');

  const sectionIcons: { [key: string]: IconType } = {
    politica: FaFileContract,
    derechos: FaUserShield,
    procedimientos: FaUserCog,
    contacto: FaEnvelope,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              {t.datosPage.breadcrumbInicio}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/legal" className="text-gray-500 hover:text-gray-700 transition-colors">
              {t.datosPage.breadcrumbLegal}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{t.datosPage.breadcrumbDatos}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <FaShieldAlt className="text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.datosPage.heroTitle}
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              {t.datosPage.heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaClock className="inline mr-2" />
                {t.datosPage.lastUpdated}
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaBalanceScale className="inline mr-2" />
                {t.datosPage.gdprCompliant}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {t.datosPage.tabs.map((tab: { id: string; label: string }) => {
              const Icon = sectionIcons[tab.id] || FaFileContract;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeSection === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="text-lg" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Privacy Policy */}
            {activeSection === 'politica' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    {t.datosPage.privacyTitle}
                  </h2>

                  <div className="space-y-6 text-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaDatabase className="text-blue-600" />
                        {t.datosPage.infoCollectTitle}
                      </h3>
                      <p className="mb-3">
                        {t.datosPage.infoCollectText}
                      </p>
                      <ul className="space-y-2 ml-4">
                        {t.datosPage.infoCollectItems.map((item: { bold: string; text: string }, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span><strong>{item.bold}</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaLock className="text-blue-600" />
                        {t.datosPage.howWeUseTitle}
                      </h3>
                      <p className="mb-3">
                        {t.datosPage.howWeUseText}
                      </p>
                      <ul className="space-y-2 ml-4">
                        {t.datosPage.howWeUseItems.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaGlobe className="text-blue-600" />
                        {t.datosPage.sharingTitle}
                      </h3>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                        <p className="font-semibold mb-2">
                          <FaExclamationTriangle className="inline text-blue-600 mr-2" />
                          {t.datosPage.sharingWarning}
                        </p>
                        <p>
                          {t.datosPage.sharingText}
                        </p>
                        <ul className="mt-2 space-y-1 ml-4">
                          {t.datosPage.sharingItems.map((item: string, i: number) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        {t.datosPage.securityTitle}
                      </h3>
                      <p>
                        {t.datosPage.securityText}
                      </p>
                      <ul className="mt-3 space-y-2 ml-4">
                        {t.datosPage.securityItems.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        {t.datosPage.mobileTitle}
                      </h3>
                      <p>
                        {t.datosPage.mobileText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GDPR Rights */}
            {activeSection === 'derechos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    {t.datosPage.gdprTitle}
                  </h2>

                  <p className="text-lg text-gray-700 mb-8">
                    {t.datosPage.gdprIntro}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserShield className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightAccess}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightAccessDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserCog className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightRectification}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightRectificationDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaDatabase className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightErasure}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightErasureDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaLock className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightRestriction}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightRestrictionDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaGlobe className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightPortability}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightPortabilityDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaExclamationTriangle className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{t.datosPage.rightObject}</h3>
                          <p className="text-gray-700">
                            {t.datosPage.rightObjectDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <FaBalanceScale className="text-yellow-600" />
                      {t.datosPage.responseTimeTitle}
                    </h3>
                    <p className="text-gray-700">
                      {t.datosPage.responseTimeText} <strong>{t.datosPage.responseTimeBold}</strong>{t.datosPage.responseTimeText2}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Procedures */}
            {activeSection === 'procedimientos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    {t.datosPage.proceduresTitle}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        {t.datosPage.howToExerciseTitle}
                      </h3>
                      <p className="text-gray-700 mb-6">
                        {t.datosPage.howToExerciseText}
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{t.datosPage.step1Title}</h4>
                              <p className="text-gray-700">
                                {t.datosPage.step1Text}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{t.datosPage.step2Title}</h4>
                              <p className="text-gray-700 mb-3">
                                {t.datosPage.step2Text}
                              </p>
                              <ul className="space-y-1 ml-4 text-gray-600">
                                {t.datosPage.step2Items.map((item: string, i: number) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              3
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{t.datosPage.step3Title}</h4>
                              <p className="text-gray-700 mb-3">
                                {t.datosPage.step3Text}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FaEnvelope className="text-blue-600" />
                                  <span>{t.datosPage.step3Email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaPhone className="text-blue-600" />
                                  <span>{t.datosPage.step3Phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              4
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{t.datosPage.step4Title}</h4>
                              <p className="text-gray-700">
                                {t.datosPage.step4Text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaFileContract className="text-blue-600" />
                        {t.datosPage.formsTitle}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {t.datosPage.formsText}
                      </p>
                      <div className="space-y-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          {t.datosPage.formAccess}
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          {t.datosPage.formDeletion}
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          {t.datosPage.formPortability}
                        </button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-600" />
                        {t.datosPage.importantTitle}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {t.datosPage.importantItems.map((item: string, i: number) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DPO Contact */}
            {activeSection === 'contacto' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    {t.datosPage.dpoTitle}
                  </h2>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 mb-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-4">
                        <FaUserShield className="text-4xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{t.datosPage.dpoName}</h3>
                      <p className="text-gray-600">{t.datosPage.dpoRole}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaEnvelope className="text-blue-600 text-xl" />
                          <span className="font-semibold">{t.datosPage.directEmail}</span>
                        </div>
                        <a href="mailto:privacidad@tuimpulsalab.com" className="text-blue-600 hover:text-blue-800">
                          privacidad@tuimpulsalab.com
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaPhone className="text-blue-600 text-xl" />
                          <span className="font-semibold">{t.datosPage.phone}</span>
                        </div>
                        <a href="tel:+19295001850" className="text-blue-600 hover:text-blue-800">
                          +1 929 500 1850
                        </a>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaGlobe className="text-blue-600 text-xl" />
                        <span className="font-semibold">{t.datosPage.mailingAddress}</span>
                      </div>
                      <address className="not-italic text-gray-700 whitespace-pre-line">
                        {t.datosPage.mailingAddressText}
                      </address>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{t.datosPage.whenContactTitle}</h3>
                      <p className="text-gray-700 mb-4">
                        {t.datosPage.whenContactText}
                      </p>
                      <ul className="space-y-2">
                        {t.datosPage.whenContactItems.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">{t.datosPage.officeHoursTitle}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">{t.datosPage.officeHoursDays}</p>
                          <p className="text-gray-600">{t.datosPage.officeHoursTime}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">{t.datosPage.emailResponseLabel}</p>
                          <p className="text-gray-600">{t.datosPage.emailResponseTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-2">{t.datosPage.commitmentTitle}</h3>
                      <p className="text-gray-700">
                        {t.datosPage.commitmentText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supervisory Authorities */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {t.datosPage.authoritiesTitle}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t.datosPage.authoritiesText}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t.datosPage.authorityUS}</h4>
                      <p className="text-gray-700 mb-2">{t.datosPage.authorityUSName}</p>
                      <a href="https://www.ftc.gov" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        www.ftc.gov
                        <FaArrowRight />
                      </a>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t.datosPage.authorityEU}</h4>
                      <p className="text-gray-700 mb-2">{t.datosPage.authorityEUName}</p>
                      <a href="https://edpb.europa.eu" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        edpb.europa.eu
                        <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.datosPage.ctaTitle}
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            {t.datosPage.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacidad@tuimpulsalab.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaEnvelope />
              {t.datosPage.ctaContactDPO}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              {t.datosPage.ctaGeneralContact}
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
