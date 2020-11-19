import React from 'react'
import styled from 'styled-components'
import ReactSelect from 'react-select'
import {getGenreOptions} from '../genres'

const genreOptions = getGenreOptions()

type FilterProps = {
  onChange: (selectedOptions: any) => void
}

export default function Filter({onChange}: FilterProps) {
  return (
    <Select
      options={genreOptions}
      isMulti
      onChange={onChange}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
    />
  )
}

const Select = styled(ReactSelect).attrs({classNamePrefix: 'react_select'})`
  min-width: 400px;
  margin: 25px 10px;

  .react_select__option {
    width: 50%;
  }

  .react_select__menu-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-height: 400px !important;
  }

  .react_select__control {
    border: none;
  }

  .react_select__control,
  .react_select__menu {
    cursor: pointer;
    background-color: #333333;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  }

  .react_select__menu {
    color: white;
  }

  .react_select__placeholder {
    color: #dddddd;
  }

  .react_select__option--is-focused {
    background-color: #e50a15;
  }

  .react_select__indicator-separator {
    background-color: #777777;
  }
`
