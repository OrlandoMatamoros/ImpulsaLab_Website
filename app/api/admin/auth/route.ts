// app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Hash bcrypt precomputado del password admin — vive ya hasheado en env
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (!password || !ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: 'Configuración inválida' },
        { status: 500 }
      );
    }
    
    // Verificar contraseña
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    
    if (!isValid) {
      // Log intento fallido
      console.warn('Failed admin login attempt');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Generar JWT
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    const token = await new SignJWT({ 
      role: 'admin',
      timestamp: Date.now()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
    
    // Establecer cookie segura
    const cookieStore = await cookies();
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/'
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Error de autenticación' },
      { status: 500 }
    );
  }
}

// Verificar token
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    try {
      await jwtVerify(token, secret);
      return NextResponse.json({ authenticated: true });
    } catch {
      return NextResponse.json({ authenticated: false });
    }
    
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

// Logout
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin-token');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 });
  }
}