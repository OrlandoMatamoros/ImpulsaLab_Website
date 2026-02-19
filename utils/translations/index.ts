import { homeES, homeEN } from './home'
import { pagesES, pagesEN } from './pages'
import { capacitacionES, capacitacionEN } from './capacitacion'
import { faqES, faqEN } from './faq'
import { serviciosMarketingES, serviciosMarketingEN } from './servicios-marketing'
import { serviciosOperacionesES, serviciosOperacionesEN } from './servicios-operaciones'
import { blogAyudaES, blogAyudaEN } from './blog-ayuda'
import { serviciosFinanzasES, serviciosFinanzasEN } from './servicios-finanzas'
import { capacitacionSubES, capacitacionSubEN } from './capacitacion-sub'
import { herramientasES, herramientasEN } from './herramientas'
import { carrerasCasosES, carrerasCasosEN } from './carreras-casos'
import { legalPartnersES, legalPartnersEN } from './legal-partners'
import { internalES, internalEN } from './internal'

export const translations = {
  ES: {
    ...homeES,
    ...pagesES,
    ...capacitacionES,
    ...faqES,
    ...serviciosMarketingES,
    ...serviciosOperacionesES,
    ...blogAyudaES,
    ...serviciosFinanzasES,
    ...capacitacionSubES,
    ...herramientasES,
    ...carrerasCasosES,
    ...legalPartnersES,
    ...internalES,
  },
  EN: {
    ...homeEN,
    ...pagesEN,
    ...capacitacionEN,
    ...faqEN,
    ...serviciosMarketingEN,
    ...serviciosOperacionesEN,
    ...blogAyudaEN,
    ...serviciosFinanzasEN,
    ...capacitacionSubEN,
    ...herramientasEN,
    ...carrerasCasosEN,
    ...legalPartnersEN,
    ...internalEN,
  },
}

export type Language = 'ES' | 'EN'
export type Translations = typeof translations.ES
