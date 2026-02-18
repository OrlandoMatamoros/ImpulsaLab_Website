'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PhoneVerification() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [debugCode, setDebugCode] = useState('');
  const { t } = useLanguage();
  const tp = t.verificationWhatsappPage;

  useEffect(() => {
    const savedData = sessionStorage.getItem('verifiedEmailData');
    if (!savedData) {
      router.push('/signup');
      return;
    }
    setUserData(JSON.parse(savedData));
  }, [router]);

  const sendCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/verification/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep('code');
        setSuccess(tp.codeSentVia + (data.channel === 'whatsapp' ? 'WhatsApp' : 'SMS') + '. ' + tp.checkMessages);
        if (data.debugCode) {
          setDebugCode(data.debugCode);
        }
      } else {
        setError(data.error || tp.errorSendingCode);
      }
    } catch (err) {
      setError(tp.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const verifyAndCreateAccount = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (code.length !== 6) {
        setError(tp.enter6DigitCode);
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/auth/create-verified-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          phone,
          phoneVerified: true,
          emailVerified: true
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.customToken) {
        setSuccess(tp.accountCreated);
        
        await signInWithCustomToken(auth, data.customToken);
        sessionStorage.clear();
        
        // Mensaje de bienvenida
        setTimeout(() => {
          // REDIRIGIR A HOME PARA TODOS LOS USUARIOS NUEVOS
          if (data.user?.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/'); // IR A HOME, NO A DASHBOARD
          }
        }, 1500);
      } else {
        setError(data.error || tp.errorCreatingAccount);
      }
      
    } catch (err) {
      console.error('Error:', err);
      setError(tp.errorCreatingAccountRetry);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {tp.phoneVerification}
          </h2>
          <p className="mt-2 text-gray-600">
            {tp.finalStep}
          </p>
        </div>

        {userData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              {tp.emailVerified} <strong>{userData.email}</strong>
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            {tp.sendCodeMessage}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tp.phoneNumber}
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                {tp.includeCountryCode}
              </p>
            </div>
            <button
              onClick={sendCode}
              disabled={loading || !phone || phone.length < 10}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? tp.sending : tp.sendVerificationCode}
            </button>
          </div>
        )}

        {step === 'code' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tp.enterVerificationCode}
              </label>
              <input
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full px-4 py-4 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                {tp.enterCodeSentTo} {phone}
              </p>
            </div>
            
            <button
              onClick={verifyAndCreateAccount}
              disabled={loading || code.length !== 6}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? tp.creatingAccount : tp.verifyAndCreate}
            </button>
            
            <button
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
                setSuccess('');
              }}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              {tp.useDifferentNumber}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
