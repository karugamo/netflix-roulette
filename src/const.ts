import {keyBy} from 'lodash'

import ISO6391 from 'iso-639-1'

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
  label: ISO6391.getName(code) || code
}))

export const genres = [
  {
    id: 1,
    short_name: 'act',
    technical_name: 'action',
    translation: 'Action \u0026 Adventure',
    slug: 'action-and-adventure'
  },
  {
    id: 2,
    short_name: 'ani',
    technical_name: 'animation',
    translation: 'Animation',
    slug: 'animation'
  },
  {
    id: 3,
    short_name: 'cmy',
    technical_name: 'comedy',
    translation: 'Comedy',
    slug: 'comedy'
  },
  {
    id: 4,
    short_name: 'crm',
    technical_name: 'crime',
    translation: 'Crime',
    slug: 'crime'
  },
  {
    id: 5,
    short_name: 'doc',
    technical_name: 'documentation',
    translation: 'Documentary',
    slug: 'documentary'
  },
  {
    id: 6,
    short_name: 'drm',
    technical_name: 'drama',
    translation: 'Drama',
    slug: 'drama'
  },
  {
    id: 7,
    short_name: 'fnt',
    technical_name: 'fantasy',
    translation: 'Fantasy',
    slug: 'fantasy'
  },
  {
    id: 8,
    short_name: 'hst',
    technical_name: 'history',
    translation: 'History',
    slug: 'history'
  },
  {
    id: 9,
    short_name: 'hrr',
    technical_name: 'horror',
    translation: 'Horror',
    slug: 'horror'
  },
  {
    id: 10,
    short_name: 'fml',
    technical_name: 'family',
    translation: 'Kids \u0026 Family',
    slug: 'kids-and-family'
  },
  {
    id: 11,
    short_name: 'msc',
    technical_name: 'music',
    translation: 'Music \u0026 Musical',
    slug: 'music-and-musical'
  },
  {
    id: 12,
    short_name: 'trl',
    technical_name: 'thriller',
    translation: 'Mystery \u0026 Thriller',
    slug: 'mystery-and-thriller'
  },
  {
    id: 13,
    short_name: 'rma',
    technical_name: 'romance',
    translation: 'Romance',
    slug: 'romance'
  },
  {
    id: 14,
    short_name: 'scf',
    technical_name: 'scifi',
    translation: 'Science-Fiction',
    slug: 'science-fiction'
  },
  {
    id: 15,
    short_name: 'spt',
    technical_name: 'sport',
    translation: 'Sport',
    slug: 'sport'
  },
  {
    id: 16,
    short_name: 'war',
    technical_name: 'war',
    translation: 'War \u0026 Military',
    slug: 'war-and-military'
  },
  {
    id: 17,
    short_name: 'wsn',
    technical_name: 'western',
    translation: 'Western',
    slug: 'western'
  },
  {
    id: 23,
    short_name: 'rly',
    technical_name: 'reality',
    translation: 'Reality TV',
    slug: 'reality-tv'
  },
  {
    id: 18,
    short_name: 'eur',
    technical_name: 'european',
    translation: 'Made in Europe',
    slug: 'made-in-europe'
  }
]

export const genreOptions = genres.map(({id, translation}) => ({
  value: id,
  label: translation
}))

export function getGenreName(genreId: number) {
  const genreById = keyBy(genres, 'id')

  return genreById[genreId].translation
}
