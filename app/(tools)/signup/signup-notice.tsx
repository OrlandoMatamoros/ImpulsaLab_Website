export default function SignupNotice() {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <span className="text-2xl mr-3">🚧</span>
        <div>
          <h3 className="font-bold text-amber-900 mb-2">
            Sistema de Registro en Mantenimiento
          </h3>
          <p className="text-amber-800 mb-3">
            El registro público estará disponible a partir del <strong>26 de agosto de 2025</strong>.
          </p>
          <p className="text-amber-700 text-sm">
            Para acceso anticipado o demos, contacta a:<br/>
            <a href="mailto:orlando@tuimpulsalab.com" className="underline font-medium">
              orlando@tuimpulsalab.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
