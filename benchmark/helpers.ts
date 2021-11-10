export function executeMultipleTimes<T>(executions: number, fn: () => T) {
  const returns: T[] = []
  for (let i = 0; i < executions; i++) {
    returns.push(fn())
  }

  return returns
}

export function measureExecutionTimeInMilliseconds(fn: Function) {
  const start = process.hrtime()
  fn()
  const end = process.hrtime(start)

  return end[1] / 1000000
}
