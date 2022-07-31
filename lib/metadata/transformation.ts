import {
  ClassConstructor,
  TransformationMetadata,
  TransformationScope,
} from '../types'

type TransformationMetadataArray = Array<TransformationMetadata<any>>
type TransformationMetadataMap = Map<string, TransformationMetadataArray>

const transformationMetadata: TransformationMetadataMap = new Map()

export function saveClassTransformationMetadata<T>(
  className: string,
  metadata: TransformationMetadata<T>
) {
  const classTransformationMetadata = transformationMetadata.get(className)

  if (!classTransformationMetadata) {
    transformationMetadata.set(className, [metadata])
  } else {
    classTransformationMetadata.push(metadata)
  }
}

export function findClassTransformationMetadata<T>(
  klass: ClassConstructor<T>,
  scope: TransformationScope
): Array<TransformationMetadata<T>> | undefined {
  const className = klass.name ?? klass.constructor.name
  const classTransformationMetadata = transformationMetadata.get(className)

  return classTransformationMetadata?.filter(
    metadata => metadata.scope === scope
  )
}
