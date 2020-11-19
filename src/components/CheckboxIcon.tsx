import React from 'react'
import styled from 'styled-components'

export default function CheckboxIcon({isSelected}) {
  if (isSelected) {
    return (
      <IconSvg>
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
      </IconSvg>
    )
  }
  return (
    <IconSvg>
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
    </IconSvg>
  )
}

const IconSvg = styled.svg.attrs({viewBox: '0 0 24 24'})`
  fill: white;
  margin-right: 4px;
  width: 24px;
`
