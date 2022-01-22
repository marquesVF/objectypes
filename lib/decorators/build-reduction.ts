import { saveClassReductionMetadata } from '../metadata/reduction'
import { Reducer, ReductionMetadata } from '../types/reduction'

export function BuildReduction<T>(reducer: Reducer<T>): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const className = target.constructor.name

    const metadata: ReductionMetadata<T> = {
      propertyKey: propertyKey.toString(),
      reducer,
    }

    saveClassReductionMetadata(className, metadata)
  }
}
