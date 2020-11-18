import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {cleanEnv, str} from 'envalid'

export const env = cleanEnv(process.env, {
  TMDB_KEY: str()
})

export function load(name: string) {
  return require(`../data/${name}.json`)
}

export function save(name: string, data: any) {
  writeFileSync(
    resolve(__dirname, `../data/${name}.json`),
    JSON.stringify(data, null, ' ')
  )
}
