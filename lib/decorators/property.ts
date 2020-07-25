import { PropertyOptions } from '../types/property-options'
import { Metadata } from '../core/metadata'
import { PropertyMetadata } from '../types/property-metadata'

export function Property(options?: PropertyOptions): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: PropertyMetadata = {
            name: options?.name ?? propertyKey as string,
            propertyKey: propertyKey as string,
            type: options?.type,
            nullable: options?.nullable
        }

        Metadata.getInstance().registerMetadata(klassName, metadata)
    }
}
