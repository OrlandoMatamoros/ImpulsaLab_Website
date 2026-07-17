import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { consumeVerification } from '@/lib/verification-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, company, phone, phoneVerified, emailVerified } = body;

    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Usar valores por defecto si faltan datos
    const userData = {
      email,
      firstName: firstName || email.split('@')[0], // Usar parte del email si no hay nombre
      lastName: lastName || '',
      company: company || '',
      phone: phone || '',
      role: 'registered',
      phoneVerified: phoneVerified || false,
      emailVerified: emailVerified || false,
      createdAt: new Date(),
      lastLogin: new Date(),
      diagnosticsCompleted: 0,
      diagnosticsLimit: 3,
      features: {
        diagnostics3D: true,
        basicReports: true,
        emailSupport: true
      }
    };

    // SEGURIDAD (fix account-takeover): este endpoint es público. Si el email ya
    // pertenece a una cuenta, NO la tocamos. Antes se llamaba updateUser({password})
    // sobre la cuenta existente → cualquiera podía cambiar la contraseña de otro
    // usuario (incluido un admin) sin autenticarse y recibir un customToken de su
    // sesión. Ahora un email existente se rechaza; solo se crean cuentas nuevas.
    let userRecord;
    try {
      const existing = await adminAuth.getUserByEmail(email);
      if (existing) {
        return NextResponse.json(
          {
            error:
              'Ya existe una cuenta con este correo. Inicia sesión o recupera tu contraseña.',
            code: 'email-already-in-use',
          },
          { status: 409 }
        );
      }
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        throw error; // error real de Firebase (no "no existe") → propagar
      }
      // 'auth/user-not-found' = email libre → seguimos a crear la cuenta.
    }

    // SEGURIDAD (endurecimiento OTP): NO confiar en phoneVerified/emailVerified
    // del body. Confirmar server-side que el canal (teléfono WhatsApp, o email)
    // completó una verificación OTP real y reciente, y consumirla (un solo
    // registro por verificación). Sin esto, cualquiera podía crear cuentas
    // "verificadas" sin poseer el teléfono/correo.
    const verified = await consumeVerification(phone || email);
    if (!verified.ok) {
      return NextResponse.json(
        { error: verified.error || 'Verificación requerida', code: 'verification-required' },
        { status: 403 }
      );
    }

    userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${userData.firstName} ${userData.lastName}`.trim() || email,
      emailVerified: true,
    });
    console.log('New user created:', userRecord.uid);

    await adminAuth.setCustomUserClaims(userRecord.uid, { role: userData.role });

    const userDoc = await adminDb.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      await adminDb.collection('users').doc(userRecord.uid).set(userData);
    } else {
      await adminDb.collection('users').doc(userRecord.uid).update({
        ...userData,
        lastLogin: new Date()
      });
    }

    const customToken = await adminAuth.createCustomToken(userRecord.uid, { role: userData.role });

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        role: userData.role
      },
      customToken,
      redirectTo: '/'
    });

  } catch (error: any) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing user' },
      { status: 500 }
    );
  }
}
