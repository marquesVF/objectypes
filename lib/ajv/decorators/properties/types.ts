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

export type StringOptions = SharedOptions & {
  maxLength?: number
  minLength?: number
  pattern?: RegExp
}

export type StringPropertyOptions = {
  expectedType: 'string'
  options?: StringOptions
}

export type BooleanPropertyOptions = {
  expectedType: 'boolean'
  options?: SharedOptions
}

export type PropertyOptions =
  | NumberPropertyOptions
  | StringPropertyOptions
  | BooleanPropertyOptions
