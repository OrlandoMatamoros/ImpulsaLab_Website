// Spanish-only translations bundle.
// Imported synchronously by LanguageContext so ES text is available on
// first render without waiting for the EN blob.
// Each *-es.ts file contains ONLY the ES object — webpack will NOT include EN.

import homeES from './home-es'
import pagesES from './pages-es'
import capacitacionES from './capacitacion-es'
import faqES from './faq-es'
import serviciosMarketingES from './servicios-marketing-es'
import serviciosOperacionesES from './servicios-operaciones-es'
import blogAyudaES from './blog-ayuda-es'
import serviciosHubES from './servicios-hub-es'
import serviciosFinanzasES from './servicios-finanzas-es'
import capacitacionSubES from './capacitacion-sub-es'
import herramientasES from './herramientas-es'
import carrerasCasosES from './carreras-casos-es'
import legalPartnersES from './legal-partners-es'
import internalES from './internal-es'
import diagnosticoUiES from './diagnostico-ui-es'
import toolsInternalES from './tools-internal-es'
import novedadesES from './novedades-es'

export const translationsES = {
  ...homeES,
  ...pagesES,
  ...capacitacionES,
  ...faqES,
  ...serviciosHubES,
  ...serviciosMarketingES,
  ...serviciosOperacionesES,
  ...blogAyudaES,
  ...serviciosFinanzasES,
  ...capacitacionSubES,
  ...herramientasES,
  ...carrerasCasosES,
  ...legalPartnersES,
  ...internalES,
  ...diagnosticoUiES,
  ...toolsInternalES,
  ...novedadesES,
}
