import { homeES, homeEN } from './home'
import { pagesES, pagesEN } from './pages'
import { capacitacionES, capacitacionEN } from './capacitacion'
import { faqES, faqEN } from './faq'
import { serviciosMarketingES, serviciosMarketingEN } from './servicios-marketing'
import { serviciosOperacionesES, serviciosOperacionesEN } from './servicios-operaciones'
import { blogAyudaES, blogAyudaEN } from './blog-ayuda'
import { serviciosHubES, serviciosHubEN } from './servicios-hub'
import { serviciosFinanzasES, serviciosFinanzasEN } from './servicios-finanzas'
import { capacitacionSubES, capacitacionSubEN } from './capacitacion-sub'
import { herramientasES, herramientasEN } from './herramientas'
import { carrerasCasosES, carrerasCasosEN } from './carreras-casos'
import { legalPartnersES, legalPartnersEN } from './legal-partners'
import { internalES, internalEN } from './internal'
import { diagnosticoUiES, diagnosticoUiEN } from './diagnostico-ui'
import { toolsInternalES, toolsInternalEN } from './tools-internal'
import { novedadesES, novedadesEN } from './novedades'

export const translations = {
  ES: {
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
  },
  EN: {
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
  },
}

export type Language = 'ES' | 'EN'
export type Translations = typeof translations.ES
