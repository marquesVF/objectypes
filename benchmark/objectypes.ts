import { buildObject } from '../lib'

import data from './data.json'
import { runBenchmark } from './helpers'
import { FilmResults } from './types/FilmResults'

const filmResultsAverage = runBenchmark(() => buildObject(FilmResults, data))

// eslint-disable-next-line no-console
console.log(`Film Results average time is ${filmResultsAverage}ms`)
