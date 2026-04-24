'use client';

import { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui/index';
import { Loader2, CheckCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface InitialLeadCaptureProps {
  onComplete: (leadData: {
    nombre: string;
    email: string;
    telefono?: string;
    negocio: string;
    industria: string;
    empleados: number;
  }) => void;
}

export function InitialLeadCapture({ onComplete }: InitialLeadCaptureProps) {
  const { t } = useLanguage();
  const tp = t.initialLeadCapture;
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    negocio: '',
    industria: '',
    empleados: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = tp.errorNombreRequerido;
    }

    if (!formData.email.trim()) {
      newErrors.email = tp.errorEmailRequerido;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = tp.errorEmailInvalido;
      }
    }

    if (!formData.negocio.trim()) {
      newErrors.negocio = tp.errorNegocioRequerido;
    }

    if (!formData.industria) {
      newErrors.industria = tp.errorIndustriaRequerida;
    }

    if (!formData.empleados || formData.empleados === '0') {
      newErrors.empleados = tp.errorEmpleadosRequerido;
    } else {
      const empleadosNum = parseInt(formData.empleados);
      if (isNaN(empleadosNum) || empleadosNum < 1) {
        newErrors.empleados = tp.errorEmpleadosInvalido;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Enviar email de bienvenida
      const response = await fetch('/api/diagnostic/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          negocio: formData.negocio,
        }),
      });

      if (response.ok) {
        console.log('✅ Email de bienvenida enviado');
      } else {
        console.warn('⚠️ Error enviando email de bienvenida, pero continuamos');
      }

      // Continuar con el diagnóstico independientemente del email
      // (el email de bienvenida es opcional, no bloqueante)
      onComplete({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        negocio: formData.negocio,
        industria: formData.industria,
        empleados: parseInt(formData.empleados),
      });

    } catch (error) {
      console.error('Error en registro inicial:', error);
      // Aún así continuar - no queremos bloquear el flujo
      onComplete({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        negocio: formData.negocio,
        industria: formData.industria,
        empleados: parseInt(formData.empleados),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardContent className="pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              🎯 {tp.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {tp.subtitle}
            </p>
            <div className="mt-4 inline-block bg-white rounded-lg px-4 py-2 border border-blue-300">
              <p className="text-sm text-gray-600">
                {tp.accessNote}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelNombre}
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderNombre}
                disabled={isSubmitting}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelEmail}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderEmail}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500">
                {tp.emailNote}
              </p>
            </div>

            {/* Nombre del Negocio */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelNegocio}
              </label>
              <input
                type="text"
                name="negocio"
                value={formData.negocio}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.negocio ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderNegocio}
                disabled={isSubmitting}
              />
              {errors.negocio && (
                <p className="text-red-500 text-sm mt-1">{errors.negocio}</p>
              )}
            </div>

            {/* Industria */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelIndustria}
              </label>
              <select
                name="industria"
                value={formData.industria}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 appearance-none ${
                  errors.industria ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isSubmitting}
              >
                <option value="">{tp.selectIndustria}</option>
                <option value="Tecnología">{tp.industrias.tecnologia}</option>
                <option value="Retail">{tp.industrias.retail}</option>
                <option value="Servicios">{tp.industrias.servicios}</option>
                <option value="Manufactura">{tp.industrias.manufactura}</option>
                <option value="Salud">{tp.industrias.salud}</option>
                <option value="Educación">{tp.industrias.educacion}</option>
                <option value="Alimentos">{tp.industrias.alimentos}</option>
                <option value="Construcción">{tp.industrias.construccion}</option>
                <option value="Turismo">{tp.industrias.turismo}</option>
                <option value="Otro">{tp.industrias.otro}</option>
              </select>
              {errors.industria && (
                <p className="text-red-500 text-sm mt-1">{errors.industria}</p>
              )}
            </div>

            {/* Número de Empleados */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelEmpleados}
              </label>
              <input
                type="number"
                name="empleados"
                value={formData.empleados}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.empleados ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={tp.placeholderEmpleados}
                min="1"
                disabled={isSubmitting}
              />
              {errors.empleados && (
                <p className="text-red-500 text-sm mt-1">{errors.empleados}</p>
              )}
              <p className="text-xs text-gray-500">
                {tp.empleadosNote}
              </p>
            </div>

            {/* Teléfono (Opcional) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {tp.labelTelefono} <span className="text-gray-400 font-normal">{tp.telefonoOpcional}</span>
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  hover:border-gray-400 transition-all duration-200"
                placeholder={tp.placeholderTelefono}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#002D62] hover:bg-[#001d42] text-white font-semibold
                  text-lg py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {tp.btnSubmitting}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    {tp.btnSubmit}
                  </span>
                )}
              </Button>
            </div>

            {/* Privacy Note */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                🔒 {tp.privacyNote}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">⚡</div>
          <p className="text-sm font-semibold text-gray-700">{tp.beneficio1Titulo}</p>
          <p className="text-xs text-gray-500">{tp.beneficio1Desc}</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm font-semibold text-gray-700">{tp.beneficio2Titulo}</p>
          <p className="text-xs text-gray-500">{tp.beneficio2Desc}</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">🎁</div>
          <p className="text-sm font-semibold text-gray-700">{tp.beneficio3Titulo}</p>
          <p className="text-xs text-gray-500">{tp.beneficio3Desc}</p>
        </div>
      </div>
    </div>
  );
}
