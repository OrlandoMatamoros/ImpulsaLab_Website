// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, consultantCode } = await request.json();
    
    console.log('Server-side signup request for:', email);
    
    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email y contraseña son requeridos' 
        },
        { status: 400 }
      );
    }

    // Determinar rol basado en código de consultor
    // F-21 FIX (pentest interno 2026-05-12): validar contra Firestore en lugar de array
    // hardcoded en repo público. Los códigos válidos viven en consultantCodes/{code}
    // con campo isActive=true. Marcar como inactivo tras uso para prevenir reutilización.
    let role = 'free';
    let codeDocRef = null;
    if (consultantCode) {
      try {
        codeDocRef = adminDb.collection('consultantCodes').doc(consultantCode);
        const codeDoc = await codeDocRef.get();

        if (!codeDoc.exists) {
          return NextResponse.json(
            { success: false, error: 'Código de consultor inválido' },
            { status: 400 }
          );
        }

        const codeData = codeDoc.data();
        if (!codeData?.isActive) {
          return NextResponse.json(
            { success: false, error: 'Código de consultor ya usado o inactivo' },
            { status: 400 }
          );
        }

        role = 'consultant';
      } catch (codeErr) {
        console.error('Error verifying consultant code:', codeErr);
        return NextResponse.json(
          { success: false, error: 'Error verificando código de consultor' },
          { status: 500 }
        );
      }
    }

    try {
      // Crear usuario en Firebase Auth
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName: name || email.split('@')[0],
        phoneNumber: phone?.startsWith('+') ? phone : phone ? `+${phone}` : undefined
      });

      console.log('✅ Usuario creado en Auth:', userRecord.uid);

      // Guardar datos adicionales en Firestore
      await adminDb.collection('users').doc(userRecord.uid).set({
        email,
        name: name || '',
        phone: phone || '',
        role,
        consultantCode: consultantCode || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        phoneVerified: false
      });

      console.log('✅ Usuario guardado en Firestore con rol:', role);

      // F-21 FIX: marcar consultantCode como usado tras signup exitoso
      // (previene reutilización del mismo código por múltiples users)
      if (role === 'consultant' && codeDocRef) {
        try {
          await codeDocRef.update({
            isActive: false,
            usedBy: userRecord.uid,
            usedAt: new Date()
          });
          console.log('✅ Consultant code marcado como usado');
        } catch (updateErr) {
          // No abortar el signup si el update del código falla; logear y continuar
          console.error('⚠️ Error marcando consultantCode como usado:', updateErr);
        }
      }

      // F-21 FIX: setear custom claim para role (fortifica rules nuevas con
      // isAdminClaim() / request.auth.token.role como primary check)
      try {
        await adminAuth.setCustomUserClaims(userRecord.uid, { role });
      } catch (claimErr) {
        console.error('⚠️ Error seteando custom claim:', claimErr);
      }

      // Crear custom token para auto-login (incluye custom claim)
      const customToken = await adminAuth.createCustomToken(userRecord.uid, { role });

      return NextResponse.json({
        success: true,
        uid: userRecord.uid,
        email,
        role,
        customToken,
        message: 'Usuario creado exitosamente'
      });

    } catch (authError: any) {
      console.error('Error en Firebase Auth:', authError);
      
      // Manejar errores específicos de Firebase
      if (authError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Este email ya está registrado' 
          },
          { status: 400 }
        );
      }
      
      if (authError.code === 'auth/invalid-phone-number') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Número de teléfono inválido. Incluye código de país (+52, +1, etc)' 
          },
          { status: 400 }
        );
      }

      if (authError.code === 'auth/weak-password') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'La contraseña debe tener al menos 6 caracteres' 
          },
          { status: 400 }
        );
      }

      throw authError;
    }
    
  } catch (error: any) {
    console.error('Signup API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al crear cuenta',
        code: error.code,
      },
      { status: 500 }
    );
  }
}