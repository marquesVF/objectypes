/* eslint-disable complexity */
import { path } from 'ramda'

import { findClassPropertiesMetadata } from './core/metadata/property'
import { findClassReductionMetadata } from './core/metadata/reduction'
import { findClassTransformationMetadata } from './core/metadata/transformation'
import { Hashable, ClassConstructor, PropertyMetadata } from './types'
import { castValue } from './utils/casting'

export function buildObject<T>(
  targetKlass: ClassConstructor<Hashable & T>,
  jsonObj: Hashable
): T {
  const targetObj = new targetKlass()
  const properties = findClassPropertiesMetadata(targetKlass)

  if (!properties) {
    return targetObj
  }

  for (const property of properties) {
    const { propertyKey, name, type, nullable } = property
    const objPropName = name ?? propertyKey
    const appliedReductions = applyReductionsToObject(
      targetKlass,
      targetObj,
      jsonObj,
      property
    )
    if (appliedReductions) {
      continue
    }

    const value =
      path<any>(objPropName.split('.'), jsonObj) !== undefined
        ? path<any>(objPropName.split('.'), jsonObj)
        : path<any>([propertyKey], jsonObj)

    if (value === undefined && !nullable) {
      throw new Error(
        // eslint-disable-next-line max-len
        `Property '${objPropName}' is missing. Couldn't build ${targetKlass.name} object.`
      )
    }

    const typedValue = processValueType(property, value)
    const transformedValue = applyTransformationsToObject(
      targetKlass,
      property,
      typedValue
    )

    if (type && transformedValue !== undefined) {
      const nestedValue = Array.isArray(transformedValue)
        ? transformedValue.map(val => buildObject(type, val))
        : buildObject(type, transformedValue)

      Reflect.set(targetObj, propertyKey, nestedValue)
    } else {
      Reflect.set(targetObj, propertyKey, transformedValue)
    }
  }

  return targetObj
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
