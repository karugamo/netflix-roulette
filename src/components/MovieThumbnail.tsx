import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'

export default function MovieThumbnail({movie}: {movie: Movie}) {
  const {title, image, genres, rating, year, id} = movie
  return (
    <Container>
      <Link href={`https://www.netflix.com/title/${id}`}>
        <Title>
          {title} ({year})
        </Title>
        <Image width="479" src={image} />
      </Link>
      <Genres>Genres: {genres.join(', ')}</Genres>
      <Rating>ImdB: {rating}</Rating>
    </Container>
  )
}

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`

const Title = styled.h2``

const Rating = styled.div``

const Genres = styled.div``

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Image = styled.img``
