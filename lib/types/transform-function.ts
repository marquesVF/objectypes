export type TransformFunction<T, K> = (value: T) => K

export type TransformationScope = 'extract' | 'build'

export interface TransformationMetadata<T, K> {
    fn: TransformFunction<T, K>
    scope: TransformationScope
    propertyKey: string
}
