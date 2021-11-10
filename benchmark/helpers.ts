export function runBenchmark<T>(fn: () => T) {
  const executionTimes = executeMultipleTimes(10000, () =>
    measureExecutionTimeInMilliseconds(fn)
  )
  const sum = executionTimes.reduce((a, b) => a + b, 0)

  return sum / executionTimes.length
}

function executeMultipleTimes<T>(executions: number, fn: () => T) {
  const executionResults: T[] = []
  for (let i = 0; i < executions; i++) {
    executionResults.push(fn())
  }

  return executionResults
}

function measureExecutionTimeInMilliseconds(fn: Function) {
  const start = process.hrtime()
  fn()
  const end = process.hrtime(start)

  return end[1] / 1000000
}
