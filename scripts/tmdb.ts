import {env, load, save} from './util'
import got from 'got'
import {Movie} from '../src/types'

const {TMDB_KEY} = env

const movies: Movie[] = load('movies')

async function main() {
  Promise.all(
    movies.map(async (movie) => {
      console.log(movie.title, movie.ids.tmdb)
      const url = `https://api.themoviedb.org/3/movie/${movie.ids.tmdb}?api_key=${TMDB_KEY}`

      let data: any
      try {
        data = await got(url).json()

        movie.spokenLanguages = data.spoken_languages.map(
          ({iso_639_1}) => iso_639_1
        )

        movie.originalLanguage = data.original_language

        save('movies', movies)
      } catch (e) {
        console.log('Error with movie', movie.title, e.message)
      }
    })
  )
}

main()
