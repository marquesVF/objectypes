import { ClassConstructor } from './class-constructor'
import { MapTransformer } from './transformation'

export interface MapPropertyMetadata<T, K> {
    mapTarget: ClassConstructor<T>
    mapPropertyKey?: string
    mapTransformer?: MapTransformer<T, K>
    propertyKey: string
}
