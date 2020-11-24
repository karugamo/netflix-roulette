import React from 'react'
import styled from 'styled-components'
import {Movie} from '../types'
import {useTranslation} from 'react-i18next'
import {getGenreName, getLanguageName} from '../i18n'

type MovieThumbnnailProps = {
  movie: Movie
  onSpin: () => void
}

export default function MovieThumbnail({movie}: MovieThumbnnailProps) {
  const {t, i18n} = useTranslation()

  const {
    title,
    image,
    genres,
    rating,
    year,
    id,
    runtime,
    originalLanguage
  } = movie
  const netflixLink = `https://www.netflix.com/title/${id}`

  return (
    <Container>
      <ImageLink target="_blank" href={netflixLink}>
        <Image key={image} src={image} alt={title[i18n.language]} />
      </ImageLink>
      <RightContainer>
        <Info>
          <Link target="_blank" href={netflixLink}>
            <Title>{title[i18n.language]}</Title>
            <Year>({year})</Year>
          </Link>
          <Heading>{t('movie.section.genres')}</Heading>
          <Data>
            {genres.map((genre, index) => (
              <span key={genre}>
                <span>{getGenreName(genre)}</span>
                {index < genres.length - 1 && <Dot> • </Dot>}
              </span>
            ))}
          </Data>
          <Divider />
          <Heading>{t('movie.section.imdbRating')}</Heading>
          <Data>{rating?.toFixed(1)}</Data>
          <Divider />
          <Heading>{t('movie.section.runtime')}</Heading>
          <Data>{formatDuration(runtime)}</Data>
          <Divider />
          <Heading>{t('movie.section.originalLanguage')}</Heading>
          <Data>{getLanguageName(originalLanguage)}</Data>
          <Divider />
        </Info>
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
  @media (max-width: 872px) {
    width: 90vw;
    padding: 5vw;
    height: initial;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 80%;
`

const Title = styled.h2<{children: string}>`
  font-size: ${({children}) => children.length * -0.1875 + 43.75}px;
  text-decoration: none;
  margin-bottom: 0;
  margin-top: 10px;
`

const Year = styled.h3`
  font-weight: lighter;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.8);
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
  @media (max-width: 872px) {
    display: none;
  }
`

const Heading = styled.h3`
  text-transform: uppercase;
  font-size: 14px;
  color: #ddd;
`

const Divider = styled.hr`
  width: 90%;
  margin-right: 10%;
  border-color: #777;
`
