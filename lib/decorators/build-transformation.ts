import { TransformationMetadata } from '../types/transformation'
import { BuildTransformer } from '../types'
import { saveClassTransformationMetadata } from '../metadata/transformation'

export function BuildTransformation<T>(
  transformer: BuildTransformer<T>
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name

    const metadata: TransformationMetadata<unknown, T> = {
      scope: 'build',
      propertyKey: propertyKey.toString(),
      transformer,
    }

    saveClassTransformationMetadata(klassName, metadata)
  }
}
