import { ClassConstructor, Hashable } from '..'
import { findClassTransformationMetadata } from '../metadata/transformation'
import { PropertyMetadata } from '../types'

export function applyTransformationsToObject<T>(
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
