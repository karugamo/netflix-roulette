import {shuffle} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import {Movie} from './types'
import Filter from './components/Filter'

const CardsContainer = styled.div`
  position: relative;
  width: 872px;
`

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 1s;
`

const positions = [
  {
    zIndex: 3,
    transform: 'perspective(0px) rotateZ(0deg)'
  },
  {
    zIndex: 2,
    transform: 'perspective(0px) rotateZ(5deg) translateX(0px) translateY(40px)'
  },
  {
    zIndex: 1,
    transform:
      'perspective(0px) rotateZ(10deg) translateX(0px) translateY(80px)'
  },
  {
    zIndex: 0,
    transform:
      'perspective(0px) rotateZ(10deg) translateX(0px) translateY(80px)'
  }
]

function getStyleForPosition(position: number) {
  return positions[position % positions.length]
}

export default function App() {
  const [moviePool, setMoviePool] = useState(randomEndlessNoRepeat(movies))

  const [currentPosition, setCurrentPosition] = useState(0)

  const [moviePositions, setMoviePositions] = useState<Movie[]>([
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie(),
    getRandomMovie()
  ])

  return (
    <Main>
      <Title>Netflix Roulette</Title>
      <Text>
        Ever feel like you’re not finding new movies when browsing Netflix?
        You’re not sure what to watch and you want to make sure to draw from the
        full catalogue and not be restricted by the official recommendation?
        Spin the Netflix Roulette to find random Movies that are available on
        Netflix. It draws from the top 1000 movies on Netflix by IMDb rating.
      </Text>
      <Filter onChange={onFilterChange} movies={movies} />
      <CardsContainer>
        <CardContainer
          key="pos-0"
          style={getStyleForPosition(currentPosition + 0)}
        >
          <MovieThumbnail movie={moviePositions[0]} onSpin={spin} />
        </CardContainer>
        <CardContainer
          key="pos-1"
          style={getStyleForPosition(currentPosition + 1)}
        >
          <MovieThumbnail movie={moviePositions[1]} onSpin={spin} />
        </CardContainer>
        <CardContainer
          key="pos-2"
          style={getStyleForPosition(currentPosition + 2)}
        >
          <MovieThumbnail movie={moviePositions[2]} onSpin={spin} />
        </CardContainer>
        <CardContainer
          key="pos-3"
          style={getStyleForPosition(currentPosition + 3)}
        >
          <MovieThumbnail movie={moviePositions[3]} onSpin={spin} />
        </CardContainer>
      </CardsContainer>
    </Main>
  )

  function onFilterChange(filteredMovies: Movie[]) {
    const newMoviePool = randomEndlessNoRepeat(filteredMovies)
    setMoviePool(newMoviePool)
  }

  function spin() {
    setMoviePositions((moviePositions) =>
      moviePositions.map((movie, index) =>
        index === currentPosition ? getRandomMovie() : movie
      )
    )

    setCurrentPosition((position) => {
      if (!positions[position - 1]) return positions.length - 1
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

const Text = styled.p`
  width: 50%;
  text-align: center;
  margin-bottom: 40px;
`
