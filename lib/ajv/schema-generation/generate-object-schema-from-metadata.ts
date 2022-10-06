import { getClassName } from '../utils/class-constructors'
import { findMetadata, PropertyMetadata } from '../utils/metadata'

import { generateArrayProperty } from './generate-array-property'
import { generateObjectSchema, ObjectSchema } from './generate-object-schema'
import { generatePrimitiveProperty } from './generate-primitive-property'

export function generateObjectSchemaFromMetadata<T>(
  metadata: Array<PropertyMetadata<T>>
): ObjectSchema {
  const properties = metadata.reduce((prev, curr) => {
    const propertyValue =
      generatePrimitiveProperty(curr) ?? generateArrayProperty(curr)
    const propertyName = curr.options?.name ?? curr.propertyName

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
        generateObjectSchemaFromMetadata(typeMetadata)

      return {
        ...prev,
        [propertyName]: nestedObjectJsonSchema,
      }
    }

    return {
      ...prev,
      [propertyName]: propertyValue,
    }
  }, {})

  return generateObjectSchema(metadata, properties)
}
