import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, negocio } = await request.json();

    console.log('📧 Enviando email de bienvenida a:', email);

    // Email de bienvenida al usuario
    const emailResult = await resend.emails.send({
      from: 'Impulsa Lab <noreply@tuimpulsalab.com>',
      to: email,
      subject: '✅ Acceso Confirmado al Diagnóstico 3D - ImpulsaLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #002D62 0%, #0047AB 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                ImpulsaLab
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
                Diagnóstico 3D Empresarial
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">

              <!-- Greeting -->
              <h2 style="color: #002D62; font-size: 24px; margin: 0 0 20px 0;">
                ¡Bienvenido, ${nombre}! 🎉
              </h2>

              <!-- Success Message -->
              <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; color: #2e7d32; font-weight: 600;">
                  ✅ Tu acceso al Diagnóstico 3D ha sido confirmado
                </p>
              </div>

              <!-- Main Content -->
              <p style="color: #333; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Estás a punto de descubrir el estado real de <strong>${negocio}</strong> en las 3 dimensiones clave del éxito empresarial:
              </p>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="margin-bottom: 15px;">
                  <span style="font-size: 24px;">💰</span>
                  <strong style="color: #002D62; margin-left: 10px;">Finanzas</strong>
                  <p style="margin: 5px 0 0 34px; color: #666; font-size: 14px;">
                    Salud financiera y gestión de recursos
                  </p>
                </div>
                <div style="margin-bottom: 15px;">
                  <span style="font-size: 24px;">⚙️</span>
                  <strong style="color: #002D62; margin-left: 10px;">Operaciones</strong>
                  <p style="margin: 5px 0 0 34px; color: #666; font-size: 14px;">
                    Eficiencia y procesos operativos
                  </p>
                </div>
                <div>
                  <span style="font-size: 24px;">📈</span>
                  <strong style="color: #002D62; margin-left: 10px;">Marketing</strong>
                  <p style="margin: 5px 0 0 34px; color: #666; font-size: 14px;">
                    Presencia de marca y captación de clientes
                  </p>
                </div>
              </div>

              <!-- Next Steps -->
              <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 18px;">
                  📋 Próximos Pasos
                </h3>
                <ol style="color: #856404; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
                  <li>Completa la evaluación inicial (3 preguntas generales)</li>
                  <li>Responde las preguntas específicas de cada dimensión</li>
                  <li>Recibe tu reporte completo por email</li>
                  <li>Agenda tu consulta gratuita de 30 minutos</li>
                </ol>
              </div>

              <!-- CTA -->
              <div style="text-align: center; margin: 40px 0 20px 0;">
                <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                  Continúa donde lo dejaste:
                </p>
                <a href="https://goimpulsalab.com/diagnostico"
                   style="display: inline-block; background: #002D62; color: white; text-decoration: none;
                          padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  ▶ Continuar Diagnóstico
                </a>
              </div>

              <!-- Time Estimate -->
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 13px; margin: 0;">
                  ⏱️ Tiempo estimado: 5-7 minutos
                </p>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                ¿Necesitas ayuda? Contáctanos:
              </p>
              <p style="margin: 0;">
                <a href="mailto:contacto@tuimpulsalab.com" style="color: #002D62; text-decoration: none; font-weight: 600;">
                  contacto@tuimpulsalab.com
                </a>
              </p>
              <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">
                © ${new Date().getFullYear()} ImpulsaLab. Todos los derechos reservados.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    if (emailResult.error) {
      console.error('❌ Error enviando email de bienvenida:', emailResult.error);
      return NextResponse.json(
        { error: 'Error enviando email de bienvenida' },
        { status: 500 }
      );
    }

    console.log('✅ Email de bienvenida enviado exitosamente:', emailResult.data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email de bienvenida enviado',
      emailId: emailResult.data?.id,
    });

  } catch (error: any) {
    console.error('❌ Error en send-welcome:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}
