import { buildObject } from '../lib'

import data from './data.json'
import { runBenchmark } from './helpers'
import { BenchmarkData } from './types/objectypes-object'

const average = runBenchmark(() => buildObject(BenchmarkData, data))

// eslint-disable-next-line no-console
console.log(`Objectypes average time is ${average}ms`)
