import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'
import SpinButton from './SpinButton'
import ISO6391 from 'iso-639-1'

type MovieThumbnnailProps = {
  movie: Movie
  onSpin: () => void
}

export default function MovieThumbnail({movie, onSpin}: MovieThumbnnailProps) {
  const {
    title,
    image,
    genres,
    rating,
    year,
    id,
    runtime,
    spokenLanguages
  } = movie
  const netflixLink = `https://www.netflix.com/title/${id}`

  return (
    <Container>
      <ImageLink target="_blank" href={netflixLink}>
        <Image key={image} src={image} />
      </ImageLink>
      <RightContainer>
        <Info>
          <Link target="_blank" href={netflixLink}>
            <Title>
              {title} ({year})
            </Title>
          </Link>
          <Heading>GENRES</Heading>
          <Data>
            {genres.map((genre, index) => (
              <>
                <span>{genre}</span>
                {index < genres.length - 1 && <Dot> • </Dot>}
              </>
            ))}
          </Data>
          <Divider />
          <Heading>IMDB RATING</Heading>
          <Data>{rating?.toFixed(1)}</Data>
          <Divider />
          <Heading>RUNTIME</Heading>
          <Data>{formatDuration(runtime)}</Data>
          <Divider />
          <Heading>LANGUAGES</Heading>
          <Data>
            {spokenLanguages
              ?.map(ISO6391.getName)
              .filter((code) => code)
              .slice(0, 4)
              .join(', ')}
          </Data>
          <Divider />
        </Info>
        <SpinButtonContainer>
          <SpinButton onPress={onSpin} />
        </SpinButtonContainer>
      </RightContainer>
    </Container>
  )
}

function formatDuration(totalMinutes: number): string {
  var hours = totalMinutes / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)

  if (rhours === 0) return `${rminutes}min`

  return `${rhours}h ${rminutes}min`
}

const Link = styled.a`
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: none;
`

const ImageLink = styled.a``

const Dot = styled.span`
  color: #7a7a7a;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 400px;
  height: 585px;
  padding: 5px 20px;
  padding-left: 30px;
  padding-bottom: 5px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 80%;
`

const SpinButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 20%;
  padding-bottom: 20px;
`

const Title = styled.h2`
  font-size: 30px;
  text-decoration: none;
  height: 105px;
`

const Data = styled.div``

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
  width: 422px;
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
