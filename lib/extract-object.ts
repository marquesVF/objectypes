import { assocPath } from 'ramda'

import { findClassPropertiesMetadata } from './core/metadata/property'
import { findClassTransformationMetadata } from './core/metadata/transformation'
import { Hashable, ClassConstructor, PropertyMetadata } from './types'
import { ExtractOptions } from './types/extract-options'

export function extractObject<T>(
  obj: Hashable & T,
  objKlass: ClassConstructor<T>,
  options?: ExtractOptions
): object {
  let resultingObject: Hashable = {}
  const propertyMetadatas = findClassPropertiesMetadata(
    objKlass,
    options?.namedOnly
  )

  if (propertyMetadatas) {
    for (const propertyMetadata of propertyMetadatas) {
      const { name, propertyKey, type } = propertyMetadata
      let value = obj[propertyKey]

      if (value !== undefined) {
        if (type) {
          if (Array.isArray(value)) {
            value = value.map(val => extractObject(val, type))
          } else {
            value = extractObject(value, type)
          }
        }

        const transformedValue = applyTransformationsToObject(
          objKlass,
          propertyMetadata,
          value
        )
        const resultingProperty = name ?? propertyKey

        resultingObject = assocPath(
          resultingProperty.split('.'),
          transformedValue,
          resultingObject
        )
      }
    }
  }

  return resultingObject
}

function applyTransformationsToObject<T>(
  targetClass: ClassConstructor<T>,
  propertyMetadata: PropertyMetadata,
  value?: any
) {
  const { propertyKey } = propertyMetadata
  const transformations = findClassTransformationMetadata(
    targetClass,
    'extract'
  )

  const transformMetadata = transformations?.find(
    metadata => metadata.propertyKey === propertyKey
  )
  if (!transformMetadata) {
    return value
  }

  return transformMetadata.transformer.transform(value)
}
