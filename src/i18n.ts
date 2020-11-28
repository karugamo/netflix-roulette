import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import languages from '@cospired/i18n-iso-languages'
import genreTranslations from '../data/genres.json'
import {Option} from './types'

languages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'))
languages.registerLocale(require('@cospired/i18n-iso-languages/langs/de.json'))

const resources = {
  en: {
    translation: {
      title: 'Netflix Roulette',
      'filter.genres': 'Genres',
      'filter.originalLanguages': 'Original Languages',
      'filter.select.all': 'All',
      'filter.select.nSelected': '{{count}} Selected',
      'movie.section.genres': 'Genres',
      'movie.section.imdbRating': 'IMDb Rating',
      'movie.section.runtime': 'Runtime',
      'movie.section.originalLanguage': 'Original Language',
      spin: 'Next',
      cn: 'Cantonese',
      settings: 'Settings'
    }
  },
  de: {
    translation: {
      title: 'Was soll ich auf Netflix schauen?',
      'filter.genres': 'Genres',
      'filter.originalLanguages': 'Originalsprachen',
      'filter.select.all': 'Alle',
      'filter.select.nSelected': '{{count}} ausgewählt',
      'movie.section.genres': 'Genres',
      'movie.section.imdbRating': 'IMDb Bewertung',
      'movie.section.runtime': 'Filmlänge',
      'movie.section.originalLanguage': 'Originalsprache',
      spin: 'Weiter',
      cn: 'Kantonesisch',
      settings: 'Einstellungen'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n

export function getLanguageName(isoLanguage: string) {
  return languages.getName(isoLanguage, i18n.language) || i18n.t(isoLanguage)
}

export function getGenreName(genreId: number) {
  return genreTranslations[i18n.language][genreId]
}

export const genreOptions: Option[] = Object.entries(
  genreTranslations[i18n.language]
).map(([id, label]) => ({
  value: Number(id),
  label: label as string
}))
