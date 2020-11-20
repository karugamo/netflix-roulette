import React, {useState} from 'react'
import styled from 'styled-components'
import ReactSelect, {components, OptionProps} from 'react-select'
import {getGenreOptions} from '../genres'
import CheckboxIcon from './CheckboxIcon'

const genreOptions = getGenreOptions()

type FilterProps = {
  onChange: (selectedOptions: any) => void
}

export default function Filter({onChange}: FilterProps) {
  const [selectedOptions, setSelectedOptions] = useState(genreOptions)

  function onSelectChange(option, {action}) {
    if (!option) return

    const newOptions = action === 'clear' ? genreOptions : option

    onChange(newOptions)

    setSelectedOptions(newOptions)
  }
  return (
    <FilterContainer>
      <Label>Genres</Label>
      <Select
        options={genreOptions}
        value={selectedOptions}
        isMulti
        isClearable={genreOptions.length !== selectedOptions.length}
        isSearchable={false}
        onChange={onSelectChange}
        placeholder="Filter by Genre..."
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{Option, ValueContainer, MultiValue, Placeholder}}
      />
    </FilterContainer>
  )
}

const FilterContainer = styled.div``

const Label = styled.div`
  font-weight: bolder;
  margin-bottom: 4px;
  color: #545454;
`

function getFilterText(options: string[], selectedOptions: string[]) {
  const notSelectedOptions = options.filter(
    (label) => !selectedOptions.includes(label)
  )

  if (
    selectedOptions.length === options.length ||
    selectedOptions.length === 0
  ) {
    return `All`
  }
  if (selectedOptions.length === 1) {
    return `Only ${selectedOptions[0]}`
  }

  if (selectedOptions.length === 2) {
    return `Only ${selectedOptions[0]} & ${selectedOptions[1]}`
  }

  if (notSelectedOptions.length <= 2) {
    return `All except ${notSelectedOptions.join(', ')}`
  }

  if (notSelectedOptions.length < options.length / 2) {
    return `Excluded ${notSelectedOptions.length}`
  }

  return ` ${selectedOptions.length} Selected`
}

function MultiValue() {
  return <></>
}

function Placeholder() {
  return <></>
}

function ValueContainer(props) {
  const {getValue, options, children} = props
  const selectedOptions: any[] = (getValue() || []).map(({label}) => label)

  const text = getFilterText(
    options.map(({label}) => label),
    selectedOptions
  )

  return (
    <components.ValueContainer {...props}>
      <ValueContainerText>{text}</ValueContainerText>
      {children}
    </components.ValueContainer>
  )
}

const ValueContainerText = styled.span`
  color: white;
`

function Option({children, isSelected, ...props}: OptionProps<any>) {
  return (
    <components.Option isSelected={isSelected} {...props}>
      <CheckboxIcon isSelected={isSelected} /> {children}
    </components.Option>
  )
}

const Select = styled(ReactSelect).attrs({classNamePrefix: 'react_select'})`
  width: 400px;
  margin-bottom: 10px;

  .react_select__option {
    width: 50%;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .react_select__menu-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-height: 500px !important;
  }

  .react_select__value-container {
    padding-right: 0px;
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
    background-color: #e50a15 !important;
  }

  .react_select__option--is-selected {
    background-color: #333333;
  }

  .react_select__indicator-separator {
    background-color: #777777;
  }
`
