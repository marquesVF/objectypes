import { PropertyOptions } from '../types/property-options'
import { Metadata } from '../metadata'
import { PropertyMetadata } from '../types/property-metadata'

export function Property(options: PropertyOptions): PropertyDecorator {
    const { name } = options

    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: PropertyMetadata = {
            name: name ?? propertyKey as string,
            propertyKey: propertyKey as string
        }

        Metadata.getInstance().registerMetadata(klassName, metadata)
    }
}
