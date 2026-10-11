import en from './en.json'
import ja from './ja.json'
import fr from './fr.json'
import th from './th.json'
import type { Locale } from '../data/types'

export const strings: Record<Locale, typeof en> = { en, ja, fr, th }
