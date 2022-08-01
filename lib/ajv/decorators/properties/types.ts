export type SharedOptions = {
  nullable?: boolean
}

export type NumberOptions = SharedOptions & {
  maximum?: number
  minimum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export type NumberPropertyOptions = {
  expectedType: 'number'
  options?: NumberOptions
}
