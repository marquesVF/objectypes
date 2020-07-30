import { Metadata } from '../core/metadata'
import { PropertyOptions } from '../types/property-options'
import { PropertyMetadata } from '../types'

export function Property(options?: PropertyOptions): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const metadata: PropertyMetadata = {
            name: options?.name ?? propertyKey as string,
            propertyKey: propertyKey as string,
            type: options?.type,
            nullable: options?.nullable,
            target
        }

        Metadata.getInstance().registerMetadata(klassName, metadata)
    }
}
