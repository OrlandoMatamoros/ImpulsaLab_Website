// lib/firebase.ts - Configuración robusta para todos los entornos
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';

// Configuración segura con variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Validación de configuración
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.error('⚠️ Firebase configuration is incomplete. Missing fields:', missingFields);
  console.error('Check your .env.local file');
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.warn('[Firebase] initialized successfully (project: ' + firebaseConfig.projectId + ')');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Throw error para que la app no continúe sin Firebase
  throw error;
}

// F-17 FIX (pentest interno 2026-05-12): Initialize App Check
// App Check verifies requests come from your real app (not scripts with leaked API key).
// Initially deployed in "Unenforced" mode — monitors traffic without blocking.
// After 1-2 weeks of healthy metrics in Firebase Console, enable Enforcement per service.
//
// Manual setup required (one-time):
//   1. Google reCAPTCHA Admin (https://www.google.com/recaptcha/admin):
//      - Register site, type=reCAPTCHA v3, domains: tuimpulsalab.com, www.tuimpulsalab.com, localhost
//      - Copy Site Key (public — exposes in NEXT_PUBLIC_*)
//   2. Vercel env vars (impulsa-lab-v-claude):
//      - NEXT_PUBLIC_RECAPTCHA_SITE_KEY = <site key>
//   3. Firebase Console → App Check:
//      - Register web app, provider=reCAPTCHA v3, paste site key
//      - Keep enforcement OFF (Unenforced) initially. Activate later per service.
//   4. For local dev: set self.FIREBASE_APPCHECK_DEBUG_TOKEN=true in browser console
//      → Firebase will show a debug token in DevTools, register it in App Check Console.
let appCheck: AppCheck | null = null;
if (typeof window !== 'undefined') {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Auto-enable debug token on localhost/codespaces (no reCAPTCHA needed for dev)
  const isLocalDev =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('github.dev');
  if (isLocalDev) {
    // @ts-expect-error - Firebase App Check debug global (set BEFORE initializeAppCheck)
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  if (siteKey) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
      console.warn('[App Check] Firebase App Check initialized with reCAPTCHA v3 provider');
    } catch (err) {
      console.warn('⚠️ App Check initialization failed (non-blocking):', err);
    }
  } else {
    console.warn('ℹ️ App Check skipped: NEXT_PUBLIC_RECAPTCHA_SITE_KEY not set');
  }
}
export { appCheck };

// Initialize Auth with proper settings
export const auth = getAuth(app);

// Configure Auth for development environments
if (typeof window !== 'undefined') {
  // Detectar si estamos en Codespaces
  const isCodespaces = window.location.hostname.includes('github.dev');
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isCodespaces || isLocalhost) {
    console.log('🔧 Configuring Firebase Auth for development environment');
    
    // Para desarrollo, usar el authDomain en lugar del dominio actual
    auth.settings.appVerificationDisabledForTesting = true;
  }
  
  // Log environment info
  console.log('📍 Environment Info:', {
    hostname: window.location.hostname,
    origin: window.location.origin,
    isCodespaces,
    isLocalhost,
    projectId: firebaseConfig.projectId
  });
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser and production)
let analytics = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isSupported().then(yes => {
    if (yes) {
      import('firebase/analytics').then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
        console.log('📊 Analytics initialized');
      });
    }
  });
}

export { analytics };

// Helper function to check Firebase connection
export const checkFirebaseConnection = async () => {
  try {
    // Test Firestore connection
    const { doc, getDoc } = await import('firebase/firestore');
    const testDoc = await getDoc(doc(db, '_health_check_', 'test'));
    console.log('✅ Firestore connection successful');
    
    // Test Auth
    console.log('✅ Auth configured:', auth.name);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection check failed:', error);
    return false;
  }
};

// Export Firebase app instance for debugging
export { app };
