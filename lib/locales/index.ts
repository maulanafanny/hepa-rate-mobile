/**
 * Locales
 */

import { I18n } from 'i18n-js'

import English from '@/lib/locales/en'
import Indonesian from '@/lib/locales/id'

const Locales = new I18n({
  id: Indonesian,
  en: English,
})

Locales.enableFallback = true

export default Locales
