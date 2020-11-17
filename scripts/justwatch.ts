import got from 'got'
import {keyBy, range} from 'lodash'
import {Movie} from '../src/types'
import {save} from './util'

async function main() {
  const data = await fetchJustWatch()
  const movies = data.map(selectMovie)
  console.log('Fetched', movies.length, 'movies')
  save('movies', movies)
}

main()

function selectMovie(justWatchMovie: any): Movie {
  const {
    title,
    genre_ids,
    scoring,
    original_release_year,
    offers,
    poster
  } = justWatchMovie

  return {
    id: offers[0].urls.standard_web.split('/').pop(),
    title,
    year: original_release_year,
    genres: genre_ids.map(getGenreName),
    rating: scoring.find(({provider_type}) => provider_type === 'imdb:score'),
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
      'offers'
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

  const encodedQuery = encodeURI(JSON.stringify(query))

  let data = []

  for (const page of range(1, 11)) {
    query.page = page
    const {items}: any = await got(
      `https://apis.justwatch.com/content/titles/de_DE/popular?body=${encodedQuery}&language=en`
    ).json()

    data = data.concat(items)
  }

  return data
}

function getGenreName(genreId: number) {
  const genreById = keyBy(
    [
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
    ],
    'id'
  )

  return genreById[genreId].translation
}
