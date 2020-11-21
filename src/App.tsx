import {shuffle} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import {Movie} from './types'
import Filter from './components/Filter'
import CardStack from './components/CardStack'
import SpinButton from './components/SpinButton'

export default function App() {
  const [moviePool, setMoviePool] = useState(randomEndlessNoRepeat(movies))

  const [topPosition, setTopPosition] = useState(0)

  const [moviePositions, setMoviePositions] = useState<Movie[]>([
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie()
  ])

  return (
    <Main>
      <Title>Netflix Roulette</Title>
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
  }

  function spin() {
    setMoviePositions((moviePositions) =>
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
  overflow-y: hidden;
`

const Title = styled.h1`
  font-size: 50px;
  margin: 10px;
`

const ButtonContainer = styled.div`
  width: 200px;
  padding-top: 15px;
`
