export type Movie = {
  id: string
  title: string
  year: number
  genres: string[]
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
