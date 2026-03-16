// ============================================
// IMPULSA LAB - FIREBASE CONFIGURATION
// ============================================

import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { LeadData, DiagnosticResult } from '../types';

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

// Check if Firebase is properly configured
const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'YOUR_API_KEY'
  );
};

// Initialize Firebase only if configured (prevent re-initialization)
let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured()) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
}

// Collection references
const LEADS_COLLECTION = 'leads';
const DIAGNOSTICS_COLLECTION = 'diagnostics';

/**
 * Save lead data to Firestore
 */
export const saveLead = async (leadData: LeadData): Promise<string> => {
  if (!db || !isFirebaseConfigured()) {
    console.log('Firebase not configured, skipping lead save');
    return 'local_' + Date.now();
  }

  try {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
      ...leadData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log('Lead saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};

/**
 * Save diagnostic result to Firestore
 */
export const saveDiagnostic = async (
  result: DiagnosticResult,
  leadId?: string
): Promise<string> => {
  if (!db || !isFirebaseConfigured()) {
    console.log('Firebase not configured, skipping diagnostic save');
    return result.id;
  }

  try {
    const diagnosticData = {
      ...result,
      leadId: leadId || null,
      completedAt: Timestamp.fromDate(result.completedAt),
      createdAt: serverTimestamp(),
    };

    // Use the diagnostic ID as the document ID
    await setDoc(doc(db, DIAGNOSTICS_COLLECTION, result.id), diagnosticData);
    console.log('Diagnostic saved with ID:', result.id);
    return result.id;
  } catch (error) {
    console.error('Error saving diagnostic:', error);
    throw error;
  }
};

/**
 * Get diagnostic by ID
 */
export const getDiagnostic = async (diagnosticId: string): Promise<DiagnosticResult | null> => {
  if (!db || !isFirebaseConfigured()) {
    console.log('Firebase not configured, cannot get diagnostic');
    return null;
  }

  try {
    const docRef = doc(db, DIAGNOSTICS_COLLECTION, diagnosticId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as DiagnosticResult;
    }
    return null;
  } catch (error) {
    console.error('Error getting diagnostic:', error);
    throw error;
  }
};

/**
 * Save both lead and diagnostic in one transaction-like operation
 */
export const saveCompleteDiagnostic = async (
  leadData: LeadData,
  result: DiagnosticResult
): Promise<{ leadId: string; diagnosticId: string }> => {
  if (!isFirebaseConfigured()) {
    console.log('Firebase not configured, skipping cloud save');
    return { leadId: 'local_' + Date.now(), diagnosticId: result.id };
  }

  try {
    // Save lead first
    const leadId = await saveLead(leadData);

    // Save diagnostic with lead reference
    const diagnosticId = await saveDiagnostic(result, leadId);

    return { leadId, diagnosticId };
  } catch (error) {
    console.error('Error saving complete diagnostic:', error);
    throw error;
  }
};

export { db, isFirebaseConfigured };
