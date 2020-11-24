import {getLanguageName} from './i18n'

const languages = [
  'en',
  'ja',
  'fr',
  'de',
  'hi',
  'ta',
  'tr',
  'uk',
  'es',
  'kn',
  'pt',
  'it',
  'cn',
  'mr',
  'cs',
  'id',
  'ie',
  'zh',
  'ko',
  'he',
  'th',
  'da',
  'ar',
  'ur',
  'pl',
  'te',
  'nl',
  'hr',
  'is',
  'fa',
  'ms',
  'eu',
  'ml'
]

export const languageOptions = languages.map((code) => ({
  value: code,
  label: getLanguageName(code) || code
}))
