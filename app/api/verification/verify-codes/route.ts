// app/api/verification/verify-codes/route.ts
// F-22 FIX (pentest interno 2026-05-12):
// Antes: aceptaba cualquier 6 dígitos numéricos sin validar contra storage real.
// Ahora: lee de Firestore (con hash + expiry + attempts + single-use) via verification-helper.

import { NextRequest, NextResponse } from 'next/server';
import { verifyCode } from '@/lib/verification-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, userData } = body;

    if (!email || !code) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const result = await verifyCode(email, code);

    if (!result.ok) {
      const responseBody: any = { error: result.error || 'Código inválido' };
      if (typeof result.attemptsRemaining === 'number') {
        responseBody.attemptsRemaining = result.attemptsRemaining;
      }
      return NextResponse.json(responseBody, { status: 400 });
    }

    console.log(`Email ${email} verificado correctamente`);

    return NextResponse.json({
      success: true,
      emailVerified: true,
      message: 'Email verificado. Ahora verifica tu WhatsApp.',
      nextStep: 'whatsapp_verification',
      userData: {
        email,
        ...userData,
      },
    });
  } catch (error: any) {
    console.error('Error en verify-codes:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
