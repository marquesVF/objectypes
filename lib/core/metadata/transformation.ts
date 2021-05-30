import {
  ClassConstructor,
  TransformationMetadata,
  TransformationScope,
} from '../../types'

type TransformationMetadataArray = Array<TransformationMetadata<any, any>>
type TransformationMetadataMap = Map<string, TransformationMetadataArray>

const transformationMetadata: TransformationMetadataMap = new Map()

export function saveClassTransformationMetadata<T, K>(
  className: string,
  metadata: TransformationMetadata<T, K>
) {
  const classTransformationMetadata = transformationMetadata.get(className)

  if (!classTransformationMetadata) {
    transformationMetadata.set(className, [metadata])
  } else {
    classTransformationMetadata.push(metadata)
  }
}

export function findClassTransformationMetadata<T, K>(
  klass: ClassConstructor<T>,
  scope: TransformationScope
): Array<TransformationMetadata<T, K>> | undefined {
  const className = klass.name ?? klass.constructor.name
  const classTransformationMetadata = transformationMetadata.get(className)

  return classTransformationMetadata?.filter(
    metadata => metadata.scope === scope
  )
}
