'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = language === 'ES' ? {
    title: 'Recuperar contraseña',
    subtitle: 'Te enviaremos un enlace para restablecer tu contraseña',
    email: 'Correo electrónico',
    submit: 'Enviar enlace',
    sending: 'Enviando...',
    backToLogin: 'Volver a iniciar sesión',
    sentTitle: '✉️ Enlace enviado',
    sentBody: 'Revisa tu bandeja de entrada (y spam) para restablecer tu contraseña.',
    errorNotFound: 'No existe una cuenta con este email',
    errorInvalid: 'Email inválido',
  } : {
    title: 'Reset password',
    subtitle: "We'll email you a link to reset your password",
    email: 'Email address',
    submit: 'Send link',
    sending: 'Sending...',
    backToLogin: 'Back to sign in',
    sentTitle: '✉️ Link sent',
    sentBody: 'Check your inbox (and spam) to reset your password.',
    errorNotFound: 'No account found with this email',
    errorInvalid: 'Invalid email',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      const code = err?.code || 'unknown';
      setError(
        code === 'auth/user-not-found' ? t.errorNotFound :
        code === 'auth/invalid-email' ? t.errorInvalid :
        `Error (${code})`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Impulsa Lab</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{t.title}</h2>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-lg">
            <h3 className="font-semibold text-green-900 text-lg">{t.sentTitle}</h3>
            <p className="text-green-800 mt-2">{t.sentBody}</p>
            <Link href="/login" className="mt-6 inline-block text-purple-600 hover:text-purple-500 font-medium">
              ← {t.backToLogin}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {loading ? t.sending : t.submit}
            </button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-purple-600 hover:text-purple-500">
                ← {t.backToLogin}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
