'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Obtener el token y verificar el rol
      const idTokenResult = await user.getIdTokenResult();
      const role = idTokenResult.claims.role || 'free';
      
      console.log('Login successful:', email, 'Role:', role);
      
      // Redirigir según el rol
      switch(role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'consultant':
          router.push('/consultant');
          break;
        case 'premium':
        case 'client':
        case 'free':
        default:
          router.push('/dashboard');
          break;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Mensajes de error más amigables
      switch(error.code) {
        case 'auth/user-not-found':
          setError(t.loginPage.errorNoEncontrado);
          break;
        case 'auth/wrong-password':
          setError(t.loginPage.errorContrasena);
          break;
        case 'auth/invalid-email':
          setError(t.loginPage.errorEmailInvalido);
          break;
        case 'auth/too-many-requests':
          setError(t.loginPage.errorMuchosIntentos);
          break;
        default:
          setError(t.loginPage.errorGeneral);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Impulsa Lab
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            {t.loginPage.bienvenido}
          </h2>
          <p className="mt-2 text-gray-600">
            {t.loginPage.iniciarSesion}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleLogin}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.loginPage.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field with Toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.loginPage.contrasena}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {t.loginPage.recordarme}
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                {t.loginPage.olvidasteContrasena}
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t.loginPage.iniciando}
              </span>
            ) : (
              t.loginPage.iniciarSesionBtn
            )}
          </button>

          {/* Sign up link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">{t.loginPage.noTienesCuenta}{' '}</span>
            <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
              {t.loginPage.registrate}
            </Link>
          </div>

          {/* Demo Account Info - TEMPORAL */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 font-medium mb-2">{t.loginPage.cuentaDemo}</p>
            <p className="text-xs text-blue-700">Email: demo@tuimpulsalab.com</p>
            <p className="text-xs text-blue-700">Password: DemoImpulsa2025!</p>
          </div>
        </form>
      </div>
    </div>
  );
}
