// app/api/verification/send-whatsapp/route.ts
// F-22 FIX (pentest interno 2026-05-12):
// Antes: Math.random + debugCode en HTTP response (leak).
// Ahora: crypto.randomInt + persist en Firestore (hashed + expiry) + sin debugCode.

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { generateSecureCode, saveCode } from '@/lib/verification-helper';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
    }

    const code = generateSecureCode();
    const saveResult = await saveCode(phone, code);

    if (!saveResult.ok) {
      return NextResponse.json(
        { error: saveResult.error || 'Error guardando código' },
        { status: 429 }
      );
    }

    const message = await client.messages.create({
      from: '+19296589612',
      to: phone,
      body: `Impulsa Lab verification code: ${code}\nValid for 10 minutes. Do not share this code.`,
    });

    console.log('SMS sent:', message.sid, 'Status:', message.status);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent via SMS',
      messageSid: message.sid,
      channel: 'sms',
    });
  } catch (error: any) {
    console.error('SMS Error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to send verification code. Please check your phone number.',
      },
      { status: 500 }
    );
  }
}
