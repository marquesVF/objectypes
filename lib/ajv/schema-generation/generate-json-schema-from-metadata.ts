import { getClassName } from '../utils/class-constructors'
import { findMetadata, PropertyMetadata } from '../utils/metadata'

import { generateArrayProperty } from './generate-array-property'
import { generateObjectSchema, ObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateJsonSchemaFromMetadata<T>(
  metadata: Array<PropertyMetadata<T>>
): ObjectSchema {
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
      const nestedObjectJsonSchema: ObjectSchema =
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
