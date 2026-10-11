import en from './en.json'
import ja from './ja.json'
import fr from './fr.json'
import th from './th.json'
import type { Locale } from '../data/types'
import { resolveFactTokens } from '../data/resolve-facts'

export const strings: Record<Locale, typeof en> = {
  en: resolveFactTokens(en, 'en'),
  ja: resolveFactTokens(ja, 'ja'),
  fr: resolveFactTokens(fr, 'fr'),
  th: resolveFactTokens(th, 'th'),
}
