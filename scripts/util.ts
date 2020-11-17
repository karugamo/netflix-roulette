import {writeFileSync} from 'fs'
import {resolve} from 'path'
import got from 'got'

export function save(name: string, data: any) {
  writeFileSync(
    resolve(__dirname, `../data/${name}.json`),
    JSON.stringify(data, null, ' ')
  )
}
