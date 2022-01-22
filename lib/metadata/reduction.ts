import { ClassConstructor } from '../types/class-constructor'
import { ReductionMetadata } from '../types'

const reducerMetadata: Map<string, Array<ReductionMetadata<any>>> = new Map()

export function saveClassReductionMetadata<T>(
  className: string,
  metadata: ReductionMetadata<T>
) {
  const properties = reducerMetadata.get(className)

  if (!properties) {
    reducerMetadata.set(className, [metadata])
  } else {
    properties.push(metadata)
  }
}

export function findClassReductionMetadata<T>(
  klass: ClassConstructor<T>
): Array<ReductionMetadata<any>> | undefined {
  const klassName = klass.name ?? klass.constructor.name

  return reducerMetadata.get(klassName)
}
