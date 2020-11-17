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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in
        consectetur velit, vitae pretium justo. Nunc non augue aliquet,
        consectetur odio ac, pharetra mi. Praesent quis condimentum risus, nec
        congue.
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
