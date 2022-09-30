import { JSONSchemaType } from 'ajv'

import { getClassName } from '../utils/class-constructors'
import { findMetadata, PropertyMetadata } from '../utils/metadata'

import { generateArrayProperty } from './generate-array-property'
import { generateObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateJsonSchemaFromMetadata<T extends object>(
  metadata: Array<PropertyMetadata<T>>
): JSONSchemaType<T> {
  const properties = metadata.reduce((prev, curr) => {
    const propertyValue =
      generatePrimitiveProperty(curr) ?? generateArrayProperty(curr)

    if (curr.expectedType === 'object') {
      if (!curr.options) {
        throw new Error('Object options was not provided')
      }

      const className = getClassName(curr.options.type)
      const typeMetadata = findMetadata<T>(className)

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
