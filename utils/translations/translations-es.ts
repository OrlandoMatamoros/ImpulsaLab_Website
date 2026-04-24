// Spanish-only translations bundle.
// Imported synchronously by LanguageContext so ES text is available on
// first render without waiting for the EN blob.  The EN side is lazy-loaded
// via dynamic import() only when the user switches language.
//
// NOTE: keep the re-export list in sync with index.ts.

import { homeES } from './home'
import { pagesES } from './pages'
import { capacitacionES } from './capacitacion'
import { faqES } from './faq'
import { serviciosMarketingES } from './servicios-marketing'
import { serviciosOperacionesES } from './servicios-operaciones'
import { blogAyudaES } from './blog-ayuda'
import { serviciosHubES } from './servicios-hub'
import { serviciosFinanzasES } from './servicios-finanzas'
import { capacitacionSubES } from './capacitacion-sub'
import { herramientasES } from './herramientas'
import { carrerasCasosES } from './carreras-casos'
import { legalPartnersES } from './legal-partners'
import { internalES } from './internal'
import { diagnosticoUiES } from './diagnostico-ui'
import { toolsInternalES } from './tools-internal'

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
}
