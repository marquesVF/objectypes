import { PropertyOptions } from '../types/property-options'
import { Metadata } from '../metadata'
import { PropertyMetadata } from '../types/property-metadata'

export function Property(options?: PropertyOptions): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: PropertyMetadata = {
            name: options?.name ?? propertyKey as string,
            propertyKey: propertyKey as string,
            type: options?.type
        }

        Metadata.getInstance().registerMetadata(klassName, metadata)
    }
}
