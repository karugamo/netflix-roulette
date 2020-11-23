export type Movie = {
  id: string
  title: {[language: string]: string}
  year: number
  genres: number[]
  rating: number
  image: string
  runtime: number
  ids?: any
  spokenLanguages?: any
  originalLanguage?: string
}

export type Option = {
  label: string
  value: string | number
}
