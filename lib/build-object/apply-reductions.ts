import { ClassConstructor, Hashable } from '..'
import { findClassReductionMetadata } from '../metadata/reduction'
import { PropertyMetadata } from '../types'

export function applyReductionsToObject<T>(
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
