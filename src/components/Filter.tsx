import {intersection} from 'lodash'
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {languageOptions} from '../const'
import {genreOptions, getLanguageName} from '../i18n'
import {Movie, Option} from '../types'
import MultiSelect from './MultiSelect'

type FilterProps = {
  movies: Movie[]
  onChange: (movies: Movie[]) => void
}

export default function Filter({onChange, movies}: FilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<Option[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([
    {value: 'en', label: getLanguageName('en')},
    {value: 'de', label: getLanguageName('de')}
  ])

  const {t} = useTranslation()

  useEffect(() => {
    onFilterChange()
  }, [selectedGenres, selectedLanguages])

  return (
    <Container>
      <FilterContainer>
        <Label>{t('filter.genres')}</Label>
        <MultiSelect
          options={genreOptions}
          selectedOptions={selectedGenres}
          setSelectedOptions={setSelectedGenres}
        />
      </FilterContainer>
      <FilterContainer>
        <Label>{t('filter.originalLanguages')}</Label>
        <MultiSelect
          setSelectedOptions={setSelectedLanguages}
          options={languageOptions}
          selectedOptions={selectedLanguages}
        />
      </FilterContainer>
    </Container>
  )

  function onFilterChange() {
    const filteredMovies = movies.filter(genreFilter).filter(languageFilter)

    onChange(filteredMovies)
  }

  function languageFilter(movie: Movie) {
    if (selectedLanguages.length === 0) return true

    return selectedLanguages
      .map(({value}) => value)
      .includes(movie.originalLanguage)
  }

  function genreFilter(movie: Movie) {
    if (selectedGenres.length === 0) return true

    return (
      intersection(
        movie.genres,
        selectedGenres.map((option) => option.value)
      ).length > 0
    )
  }
}

const FilterContainer = styled.div``

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 872px;
`

const Label = styled.div`
  font-weight: bolder;
  margin-bottom: 4px;
  color: #545454;
`
