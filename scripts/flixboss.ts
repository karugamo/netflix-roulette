import {JSDOM} from 'jsdom'
import {save} from './util'
import got from 'got'

async function main() {
  const movies = await fetchFlixboss()
  console.log('Found', movies.length, 'movies')
  save('movies', movies)
}

main()

async function fetchFlixboss() {
  let movies = []

  for (let i = 1; i < 10; i++) {
    const {data} = await got(
      `https://de.flixboss.com/x/filter/filme/-/-/imdb/${i}/0/1`
    ).json()

    movies = movies.concat(extractMovies(data))
  }

  return movies
}

function extractMovies(flixBossPage: string) {
  const document = new JSDOM(flixBossPage).window.document

  const movies = []

  document.querySelectorAll('.title').forEach((element) => {
    const id = element.getAttribute('data-id')

    const image = element
      .querySelector('.img')
      .getAttribute('style')
      .slice("background-image: url('".length, -2)

    const title = element.querySelector('h4').innerHTML

    const year = Number(element.querySelector('.year').innerHTML)

    const genres = []

    element.querySelectorAll('.genre').forEach((genre) => {
      genres.push(genre.innerHTML)
    })

    const rating = Number(element.querySelector('.rating span').innerHTML)

    movies.push({id, title, year, genres, rating, image})
  })

  return movies
}
