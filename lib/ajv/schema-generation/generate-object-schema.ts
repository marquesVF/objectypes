import { PropertyMetadata } from '../utils/metadata'

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp] extends string
  ? 'string'
  : TObj[TProp] extends number
  ? 'number'
  : TObj[TProp] extends boolean
  ? 'boolean'
  : TObj[TProp] extends boolean[]
  ? 'booleanArray'
  : TObj[TProp] extends object[]
  ? 'objectArray'
  : TObj[TProp] extends string[]
  ? 'stringArray'
  : TObj[TProp] extends number[]
  ? 'numberArray'
  : TObj[TProp] extends any[]
  ? 'array'
  : TObj[TProp] extends object
  ? 'object'
  : undefined

// It reflects more or less the type found in ajv
export type ObjectSchema<T> = {
  // additionalProperties: boolean
  // type: 'object'
  [key in keyof T]: {
    type: PropType<T, key>
    nullable: key extends keyof Required<T> ? false : true
  }
  // required: Array<keyof Required<T>>
}

export function generateObjectSchema<T>(
  metadata: Array<PropertyMetadata<T>>,
  properties: object
): ObjectSchema {
  const required = findRequiredProperties(metadata)

  return {
    // additionalProperties: false,
    type: 'object',
    properties,
    required,
  }
}

function findRequiredProperties<T>(metadata: Array<PropertyMetadata<T>>) {
  return metadata
    .filter(meta => meta.options?.nullable !== true)
    .map(meta => meta.options?.name ?? meta.propertyName)
}
