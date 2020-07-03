import { PropertyMetadata } from './types/property-metadata'
import { ClassConstructor } from './types/class-constructor'

export class Metadata {

    private static _instance = new Metadata()

    readonly propertyMetadata: Map<string, PropertyMetadata[]> = new Map()

    static getInstance(): Metadata {
        return Metadata._instance
    }

    registerMetadata(className: string, metadata: PropertyMetadata) {
        const properties = this.propertyMetadata.get(className)

        if (!properties) {
            this.propertyMetadata.set(className, [metadata])
        } else {
            properties.push(metadata)
        }
    }

    findProperties(
        klass: ClassConstructor<any>
    ): PropertyMetadata[] | undefined {
        const klassName = klass.name ?? klass.constructor.name
        const properties = this.propertyMetadata.get(klassName)

        if (!properties) {
            return undefined
        }

        const parentKlass = klass.prototype
            ? Object.getPrototypeOf(klass.prototype)
            : undefined
        if (parentKlass !== undefined) {
            const parentProperties = this.findProperties(parentKlass)

            if (parentProperties !== undefined) {
                return [...properties, ...parentProperties]
            }
        }

        return properties
    }

}
