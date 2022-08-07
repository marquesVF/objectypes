import { JSONSchemaType } from 'ajv'

import { PropertyMetadata } from '../utils/metadata'

import { generateArrayProperty } from './generate-array-property'
import { generateObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateJsonSchemaFromMetadata(
  metadata: PropertyMetadata[]
): JSONSchemaType<Record<string, unknown>> {
  const properties = metadata.reduce((prev, curr) => {
    const propertyValue =
      generatePrimitiveProperty(curr) ?? generateArrayProperty(curr)

    return {
      ...prev,
      [curr.propertyName]: propertyValue,
    }
  }, {})

  return generateObjectSchema(metadata, properties)
}
