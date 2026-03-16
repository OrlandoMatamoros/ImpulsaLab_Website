'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestWhatsApp() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();
  const tp = t.testWhatsappPage;

  const sendCode = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/verification/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(tp.codigoEnviado);
        setStep(2);
      } else {
        setMessage(tp.errorEnvio + (data.error || tp.noSePudoEnviar));
      }
    } catch (error) {
      setMessage(tp.errorConexion);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/verification/verify-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: phone,
          code,
          type: 'phone'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(tp.telefonoVerificado);
        setStep(3);
      } else {
        setMessage(tp.errorVerificacion + (data.error || tp.codigoInvalido));
      }
    } catch (error) {
      setMessage(tp.errorAlVerificar);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{tp.titulo}</h1>
          <p className="mt-2 text-gray-600">{tp.subtitulo}</p>
        </div>

        {/* Mensaje de WhatsApp Business */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 text-center">
            <span className="font-semibold">{tp.whatsappActivo}</span><br/>
            {tp.verificacionDirecta}
          </p>
        </div>

        {/* Mensaje de estado */}
        {message && (
          <div className={`p-4 rounded-lg text-sm font-medium ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Step 1: Ingresar teléfono */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tp.numeroWhatsapp}
              </label>
              <input
                type="tel"
                placeholder="+52 1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                {tp.incluyeCodigo}
              </p>
            </div>
            <button 
              onClick={sendCode}
              disabled={loading || !phone || phone.length < 10}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? tp.enviandoCodigo : tp.enviarCodigo}
            </button>
          </div>
        )}

        {/* Step 2: Verificar código */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tp.codigoVerificacion}
              </label>
              <input
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={verifyCode}
              disabled={loading || code.length !== 6}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? tp.verificando : tp.verificarCodigo}
            </button>
            <button 
              onClick={() => {setStep(1); setCode(''); setMessage('');}}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
            >
              {tp.cambiarNumero}
            </button>
          </div>
        )}

        {/* Step 3: Éxito */}
        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {tp.verificacionExitosa}
            </h3>
            <p className="text-gray-600">
              {tp.elNumero} <strong>{phone}</strong> {tp.haVerificado}
            </p>
            <button 
              onClick={() => {setStep(1); setPhone(''); setCode(''); setMessage('');}}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {tp.probarOtroNumero}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            {tp.poweredBy}<br/>
            {tp.copyright}
          </p>
        </div>
      </div>
    </div>
  );
}
