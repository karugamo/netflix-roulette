import {sample} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'
import SpinButton from './components/SpinButton'
import {Movie} from './types'

export default function App() {
  const [movie, setMovie] = useState<Movie>(sample(movies))
  return (
    <Main>
      <MovieThumbnail movie={movie} />
      <SpinButton onPress={spin} />
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

  background-color: #eeeee4;
  color: #242422;
`
