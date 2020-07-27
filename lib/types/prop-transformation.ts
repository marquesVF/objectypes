export type TransformationFunction<T, K> = (value: T) => K

export type TransformationScope = 'extract' | 'build'

export interface PropTransformer<T, K> {
    scope: TransformationScope
    transform: TransformationFunction<T, K>
}

export interface TransformationMetadata<T, K> {
    propTransform: PropTransformer<T, K>
    propertyKey: string
}
