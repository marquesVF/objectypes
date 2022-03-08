import { findClassPropertiesMetadata } from '../metadata/property'
import { Hashable, ClassConstructor, PropertyMetadata } from '../types'

import { applyReductionsToObject } from './apply-reductions'
import { applyTransformationsToObject } from './apply-transformations-to-object'
import { extractValueFromJsonObject } from './extract-value-from-json'
import { castValueBasedOnExpectedTypeName } from './cast-value-based-on-expected-type-name'
import { validateValueDefinition } from './validate-value-definition'

export function buildObject<T>(
  targetClass: ClassConstructor<Hashable & T>,
  jsonObject: Hashable
): T {
  const targetObject = new targetClass()
  const propertyMetadatas = findClassPropertiesMetadata(targetClass)

  if (!propertyMetadatas) {
    return targetObject
  }

  for (const propertyMetadata of propertyMetadatas) {
    const { propertyKey, nullable } = propertyMetadata
    const wereReductionsApplied = applyReductionsToObject(
      targetClass,
      targetObject,
      jsonObject,
      propertyMetadata
    )

    if (wereReductionsApplied) {
      continue
    }

    const value = extractValueFromJsonObject(propertyMetadata, jsonObject)
    if (nullable && !value) {
      continue
    }

    validateValueDefinition(propertyMetadata, targetClass, value)

    const typedValue = castValueBasedOnExpectedTypeName(propertyMetadata, value)
    const transformedValue = applyTransformationsToObject(
      targetClass,
      propertyMetadata,
      typedValue
    )
    const finalValue = processNestedValue(propertyMetadata, transformedValue)

    Reflect.set(targetObject, propertyKey, finalValue)
  }

  return targetObject
}

function processNestedValue(
  propertyMetadata: PropertyMetadata,
  transformedValue?: any
) {
  const { type } = propertyMetadata

  if (type === undefined || type === Date) {
    return transformedValue
  }

  return Array.isArray(transformedValue)
    ? transformedValue.map(val => buildObject(type, val))
    : buildObject(type, transformedValue)
}
