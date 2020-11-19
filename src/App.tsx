import {shuffle} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import {Movie} from './types'
import CardFlip from 'react-card-flip'

const shuffledMovies = randomEndlessNoRepeatMovies()

const rotationSpeed = 1

export default function App() {
  const [frontMovie, setFrontMovie] = useState<Movie>(getRandomMovie())
  const [backMovie, setBackMovie] = useState<Movie>(getRandomMovie())
  const [nextMovie, setNextMovie] = useState<Movie>(getRandomMovie())

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

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
      <CardFlip
        flipSpeedFrontToBack={rotationSpeed}
        flipSpeedBackToFront={rotationSpeed}
        isFlipped={isFlipped}
        flipDirection="vertical"
        infinite
      >
        <MovieThumbnail movie={frontMovie} onSpin={spin} />
        <MovieThumbnail movie={backMovie} onSpin={spin} />
      </CardFlip>
      <ImagePreloader src={frontMovie.image} />
      <ImagePreloader src={backMovie.image} />
      <ImagePreloader src={nextMovie.image} />
    </Main>
  )

  function spin() {
    if (isFlipped) {
      setFrontMovie(nextMovie)
    } else {
      setBackMovie(nextMovie)
    }
    setNextMovie(getRandomMovie())
    setIsFlipped((flipped) => !flipped)
  }
}

function getRandomMovie(): Movie {
  return shuffledMovies.next().value
}

function* randomEndlessNoRepeatMovies(): Generator<Movie> {
  while (true) {
    let shuffledMovies = shuffle(movies)
    for (const movie of shuffledMovies) {
      yield movie
    }
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  color: #242422;
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

const ImagePreloader = styled.img.attrs({width: 0, height: 0})`
  display: none;
`
