import { JSONSchemaType } from 'ajv'

import { PropertyMetadata } from '../utils/metadata'

import { generateObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateJsonSchemaFromMetadata(
  metadata: PropertyMetadata[]
): JSONSchemaType<Record<string, unknown>> {
  const properties = metadata.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.propertyName]: generatePrimitiveProperty(curr),
    }
  }, {})

  return generateObjectSchema(metadata, properties)
}
