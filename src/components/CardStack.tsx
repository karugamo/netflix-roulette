import {times} from 'lodash'
import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'
import MovieThumbnail from './MovieThumbnail'

type CardStackProps = {
  movies: Movie[]
  topPosition: number
  spinPosition: number
}

export default function CardStack({
  movies,
  topPosition,
  spinPosition
}: CardStackProps) {
  return (
    <Container>
      {times(positions.length).map((pos) => (
        <CardContainer
          key={`pos-${pos}`}
          style={getStyleForPosition(topPosition + pos)}
        >
          <MovieThumbnail movie={movies[topPosition + pos]} />
        </CardContainer>
      ))}
    </Container>
  )
}

const positions: React.CSSProperties[] = [
  {
    transform:
      'perspective(0px) rotateZ(0deg) rotateX(0deg) translateZ(0px) scale(1)',
    display: 'flex'
  },
  {
    transform:
      'perspective(0px) rotateZ(1deg) translateX(0px) translateY(40px) translateZ(-10px) rotateX(0deg) scale(0.9)',
    display: 'flex',
    pointerEvents: 'none'
  },
  {
    transform:
      'perspective(0px) rotateZ(2deg) translateX(0px) translateY(80px) translateZ(-20px) rotateX(0deg)scale(0.8)',
    display: 'flex',
    pointerEvents: 'none'
  },
  {
    transform:
      'perspective(0px) rotateZ(2deg) translateX(0px) translateY(80px) translateZ(-20px) rotateX(0deg)scale(0.8)',
    display: 'none',
    pointerEvents: 'none'
  },
  {
    transform:
      'perspective(0px) rotateZ(-20deg) rotateX(0deg) translateZ(10px) translateY(-500px) scale(1)',
    opacity: 0,
    display: 'flex',
    pointerEvents: 'none'
  }
]

function getStyleForPosition(position: number) {
  return positions[position % positions.length]
}

const Container = styled.div`
  position: relative;
  width: 872px;
  @media (max-width: 872px) {
    width: 100vw;
  }
  height: 600px;
  transform-style: preserve-3d;
`

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 0.5s ease-out, opacity 0.5s ease-in;
  transform-origin: 0 0;
`
