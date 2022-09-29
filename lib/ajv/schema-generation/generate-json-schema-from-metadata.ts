import { JSONSchemaType } from 'ajv'

import { findMetadata, PropertyMetadata } from '../utils/metadata'

import { generateArrayProperty } from './generate-array-property'
import { generateObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateJsonSchemaFromMetadata<T>(
  metadata: Array<PropertyMetadata<T>>
): JSONSchemaType<Record<string, T>> {
  const properties = metadata.reduce((prev, curr) => {
    const propertyValue =
      generatePrimitiveProperty(curr) ?? generateArrayProperty(curr)

    if (curr.expectedType === 'object') {
      if (!curr.options) {
        throw new Error('Object options was not provided')
      }

      const obj = curr.options.type()
      // FIXME remove this type casting
      const className = (new obj() as any).constructor.name
      const typeMetadata = findMetadata(className)

      if (!typeMetadata) {
        throw new Error(`Not metadata found for class ${className}`)
      }
      const nestedObjectJsonSchema =
        generateJsonSchemaFromMetadata(typeMetadata)

      return {
        ...prev,
        [curr.propertyName]: nestedObjectJsonSchema,
      }
    }

    return {
      ...prev,
      [curr.propertyName]: propertyValue,
    }
  }, {})

  return generateObjectSchema(metadata, properties)
}
