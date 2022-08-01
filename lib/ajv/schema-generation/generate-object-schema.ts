import { JSONSchemaType } from 'ajv'

import { PropertyMetadata } from '../utils/metadata'

export function generateObjectSchema(
  metadata: PropertyMetadata[],
  properties: object
): JSONSchemaType<Record<string, unknown>> {
  const required = findRequiredProperties(metadata)

  return {
    additionalProperties: false,
    type: 'object',
    properties,
    required: required as never[],
  } as JSONSchemaType<Record<string, unknown>>
}

function findRequiredProperties(metadata: PropertyMetadata[]) {
  return metadata
    .filter(meta => meta.options?.nullable !== true)
    .map(meta => meta.propertyName)
}
