import { assocPath } from 'ramda'

import { findClassPropertiesMetadata } from './core/metadata/property'
import { findClassTransformationMetadata } from './core/metadata/transformation'
import { Hashable, ClassConstructor } from './types'
import { ExtractOptions } from './types/extract-options'

export function extractObject<T>(
  obj: Hashable & T,
  objKlass: ClassConstructor<T>,
  options?: ExtractOptions
): object {
  let resultingObject: Hashable = {}
  const propertyMetadata = findClassPropertiesMetadata(
    objKlass,
    options?.namedOnly
  )
  const transformations = findClassTransformationMetadata(objKlass, 'extract')

  if (propertyMetadata) {
    for (const { name, propertyKey, type } of propertyMetadata) {
      let value = obj[propertyKey]

      if (value !== undefined) {
        if (type) {
          if (Array.isArray(value)) {
            value = value.map(val => extractObject(val, type))
          } else {
            value = extractObject(value, type)
          }
        }

        const transformMetadata = transformations?.find(
          metadata => metadata.propertyKey === propertyKey
        )
        if (transformMetadata) {
          // TODO improve error handling since it may raise errors in runtine
          value = transformMetadata.transformer.transform(value)
        }

        const resultingProperty = name ?? propertyKey

        resultingObject = assocPath(
          resultingProperty.split('.'),
          value,
          resultingObject
        )
      }
    }
  }

  return resultingObject
}
