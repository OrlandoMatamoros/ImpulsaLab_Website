'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FaArrowRight,
  FaCheckCircle,
  FaRocket,
  FaBrain,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaClock,
  FaDollarSign,
  FaUserTie
} from 'react-icons/fa';

export default function Carreras() {
  const { t } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    linkedin: '',
    posicion: '',
    mensaje: '',
    cv: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    console.log('Aplicación enviada:', formData);
    alert(t.carrerasPage.formGracias);
  };

  const posicionesAbiertas = t.carrerasPage.posiciones.map((pos, index) => ({
    id: index + 1,
    ...pos,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              {t.carrerasPage.breadcrumbInicio}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{t.carrerasPage.breadcrumbCarreras}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaRocket className="text-yellow-300" />
              <span className="text-sm font-medium">{t.carrerasPage.heroTag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.carrerasPage.heroTitle}
              <span className="text-yellow-300"> {t.carrerasPage.heroTitleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t.carrerasPage.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#posiciones"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                {t.carrerasPage.verPosiciones}
                <FaArrowRight />
              </a>
              <a
                href="#cultura"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                {t.carrerasPage.conoceCultura}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cultura Section */}
      <section id="cultura" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.carrerasPage.culturaTitle} <span className="text-blue-600">{t.carrerasPage.culturaHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600">
                {t.carrerasPage.culturaDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl">
                <FaBrain className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.carrerasPage.labMentalidadTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {t.carrerasPage.labMentalidadDesc}
                </p>
                <ul className="space-y-2">
                  {t.carrerasPage.labMentalidadItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl">
                <FaUsers className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.carrerasPage.impactoTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {t.carrerasPage.impactoDesc}
                </p>
                <ul className="space-y-2">
                  {t.carrerasPage.impactoItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.carrerasPage.beneficiosTitle}
              </h2>
              <p className="text-xl text-gray-600">
                {t.carrerasPage.beneficiosSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.carrerasPage.desarrolloTitle}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.carrerasPage.desarrolloItems.map((item, index) => (
                    <li key={index}>{'\u2022'} {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaHandshake className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.carrerasPage.culturaBalanceTitle}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.carrerasPage.culturaBalanceItems.map((item, index) => (
                    <li key={index}>{'\u2022'} {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaChartLine className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.carrerasPage.compensacionTitle}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.carrerasPage.compensacionItems.map((item, index) => (
                    <li key={index}>{'\u2022'} {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-brand-navy to-slate-800 rounded-xl p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <FaLightbulb className="text-5xl mb-4 text-yellow-300 mx-auto" />
                <h3 className="text-2xl font-bold mb-3">{t.carrerasPage.seParteTitulo}</h3>
                <p className="text-lg text-blue-100">
                  {t.carrerasPage.seParteDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posiciones Abiertas Section */}
      <section id="posiciones" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.carrerasPage.posicionesTitle}
              </h2>
              <p className="text-xl text-gray-600">
                {t.carrerasPage.posicionesSubtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {posicionesAbiertas.map((posicion) => (
                <div
                  key={posicion.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedJob(posicion.id)}
                >
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {posicion.tipo}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{posicion.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-3">{posicion.descripcion}</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-gray-400" />
                      <span>{posicion.departamento}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{posicion.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-gray-400" />
                      <span>{posicion.salario}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-gradient-to-r from-brand-navy to-slate-800 text-white py-3 rounded-lg font-semibold hover:from-slate-900 hover:to-slate-900 transition-all flex items-center justify-center gap-2">
                    {t.carrerasPage.verDetalles}
                    <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal de Detalles de Posición */}
            {selectedJob && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {posicionesAbiertas.find(p => p.id === selectedJob)?.titulo}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {posicionesAbiertas.find(p => p.id === selectedJob)?.departamento}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                      >
                        {'\u00D7'}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {(() => {
                      const job = posicionesAbiertas.find(p => p.id === selectedJob);
                      return job ? (
                        <>
                          <div className="mb-6">
                            <p className="text-gray-700 mb-4">{job.descripcion}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <FaClock className="text-gray-400" />
                                <span>{job.tipo}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <span>{job.ubicacion}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaDollarSign className="text-gray-400" />
                                <span>{job.salario}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">{t.carrerasPage.responsabilidades}</h4>
                            <ul className="space-y-2">
                              {job.responsabilidades.map((resp, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">{t.carrerasPage.requisitos}</h4>
                            <ul className="space-y-2">
                              {job.requisitos.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4">
                            <a
                              href="#aplicar"
                              onClick={() => {
                                setSelectedJob(null);
                                setFormData({...formData, posicion: job.titulo});
                              }}
                              className="flex-1 bg-gradient-to-r from-brand-navy to-slate-800 text-white py-3 rounded-lg font-semibold hover:from-slate-900 hover:to-slate-900 transition-all text-center"
                            >
                              {t.carrerasPage.aplicarAhora}
                            </a>
                            <button
                              onClick={() => setSelectedJob(null)}
                              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                              {t.carrerasPage.cerrar}
                            </button>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Formulario de Aplicación */}
      <section id="aplicar" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.carrerasPage.formTitle}
              </h2>
              <p className="text-xl text-gray-600">
                {t.carrerasPage.formSubtitle}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.carrerasPage.formNombre}
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t.carrerasPage.formNombrePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.carrerasPage.formEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t.carrerasPage.formEmailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.carrerasPage.formTelefono}
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t.carrerasPage.formTelefonoPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.carrerasPage.formLinkedin}
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t.carrerasPage.formLinkedinPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t.carrerasPage.formPosicion}
                  </label>
                  <select
                    name="posicion"
                    value={formData.posicion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t.carrerasPage.formSelecciona}</option>
                    {posicionesAbiertas.map(pos => (
                      <option key={pos.id} value={pos.titulo}>{pos.titulo}</option>
                    ))}
                    <option value={t.carrerasPage.aplicacionGeneral}>{t.carrerasPage.formGeneral}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t.carrerasPage.formPorque}
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder={t.carrerasPage.formPorquePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t.carrerasPage.formCV}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {formData.cv && (
                    <p className="text-sm text-green-600 mt-2">
                      {t.carrerasPage.formArchivoSeleccionado} {formData.cv.name}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>{t.carrerasPage.formNotaLabel}</strong> {t.carrerasPage.formNota}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-navy to-slate-800 text-white py-4 rounded-lg font-semibold hover:from-slate-900 hover:to-slate-900 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                >
                  {t.carrerasPage.formEnviar}
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Selección */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.carrerasPage.procesoTitle}
              </h2>
              <p className="text-xl text-gray-600">
                {t.carrerasPage.procesoSubtitle}
              </p>
            </div>

            <div className="space-y-6">
              {t.carrerasPage.procesoSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${index === t.carrerasPage.procesoSteps.length - 1 ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center font-bold`}>
                      {index === t.carrerasPage.procesoSteps.length - 1 ? '\u2713' : index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.titulo}</h3>
                    <p className="text-gray-700">
                      {step.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-navy to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.carrerasPage.ctaTitle}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {t.carrerasPage.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#aplicar"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                {t.carrerasPage.aplicacionGeneral}
                <FaArrowRight />
              </a>
              <a
                href="mailto:talentos@tuimpulsalab.com"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <FaEnvelope />
                talentos@tuimpulsalab.com
              </a>
              <a
                href="https://linkedin.com/company/impulsa-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <FaLinkedin />
                {t.carrerasPage.siguenos}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
