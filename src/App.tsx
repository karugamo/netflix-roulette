import {sample} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import {Movie} from './types'

export default function App() {
  const [movie, setMovie] = useState<Movie>(sample(movies))
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
      <MovieThumbnail movie={movie} onSpin={spin} />
    </Main>
  )

  function spin() {
    setMovie(sample(movies.filter(({id}) => id !== movie.id)))
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
