import React from 'react'
import styled from 'styled-components'

export default function SpinButton({onPress}) {
  return <Button onClick={onPress}>SPIN</Button>
}

const Button = styled.button`
  all: unset;
  padding: 5px 20px;
  background-color: #e50a15;
  width: 90%;
  color: white;
  border-radius: 5px;
  font-size: 40px;
  cursor: pointer;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  user-select: none;
  text-align: center;

  :active {
    transform: translate(5px, 5px);
    box-shadow: 0px 0px rgba(0, 0, 0, 0.2);
    background-color: #a00505;
  }

  transition-property: transform, box-shadow;
  transition-duration: 0.1s;
`
