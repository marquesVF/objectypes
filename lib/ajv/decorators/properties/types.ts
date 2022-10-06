import { ClassConstructor } from '../../types'

export type ArrayOptions = SharedOptions & {
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
}

export type ArrayPropertyOptions<T> = {
  expectedType: 'array'
  options?: SharedOptions
  itemPropertyOptions: PropertyOptions<T>
}

export type BooleanPropertyOptions = {
  expectedType: 'boolean'
  options?: SharedOptions
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

export type ObjectOptions<T> = SharedOptions & {
  type: ClassConstructor<T>
}

export type ObjectPropertyOptions<T> = {
  expectedType: 'object'
  options?: ObjectOptions<T>
}

export type PropertyOptions<T> =
  | ArrayPropertyOptions<T>
  | BooleanPropertyOptions
  | NumberPropertyOptions
  | ObjectPropertyOptions<T>
  | StringPropertyOptions

export type SharedOptions = {
  name?: string
  nullable?: boolean
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
