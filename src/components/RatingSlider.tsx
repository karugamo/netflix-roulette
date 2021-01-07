import React from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'
import {times} from 'lodash'
import Label from './Label'

export default function RatingSlider({value, onChange, label}) {
  return (
    <Container>
      <Label>{label}</Label>
      <RangeContainer>
        <Range
          value={value}
          onChange={onChange}
          min={1}
          max={10}
          marks={times(10).reduce(
            (marks, n) => ({...marks, [n + 1]: `${n + 1}`}),
            {}
          )}
          dots
          trackStyle={[{backgroundColor: '#242422'}]}
          handleStyle={[
            {border: 'solid 2px #242422'},
            {border: 'solid 2px #242422'}
          ]}
          activeDotStyle={{border: 'solid 2px #242422'}}
        />
      </RangeContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 25px;

  @media (max-width: 871px) {
    margin-left: 0;
    max-width: 400px;
    width: 100%;
  }

  @media (max-width: 400px) {
    width: 90vw;
  }
`

const RangeContainer = styled.div`
  max-width: 390px;
  height: 50px;
  width: 100%;
  margin-top: 5px;
  margin-left: 5px;

  @media (max-width: 400px) {
    width: 96%;
  }
`
