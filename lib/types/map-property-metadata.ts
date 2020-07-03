import { ClassConstructor } from './class-constructor'

export interface MapPropertyMetadata<T> {
    mapTarget: ClassConstructor<T>
    mapPropertyKey: string
    propertyKey: string
}
