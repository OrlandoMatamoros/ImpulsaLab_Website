// English-only translations bundle.
// Loaded via dynamic import() only when the user switches to EN.
// Must NOT be imported statically anywhere — webpack code-splits this chunk.
// Each *-en.ts file contains ONLY the EN object — no ES strings included.

import homeEN from './home-en'
import pagesEN from './pages-en'
import capacitacionEN from './capacitacion-en'
import faqEN from './faq-en'
import serviciosMarketingEN from './servicios-marketing-en'
import serviciosOperacionesEN from './servicios-operaciones-en'
import blogAyudaEN from './blog-ayuda-en'
import serviciosHubEN from './servicios-hub-en'
import serviciosFinanzasEN from './servicios-finanzas-en'
import capacitacionSubEN from './capacitacion-sub-en'
import herramientasEN from './herramientas-en'
import carrerasCasosEN from './carreras-casos-en'
import legalPartnersEN from './legal-partners-en'
import internalEN from './internal-en'
import diagnosticoUiEN from './diagnostico-ui-en'
import toolsInternalEN from './tools-internal-en'
import novedadesEN from './novedades-en'

const translationsEN = {
  ...homeEN,
  ...pagesEN,
  ...capacitacionEN,
  ...faqEN,
  ...serviciosHubEN,
  ...serviciosMarketingEN,
  ...serviciosOperacionesEN,
  ...blogAyudaEN,
  ...serviciosFinanzasEN,
  ...capacitacionSubEN,
  ...herramientasEN,
  ...carrerasCasosEN,
  ...legalPartnersEN,
  ...internalEN,
  ...diagnosticoUiEN,
  ...toolsInternalEN,
  ...novedadesEN,
}

export default translationsEN
