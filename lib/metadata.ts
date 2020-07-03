import { PropertyMetadata } from './types/property-metadata'
import { ClassConstructor } from './types/class-constructor'
import { MapPropertyMetadata } from './types/map-property-metadata'

export class Metadata {

    private static _instance = new Metadata()

    readonly propertyMetadata: Map<string, PropertyMetadata[]> = new Map()
    // eslint-disable-next-line max-len
    readonly mapPropertyMetadata: Map<string, Array<MapPropertyMetadata<any>>> = new Map()

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

    // eslint-disable-next-line max-len
    registerMapMetadata<T>(className: string, metadata: MapPropertyMetadata<T>) {
        const properties = this.mapPropertyMetadata.get(className)

        if (!properties) {
            this.mapPropertyMetadata.set(className, [metadata])
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

    findMapProperties<T>(
        klass: ClassConstructor<T>
    ): Array<MapPropertyMetadata<T>> | undefined {
        const klassName = klass.name ?? klass.constructor.name
        const properties = this.mapPropertyMetadata.get(klassName)

        if (!properties) {
            return undefined
        }

        const parentKlass = klass.prototype
            ? Object.getPrototypeOf(klass.prototype)
            : undefined
        if (parentKlass !== undefined) {
            const parentProperties = this.findMapProperties(parentKlass)

            if (parentProperties !== undefined) {
                return [...properties, ...parentProperties]
            }
        }

        return properties
    }

}
