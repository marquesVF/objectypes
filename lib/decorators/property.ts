import { Metadata } from '../core/metadata'
import { PropertyOptions } from '../types/property'
import { PropertyMetadata } from '../types'

export function Property(options?: PropertyOptions): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: PropertyMetadata = {
            propertyKey: propertyKey as string,
            target,
            ...options
        }

        Metadata.getInstance().registerMetadata(klassName, metadata)
    }
}
