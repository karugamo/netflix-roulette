import React from 'react'
import styled from 'styled-components'

export default function SpinButton({onPress}) {
  return <Button onClick={onPress}>SPIN</Button>
}

const Button = styled.button`
  all: unset;
  margin: 50px;
  padding: 5px 20px;
  background-color: #2975ee;
  color: white;
  border-radius: 5px;
  font-size: 40px;
  cursor: pointer;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  user-select: none;

  :active {
    transform: translate(5px, 5px);
    box-shadow: 0px 0px rgba(0, 0, 0, 0.2);
    background-color: #2469d5;
  }

  transition-property: transform, box-shadow;
  transition-duration: 0.1s;
`
