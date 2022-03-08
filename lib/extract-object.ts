import { assocPath } from 'ramda'

import { findClassPropertiesMetadata } from './metadata/property'
import { findClassTransformationMetadata } from './metadata/transformation'
import { Hashable, ClassConstructor, PropertyMetadata } from './types'
import { ExtractOptions } from './types/extract-options'

export function extractObject<T>(
  object: Hashable & T,
  objectClass: ClassConstructor<T>,
  options?: ExtractOptions
): object {
  const propertyMetadatas = findClassPropertiesMetadata(
    objectClass,
    options?.namedOnly
  )
  if (!propertyMetadatas) {
    return {}
  }

  return generateExtractedObject(object, objectClass, propertyMetadatas)
}

function generateExtractedObject(
  object: Hashable,
  objectClass: ClassConstructor<any>,
  propertyMetadatas: PropertyMetadata[]
) {
  return propertyMetadatas.reduce((acc, propertyMetadata) => {
    const { propertyName, propertyKey, type, defaultValue } = propertyMetadata
    const value = object[propertyKey] ?? defaultValue

    if (value === undefined) {
      return acc
    }

    const transformedValue = applyTransformationsToObject(
      objectClass,
      propertyMetadata,
      value
    )
    const finalValue = processNestedValue(transformedValue, type)

    return assocPath(propertyName.split('.'), finalValue, acc)
  }, {})
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
