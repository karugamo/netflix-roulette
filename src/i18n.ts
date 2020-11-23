import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

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
      spin: 'Next'
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
      spin: 'Weiter'
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
