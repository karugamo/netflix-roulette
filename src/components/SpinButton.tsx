import React from 'react'
import {useTranslation} from 'react-i18next'
import Button from './Button'

export default function SpinButton({onPress}) {
  const {t} = useTranslation()
  return <Button onClick={onPress}>{t('spin')}</Button>
}
