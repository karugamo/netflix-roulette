import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

export default function SpinButton({onPress}) {
  const {t} = useTranslation()
  return <Button onClick={onPress}>{t('spin')}</Button>
}

const Button = styled.button`
  all: unset;
  text-transform: uppercase;
  padding: 5px 20px;
  background-color: #e50a15;
  width: 90%;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  font-size: 28px;
  height: 47px;
  cursor: pointer;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  text-align: center;

  :active {
    transform: translate(0px, 5px);
    box-shadow: 0 -5px 10px 10px rgba(0, 0, 0, 0.1);
    background-color: #a00505;
  }

  transition-property: transform, box-shadow;
  transition-duration: 0.1s;
`
