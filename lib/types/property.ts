import { ClassConstructor } from './class-constructor'
import { Hashable } from './hashable'

export type BuildFn = (jsonObject: Hashable) => unknown

export interface PropertyBuilder {
    build: BuildFn
}

export interface PropertyOptions {
    name?: string
    type?: ClassConstructor<any>
    nullable?: true
    builder?: PropertyBuilder | BuildFn
}

export interface PropertyMetadata extends PropertyOptions {
    propertyKey: string
    target: Object
}

