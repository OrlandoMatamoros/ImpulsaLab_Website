import { homeES, homeEN } from './home'
import { pagesES, pagesEN } from './pages'
import { capacitacionES, capacitacionEN } from './capacitacion'
import { faqES, faqEN } from './faq'

export const translations = {
  ES: {
    ...homeES,
    ...pagesES,
    ...capacitacionES,
    ...faqES,
  },
  EN: {
    ...homeEN,
    ...pagesEN,
    ...capacitacionEN,
    ...faqEN,
  },
}

export type Language = 'ES' | 'EN'
export type Translations = typeof translations.ES
