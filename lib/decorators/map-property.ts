import { Metadata } from '../core/metadata'
import { ClassConstructor, MapPropertyMetadata } from '../types'

export function MapProperty<T>(
    klass: ClassConstructor<T>,
    propKey: keyof T
): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: MapPropertyMetadata<T> = {
            mapTarget: klass,
            mapPropertyKey: propKey.toString(),
            propertyKey: propertyKey as string
        }

        Metadata.getInstance().registerMapMetadata(klassName, metadata)
    }
}
