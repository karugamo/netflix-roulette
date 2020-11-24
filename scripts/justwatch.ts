import got from 'got'
import {keyBy, mapValues, range} from 'lodash'
import {Movie} from '../src/types'
import {save} from './util'

const languages = ['en', 'de']

async function main() {
  const data = await fetchJustWatch()
  const movies = data.map(selectMovie)
  console.log('Fetched', movies.length, 'movies')
  save('movies', movies)

  const genres = await fetchGenreNames()
  save('genres', genres)
}

main()

function selectMovie(justWatchMovieLocalized: any): Movie {
  // for available data, see: https://apis.justwatch.com/content/titles/movie/56184/locale/de_DE?language=en

  const {
    genre_ids,
    scoring,
    original_release_year,
    offers,
    poster,
    runtime,
    external_ids
  } = justWatchMovieLocalized.en

  const title = Object.fromEntries(
    languages.map((lang) => [lang, justWatchMovieLocalized[lang].title])
  )

  return {
    id: offers[0].urls.standard_web.split('/').pop(),
    title,
    ids: mapValues(keyBy(external_ids, 'provider'), 'external_id'),
    runtime,
    year: original_release_year,
    genres: genre_ids,
    rating: scoring.find(({provider_type}) => provider_type === 'imdb:score')
      .value,
    image: `https://images.justwatch.com${poster.slice(
      0,
      -'{profile}'.length
    )}s592/`
  }
}

async function fetchJustWatch() {
  const query = {
    fields: [
      'genre_ids',
      'original_release_year',
      'full_path',
      'full_paths',
      'id',
      'object_type',
      'poster',
      'scoring',
      'title',
      'tmdb_popularity',
      'offers',
      'runtime',
      'external_ids'
    ],
    content_types: ['movie'],
    providers: ['nfx'],
    sort_by: 'imdb_score',
    enable_provider_filter: false,
    monetization_types: [],
    page: 1,
    page_size: 100,
    matching_offers_only: true
  }

  const data = {}

  for (const page of range(1, 11)) {
    query.page = page
    const encodedQuery = encodeURI(JSON.stringify(query))

    for (const lang of languages) {
      const {items}: any = await got(
        `https://apis.justwatch.com/content/titles/de_DE/popular?body=${encodedQuery}&language=${lang}`
      ).json()

      for (const item of items) {
        data[item.id] = {
          ...data[item.id],
          [lang]: item
        }
      }
    }
  }

  return Object.values(data)
}

async function fetchGenreNames() {
  const genreByLanguage = {}
  for (const lang of languages) {
    const translations: JustWatchGenre[] = await got(
      `https://apis.justwatch.com/content/genres/locale/de_DE?language=${lang}`
    ).json()
    genreByLanguage[lang] = mapValues(
      keyBy(translations, 'id'),
      (genre) => genre.translation
    )
  }
  return genreByLanguage
}

type JustWatchGenre = {
  id: number
  short_name: string
  technical_name: string
  translation: string
  slug: string
}
