import {cleanEnv, str} from 'envalid'

export const env = cleanEnv(process.env, {
  TMDB_KEY: str()
})
