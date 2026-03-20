'use client';

// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';
import { useState } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    setTimeout(() => {
      alert(t.footer.graciasSubscripcion);
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t.footer.newsletter}
            </h3>
            <p className="mb-6 text-lg">
              {t.footer.newsletterDesc}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? t.footer.suscribiendo : t.footer.suscribirse}
              </button>
            </form>
            <p className="mt-4 text-sm opacity-90">
              {t.footer.noSpam}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          
          {/* Company Info - Spans 2 columns */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo-fondo-negro.png"  // ✅ Usa el logo #3
                  alt="Impulsa Lab"
                  width={40}
                  height={40}
                  // Sin filtros CSS porque el logo ya es blanco
                />
                <span className="text-xl font-bold">IMPULSA LAB</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {COMPANY_INFO.tagline || 'Transformamos negocios con inteligencia artificial y datos'}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.linkedin.com/company/tuimpulsalab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/tuimpulsalabny/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <span 
                className="text-gray-600 cursor-not-allowed"
                aria-label="Facebook (Próximamente)"
                title="Próximamente"
              >
                <FaFacebook size={24} />
              </span>
              <span 
                className="text-gray-600 cursor-not-allowed"
                aria-label="YouTube (Próximamente)"
                title="Próximamente"
              >
                <FaYoutube size={24} />
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <a 
                href="tel:+19295001850" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaPhone /> +1 929 500 1850
              </a>
              <a 
                href="mailto:contacto@tuimpulsalab.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaEnvelope /> contacto@tuimpulsalab.com
              </a>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <div>
                  <span>118-35 Queens Blvd #400<br />Forest Hills, NY 11375</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.soluciones}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/servicios/finanzas" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {t.footer.dashboardFinanciero}
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/servicios/operaciones" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {t.footer.automatizacionIA}
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/servicios/marketing" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {t.footer.marketingDigital}
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/herramientas/agentes" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {t.footer.agentesIA}
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/herramientas/arsenal" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {t.footer.arsenalTec}
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.recursos}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">{t.footer.blog}</Link></li>
              <li><Link href="/casos-de-exito" className="text-gray-400 hover:text-white transition-colors">{t.footer.casosExito}</Link></li>
              <li><Link href="/herramientas" className="text-gray-400 hover:text-white transition-colors">{t.footer.todasHerramientas}</Link></li>
              <li><Link href="/herramientas/noticias" className="text-gray-400 hover:text-white transition-colors">{t.footer.noticiasIA}</Link></li>
              <li><Link href="/diagnostico" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-1">{t.nav.diagnostico} ⭐</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.empresa}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">{t.footer.nosotros}</Link></li>
              <li><Link href="/#equipo" className="text-gray-400 hover:text-white transition-colors">{t.footer.equipo}</Link></li>
              <li><Link href="/carreras" className="text-gray-400 hover:text-white transition-colors">{t.footer.carreras}</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-white transition-colors">{t.footer.partners}</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">{t.nav.contacto}</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.acceso}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">{t.footer.iniciarSesion}</Link></li>
              <li><Link href="/signup" className="text-gray-400 hover:text-white transition-colors">{t.footer.registrarse}</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">{t.footer.admin}</Link></li>
              <li><Link href="/ayuda" className="text-gray-400 hover:text-white transition-colors">{t.footer.centroAyuda}</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name} LLC. {t.footer.derechos}.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/legal/privacidad" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.privacidad}
              </Link>
              <Link
                href="/legal/terminos"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.terminos}
              </Link>
              <Link
                href="/legal/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.cookies}
              </Link>
              <Link
                href="/legal/datos"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.proteccionDatos}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges - Versión texto mientras no tengamos los SVGs */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> SSL Seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> GDPR Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;