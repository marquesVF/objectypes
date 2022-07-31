export type BuildTransformationFn<T> = (value: any) => T

export interface BuildTransformer<T> {
  transform: BuildTransformationFn<T>
}

export type TransformationScope = 'extract' | 'build'

export interface TransformationMetadata<T> {
  scope: TransformationScope
  transformer: BuildTransformer<T>
  propertyKey: string
}

export interface MapTransformer<T, K> {
  transform: (obj: T) => K
}
