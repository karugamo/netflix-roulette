import {shuffle} from 'lodash'
import React, {useState} from 'react'
import styled from 'styled-components'
import movies from '../data/movies.json'
import {Movie} from './types'
import Filter from './components/Filter'
import CardStack from './components/CardStack'
import SpinButton from './components/SpinButton'
import {useTranslation} from 'react-i18next'

export default function App() {
  const [moviePool, setMoviePool] = useState<Movie[]>(shuffle(movies))

  const [position, setPosition] = useState(0)
  const [spinPosition, setSpinPosition] = useState(0)

  const {t} = useTranslation()

  return (
    <Main>
      <Title>{t('title')}</Title>
      <Filter onChange={onFilterChange} movies={movies} />
      <CardStack
        spinPosition={spinPosition}
        topPosition={position}
        movies={moviePool}
      />
      <ButtonContainer>
        <SpinButton onPress={spin} />
      </ButtonContainer>
    </Main>
  )

  function onFilterChange(filteredMovies: Movie[]) {
    const newMoviePool = shuffle(filteredMovies)
    setMoviePool(newMoviePool)
  }

  function spin() {
    setPosition((position) => position + 1)
    setSpinPosition((pos) => {
      if (pos === 5) return 0
      return pos + 1
    })
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
