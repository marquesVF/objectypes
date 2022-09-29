import { JSONSchemaType } from 'ajv'

import { PropertyMetadata } from '../utils/metadata'

export function generateObjectSchema<T>(
  metadata: Array<PropertyMetadata<T>>,
  properties: object
): JSONSchemaType<Record<string, T>> {
  const required = findRequiredProperties(metadata)

  return {
    additionalProperties: false,
    type: 'object',
    properties,
    required: required as never[],
  } as JSONSchemaType<Record<string, T>>
}

function findRequiredProperties<T>(metadata: Array<PropertyMetadata<T>>) {
  return metadata
    .filter(meta => meta.options?.nullable !== true)
    .map(meta => meta.propertyName)
}
