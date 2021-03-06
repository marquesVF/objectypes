export type BuildTransformationFn<T> = (value: any) => T

export interface BuildTransformer<T> {
  transform: BuildTransformationFn<T>
}

export type ExtractTransformationFn<T, K> = (value: T) => K

export interface ExtractTransformer<T, K> {
  transform: ExtractTransformationFn<T, K>
}

export type TransformationScope = 'extract' | 'build'

export interface TransformationMetadata<T, K> {
  scope: TransformationScope
  transformer: BuildTransformer<K> | ExtractTransformer<T, K>
  propertyKey: string
}

export interface MapTransformer<T, K> {
  transform: (obj: T) => K
}
