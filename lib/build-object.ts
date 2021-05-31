import { path } from 'ramda'

import { findClassPropertiesMetadata } from './core/metadata/property'
import { findClassReductionMetadata } from './core/metadata/reduction'
import { findClassTransformationMetadata } from './core/metadata/transformation'
import { Hashable, ClassConstructor, PropertyMetadata } from './types'
import { castValue } from './utils/casting'

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
    const { propertyKey } = propertyMetadata
    const wereReductionsApplied = applyReductionsToObject(
      targetClass,
      targetObject,
      jsonObject,
      propertyMetadata
    )

    if (wereReductionsApplied) {
      continue
    }

    const value = getValueFromJSONObject(propertyMetadata, jsonObject)
    validateValueDefinition(propertyMetadata, targetClass, value)

    const typedValue = processValueType(propertyMetadata, value)
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

function processValueType(propertyMetadata: PropertyMetadata, value?: any) {
  const { name, target, propertyKey } = propertyMetadata
  const objPropName = name ?? propertyKey
  const expectedType = Reflect.getMetadata(
    'design:type',
    target,
    propertyKey
  ).name

  try {
    const castedValue = castValue(expectedType, value)

    return castedValue
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line max-len
      `Property ${objPropName} type is not assignable to ${expectedType}. Found ${value}`
    )
  }
}

function applyReductionsToObject<T>(
  targetClass: ClassConstructor<Hashable & T>,
  targetObject: Hashable & T,
  jsonObject: Hashable,
  { propertyKey }: PropertyMetadata
) {
  const reductions = findClassReductionMetadata(targetClass)
  const reductionMetada = reductions?.find(
    metadata => metadata.propertyKey === propertyKey
  )

  if (!reductionMetada) {
    return false
  }

  const value = reductionMetada.reducer.reduce(jsonObject)
  Reflect.set(targetObject, propertyKey, value)

  return true
}

function getValueFromJSONObject(
  propertyMetadata: PropertyMetadata,
  jsonObject: Hashable
) {
  const { name, propertyKey } = propertyMetadata
  const objectPropertyName = name ?? propertyKey
  const namePath = objectPropertyName.split('.')
  const valueFromPath = path<any>(namePath, jsonObject)

  return valueFromPath ?? path<any>([propertyKey], jsonObject)
}

function validateValueDefinition(
  propertyMetadata: PropertyMetadata,
  targetClass: ClassConstructor<any>,
  value?: any
) {
  const { nullable, name, propertyKey } = propertyMetadata
  const objPropName = name ?? propertyKey

  if (value === undefined && !nullable) {
    throw new Error(
      `Property '${objPropName}' is missing. Couldn't build ${targetClass.name} object.`
    )
  }
}

function applyTransformationsToObject<T>(
  targetClass: ClassConstructor<Hashable & T>,
  { propertyKey }: PropertyMetadata,
  value?: any
) {
  if (value === undefined) {
    return value
  }

  const transformations = findClassTransformationMetadata(targetClass, 'build')
  const transformMetadata = transformations?.find(
    metadata => metadata.propertyKey === propertyKey
  )
  if (!transformMetadata) {
    return value
  }

  return transformMetadata.transformer.transform(value)
}

function processNestedValue(
  propertyMetadata: PropertyMetadata,
  transformedValue?: any
) {
  const { type } = propertyMetadata

  if (type === undefined) {
    return transformedValue
  }

  return Array.isArray(transformedValue)
    ? transformedValue.map(val => buildObject(type, val))
    : buildObject(type, transformedValue)
}
