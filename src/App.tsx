import {shuffle} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import {Movie} from './types'
import Filter from './components/Filter'
import CardStack from './components/CardStack'
import SpinButton from './components/SpinButton'
import {useTranslation} from 'react-i18next'

export default function App() {
  const [moviePool, setMoviePool] = useState(randomEndlessNoRepeat(movies))

  const [topPosition, setTopPosition] = useState(0)

  const [moviePositions, setMoviePositions] = useState<Movie[]>(() => [
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie()
  ])

  const {t} = useTranslation()

  return (
    <Main>
      <Title>{t('title')}</Title>
      <Filter onChange={onFilterChange} movies={movies} />
      <CardStack
        topPosition={topPosition}
        Component={MovieThumbnail}
        elementProps={moviePositions.map((movie) => ({movie}))}
      />
      <ButtonContainer>
        <SpinButton onPress={spin} />
      </ButtonContainer>
    </Main>
  )

  function onFilterChange(filteredMovies: Movie[]) {
    const newMoviePool = randomEndlessNoRepeat(filteredMovies)
    setMoviePool(newMoviePool)
    setMoviePositions([
      newMoviePool.next().value,
      newMoviePool.next().value,
      newMoviePool.next().value,
      newMoviePool.next().value,
      newMoviePool.next().value
    ])
  }

  function spin() {
    setMoviePositions(
      moviePositions.map((movie, index) =>
        index === topPosition ? getRandomMovie() : movie
      )
    )

    setTopPosition((position) => {
      if (position === 0) return 4
      return position - 1
    })
  }

  function getRandomMovie(): Movie {
    return moviePool.next().value
  }
}

function* randomEndlessNoRepeat(moviePool: Movie[]): Generator<Movie> {
  if (!moviePool || moviePool.length === 0) {
    while (true) {
      yield {
        id: '70155547',
        title: {
          en: 'Not Found',
          de: 'Not Found'
        },
        year: 404,
        rating: 4.0,
        genres: [6],
        runtime: 40 * 60 + 4,
        originalLanguage: 'en',
        image: 'https://images.justwatch.com/poster/139055178/s592'
      }
    }
  }

  while (true) {
    let shuffledMovies = shuffle(moviePool)
    for (const movie of shuffledMovies) {
      yield movie
    }
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: #242422;
`

const Title = styled.h1`
  font-size: 50px;
  margin: 10px;
  text-align: center;
  color: #222222;
  @media (max-width: 900px) {
    font-size: 30px;
  }
`

const ButtonContainer = styled.div`
  width: 200px;
  padding-top: 15px;
  @media (max-width: 872px) {
    width: 90vw;
    position: fixed;
    bottom: 3vw;
  }
`
