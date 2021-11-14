import { buildObject } from '../lib'
import data from './data.json'
import { FilmResults } from './types/FilmResults'

describe('buildObject', () => {
  it('FilmResults object matches snapshot', () => {
    const filmResults = buildObject(FilmResults, data)

    expect(filmResults).toMatchSnapshot()
  })
})
