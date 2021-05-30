import { TransformationMetadata } from '../types/transformation'
import { Metadata } from '../core/metadata'
import { BuildTransformer } from '../types'

export function BuildTransformation<T>(
  transformer: BuildTransformer<T>
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name

    const metadata: TransformationMetadata<unknown, T> = {
      scope: 'build',
      propertyKey: propertyKey.toString(),
      transformer
    }

    Metadata.getInstance().registerTransformationMetadata(klassName, metadata)
  }
}
