import {
  TransformationMetadata,
  ExtractTransformer,
} from '../types/transformation'
import { saveClassTransformationMetadata } from '../core/metadata/transformation'

export function ExtractTransformation<T, K>(
  transformer: ExtractTransformer<T, K>
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name

    const metadata: TransformationMetadata<T, K> = {
      scope: 'extract',
      propertyKey: propertyKey.toString(),
      transformer,
    }

    saveClassTransformationMetadata(klassName, metadata)
  }
}
