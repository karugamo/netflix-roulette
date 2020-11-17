import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'

export default function MovieThumbnail({movie}: {movie: Movie}) {
  const {title, image, genres, rating, year, id} = movie
  return (
    <Container>
      <Link target="_blank" href={`https://www.netflix.com/title/${id}`}>
        <Title>
          {title} ({year})
        </Title>
        <Image src={image} />
      </Link>
      <Info>
        <Genres>Genres: {genres.join(', ')}</Genres>
        <Rating>ImdB: {rating}</Rating>
      </Info>
    </Container>
  )
}

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  margin-top: 5px;
  height: 30px;
`

const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  height: 30px;
`

const Rating = styled.div``

const Genres = styled.div``

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 479px;
`
const Image = styled.img`
  height: 400px;
`
