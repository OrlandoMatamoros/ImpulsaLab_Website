import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnostico 3D de Madurez Digital',
  description: 'Evalua el nivel de madurez digital de tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnostico gratuito impulsado por IA.',
}

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="diagnostico-layout">
      {children}
    </div>
  );
}