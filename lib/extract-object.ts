import { assocPath } from 'ramda'

import { findClassPropertiesMetadata } from './core/metadata/property'
import { findClassTransformationMetadata } from './core/metadata/transformation'
import { Hashable, ClassConstructor, PropertyMetadata } from './types'
import { ExtractOptions } from './types/extract-options'

export function extractObject<T>(
  typedObject: Hashable & T,
  typedObjectClass: ClassConstructor<T>,
  options?: ExtractOptions
): object {
  let jsonObject: Hashable = {}
  const propertyMetadatas = findClassPropertiesMetadata(
    typedObjectClass,
    options?.namedOnly
  )

  if (propertyMetadatas) {
    for (const propertyMetadata of propertyMetadatas) {
      const { name, propertyKey, type } = propertyMetadata
      const value = typedObject[propertyKey]

      if (value === undefined) {
        continue
      }

      const transformedValue = applyTransformationsToObject(
        typedObjectClass,
        propertyMetadata,
        value
      )
      const finalValue = processNestedValue(transformedValue, type)
      const resultingProperty = name ?? propertyKey

      jsonObject = assocPath(
        resultingProperty.split('.'),
        finalValue,
        jsonObject
      )
    }
  }

  return jsonObject
}

function applyTransformationsToObject<T>(
  objectClass: ClassConstructor<T>,
  propertyMetadata: PropertyMetadata,
  value?: any
) {
  const { propertyKey } = propertyMetadata
  const transformationMetadatas = findClassTransformationMetadata(
    objectClass,
    'extract'
  )
  const transformationMetadata = transformationMetadatas?.find(
    metadata => metadata.propertyKey === propertyKey
  )

  if (!transformationMetadata) {
    return value
  }

  return transformationMetadata.transformer.transform(value)
}

function processNestedValue(value: any, type?: any) {
  if (!type) {
    return value
  }

  return Array.isArray(value)
    ? (value = value.map(val => extractObject(val, type)))
    : extractObject(value, type)
}
