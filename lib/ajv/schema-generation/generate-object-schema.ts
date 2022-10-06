import { PropertyMetadata } from '../utils/metadata'

// It reflects more or less the type found in ajv
export type ObjectSchema = {
  additionalProperties: boolean
  type: 'object'
  properties: object
  required: string[]
}

export function generateObjectSchema<T>(
  metadata: Array<PropertyMetadata<T>>,
  properties: object
): ObjectSchema {
  const required = findRequiredProperties(metadata)

  return {
    additionalProperties: false,
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
