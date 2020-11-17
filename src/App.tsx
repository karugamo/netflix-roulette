import {sample} from 'lodash'
import React from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import MovieThumbnail from './components/MovieThumbnail'

export default function App() {
  const movie = sample(movies)

  return (
    <Main>
      <MovieThumbnail movie={movie} />
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  background-color: #eeeee4;
  color: #242422;
`
