import got from 'got'
import {keyBy, mapValues, range} from 'lodash'
import {getGenreName} from '../src/const'
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
  // for available data, see: https://apis.justwatch.com/content/titles/movie/56184/locale/de_DE?language=en

  const {
    title,
    genre_ids,
    scoring,
    original_release_year,
    offers,
    poster,
    runtime,
    external_ids
  } = justWatchMovie

  return {
    id: offers[0].urls.standard_web.split('/').pop(),
    title,
    ids: mapValues(keyBy(external_ids, 'provider'), 'external_id'),
    runtime,
    year: original_release_year,
    genres: genre_ids.map(getGenreName),
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

  let data = []

  for (const page of range(1, 11)) {
    query.page = page
    const encodedQuery = encodeURI(JSON.stringify(query))
    const {items}: any = await got(
      `https://apis.justwatch.com/content/titles/de_DE/popular?body=${encodedQuery}&language=en`
    ).json()

    data = data.concat(items)
  }

  return data
}
