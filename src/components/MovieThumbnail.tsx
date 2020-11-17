import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'
import SpinButton from './SpinButton'

type MovieThumbnnailProps = {
  movie: Movie
  onSpin: () => void
}

export default function MovieThumbnail({movie, onSpin}: MovieThumbnnailProps) {
  const {title, image, genres, rating, year, id} = movie
  const netflixLink = `https://www.netflix.com/title/${id}`

  return (
    <Container>
      <ImageLink target="_blank" href={netflixLink}>
        <Image src={image} />
      </ImageLink>
      <RightContainer>
        <Info>
          <Link target="_blank" href={netflixLink}>
            <Title>
              {title} ({year})
            </Title>
          </Link>
          <Heading>GENRES</Heading>
          <Genres>{genres.join(', ')}</Genres>
          <Divider />
          <Heading>RATING</Heading>
          <Rating>{rating?.toFixed(1)}</Rating>
          <Divider />
        </Info>
        <SpinButtonContainer>
          <SpinButton onPress={onSpin} />
        </SpinButtonContainer>
      </RightContainer>
    </Container>
  )
}

const Link = styled.a`
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: none;
`

const ImageLink = styled.a``

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 400px;
  height: 585px;
  padding: 5px 20px;
  padding-left: 30px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 60%;
`

const SpinButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 33%;
  padding-bottom: 7%;
`

const Title = styled.h2`
  font-size: 30px;
  text-decoration: none;
  height: 105px;
`

const Rating = styled.div``

const Genres = styled.div``

const Container = styled.div`
  height: 600px;
  display: flex;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
`

const Image = styled.img`
  border-radius: 10px 0px 0px 10px;
  height: 100%;
`

const Heading = styled.h3`
  font-size: 14px;
  color: #ddd;
`

const Divider = styled.hr`
  width: 90%;
  margin-right: 10%;
  border-color: #777;
`
