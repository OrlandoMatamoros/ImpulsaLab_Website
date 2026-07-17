// lib/verification-helper.ts
// Helper para verification codes seguros (F-22 fix — pentest interno Fase 4)
//
// Provee:
// - generateSecureCode(): código crypto-secure de 6 dígitos (no Math.random)
// - hashCode(code): hash sha256 con salt para almacenar en Firestore
// - verifyCode(code, hash): compara código submitted vs hash almacenado (constant-time)
//
// Almacena los códigos en Firestore collection `verification_codes/{docId}`:
//   { identifier: string, codeHash: string, expiresAt: Date, attempts: number, used: boolean }
// Identifier es email para email-verification, phone para whatsapp.

import { randomInt, createHash, timingSafeEqual } from 'crypto';
import { adminDb } from '@/lib/firebase-admin';

const CODE_LENGTH = 6;
const EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_SECONDS = 60; // 1 código por minuto por identifier
const SALT = process.env.VERIFICATION_HASH_SALT || 'impulsa-lab-default-salt-rotate-me';

export function generateSecureCode(): string {
  // Crypto-secure: randomInt usa /dev/urandom (Linux/Mac) o BCryptGenRandom (Win)
  // Mucho más seguro que Math.random() para tokens de auth
  const min = 10 ** (CODE_LENGTH - 1); // 100000
  const max = 10 ** CODE_LENGTH; // 1000000
  return randomInt(min, max).toString();
}

export function hashCode(code: string): string {
  return createHash('sha256').update(`${SALT}:${code}`).digest('hex');
}

export function verifyHash(code: string, hash: string): boolean {
  const computed = hashCode(code);
  if (computed.length !== hash.length) return false;
  // Constant-time comparison evita timing attacks
  return timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
}

export interface SaveCodeResult {
  ok: boolean;
  error?: string;
  rateLimitedUntil?: Date;
}

/**
 * Guarda un código en Firestore con hash + expiry + rate limit check.
 * Si ya existe un código activo para este identifier dentro de RATE_LIMIT_SECONDS,
 * rechaza (rate limit).
 */
export async function saveCode(identifier: string, code: string): Promise<SaveCodeResult> {
  const codeHash = hashCode(code);
  const now = Date.now();
  const expiresAt = new Date(now + EXPIRY_MINUTES * 60 * 1000);

  try {
    // Rate limit: buscar códigos activos recientes
    const docId = identifier.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const docRef = adminDb.collection('verification_codes').doc(docId);
    const existing = await docRef.get();

    if (existing.exists) {
      const data = existing.data();
      if (data && !data.used && data.createdAt) {
        const createdMs = data.createdAt.toMillis
          ? data.createdAt.toMillis()
          : new Date(data.createdAt).getTime();
        if (now - createdMs < RATE_LIMIT_SECONDS * 1000) {
          const wait = Math.ceil((RATE_LIMIT_SECONDS * 1000 - (now - createdMs)) / 1000);
          return {
            ok: false,
            error: `Espera ${wait}s antes de pedir otro código`,
            rateLimitedUntil: new Date(createdMs + RATE_LIMIT_SECONDS * 1000),
          };
        }
      }
    }

    await docRef.set({
      identifier: identifier.toLowerCase(),
      codeHash,
      expiresAt,
      createdAt: new Date(),
      attempts: 0,
      used: false,
    });

    return { ok: true };
  } catch (err) {
    console.error('[verification] saveCode error:', err);
    return { ok: false, error: 'Error guardando código' };
  }
}

export interface VerifyCodeResult {
  ok: boolean;
  error?: string;
  attemptsRemaining?: number;
}

/**
 * Verifica un código contra Firestore. Valida:
 * - existe doc
 * - no expirado
 * - no usado previamente
 * - hash match (constant-time)
 * - attempts < MAX_ATTEMPTS
 *
 * Tras success: marca used=true (single-use, previene replay).
 * Tras fail: incrementa attempts; si > MAX_ATTEMPTS, invalida.
 */
export async function verifyCode(identifier: string, code: string): Promise<VerifyCodeResult> {
  if (!code || !/^\d{6}$/.test(code)) {
    return { ok: false, error: 'Código inválido' };
  }

  try {
    const docId = identifier.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const docRef = adminDb.collection('verification_codes').doc(docId);
    const snap = await docRef.get();

    if (!snap.exists) {
      return { ok: false, error: 'Código inválido o expirado' };
    }

    const data = snap.data()!;

    if (data.used) {
      return { ok: false, error: 'Código ya fue usado' };
    }

    const expiresAtMs = data.expiresAt.toMillis
      ? data.expiresAt.toMillis()
      : new Date(data.expiresAt).getTime();
    if (Date.now() > expiresAtMs) {
      return { ok: false, error: 'Código expirado' };
    }

    if ((data.attempts || 0) >= MAX_ATTEMPTS) {
      await docRef.update({ used: true }); // invalida tras max attempts
      return { ok: false, error: 'Demasiados intentos. Solicita un código nuevo' };
    }

    if (!verifyHash(code, data.codeHash)) {
      // Increment attempts (mantiene mismo doc)
      await docRef.update({ attempts: (data.attempts || 0) + 1 });
      const remaining = MAX_ATTEMPTS - (data.attempts || 0) - 1;
      return {
        ok: false,
        error: 'Código inválido',
        attemptsRemaining: remaining,
      };
    }

    // Match. Marcar como usado para prevenir replay.
    await docRef.update({ used: true, verifiedAt: new Date() });
    return { ok: true };
  } catch (err) {
    console.error('[verification] verifyCode error:', err);
    return { ok: false, error: 'Error verificando código' };
  }
}

export interface ConsumeResult {
  ok: boolean;
  error?: string;
}

/**
 * Confirma server-side que `identifier` (teléfono WhatsApp o email) completó una
 * verificación OTP REAL y reciente (verifyCode marcó `verifiedAt`), y la CONSUME
 * para un único registro (previene reusar una verificación para crear varias
 * cuentas). El endpoint de creación de cuenta debe llamar esto en vez de confiar
 * en flags `phoneVerified`/`emailVerified` enviados por el cliente.
 */
export async function consumeVerification(
  identifier: string | undefined | null,
  maxAgeMinutes = 20,
): Promise<ConsumeResult> {
  if (!identifier) return { ok: false, error: 'Verificación requerida' };

  try {
    const docId = identifier.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const docRef = adminDb.collection('verification_codes').doc(docId);
    const snap = await docRef.get();

    if (!snap.exists) return { ok: false, error: 'Verificación requerida' };
    const data = snap.data()!;

    if (!data.verifiedAt) return { ok: false, error: 'Verificación no completada' };
    if (data.consumedForSignup) return { ok: false, error: 'Verificación ya utilizada' };

    const verifiedMs = data.verifiedAt.toMillis
      ? data.verifiedAt.toMillis()
      : new Date(data.verifiedAt).getTime();
    if (Date.now() - verifiedMs > maxAgeMinutes * 60 * 1000) {
      return { ok: false, error: 'Verificación expirada, vuelve a verificar' };
    }

    // Consumir: un solo registro por verificación.
    await docRef.update({ consumedForSignup: true, consumedAt: new Date() });
    return { ok: true };
  } catch (err) {
    console.error('[verification] consumeVerification error:', err);
    return { ok: false, error: 'Error validando la verificación' };
  }
}
