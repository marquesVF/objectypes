/* eslint-disable no-console */
import { buildObject } from '../lib'

import data from './data.json'
import {
  executeMultipleTimes,
  measureExecutionTimeInMilliseconds,
} from './helpers'
import { BenchmarkData } from './types/objectypes-object'

const executionTimes = executeMultipleTimes(1000, () =>
  measureExecutionTimeInMilliseconds(() => buildObject(BenchmarkData, data))
)
const sum = executionTimes.reduce((a, b) => a + b, 0)
const avg = sum / executionTimes.length || 0

console.log(`Objectypes average time is ${avg}ms`)
