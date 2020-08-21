import { PropertyMetadata } from '../types/property-metadata'
import { ClassConstructor } from '../types/class-constructor'
import { MapPropertyMetadata } from '../types/map-property-metadata'
import { TransformationMetadata, TransformationScope }
    from '../types/transformation'

// TODO refactor this class - too many similar code
export class Metadata {

    private static _instance = new Metadata()

    readonly propertyMetadata: Map<string, PropertyMetadata[]> = new Map()
    // eslint-disable-next-line max-len
    readonly mapPropertyMetadata: Map<string, Array<MapPropertyMetadata<any, any>>> = new Map()
    // eslint-disable-next-line max-len
    readonly transformationMetadata: Map<string, Array<TransformationMetadata<any, any>>> = new Map()

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

    registerMapMetadata<T, K>(
        className: string,
        metadata: MapPropertyMetadata<T, K>
    ) {
        const properties = this.mapPropertyMetadata.get(className)

        if (!properties) {
            this.mapPropertyMetadata.set(className, [metadata])
        } else {
            properties.push(metadata)
        }
    }

    registerTransformationMetadata<T, K>(
        className: string,
        metadata: TransformationMetadata<T, K>
    ) {
        const properties = this.transformationMetadata.get(className)

        if (!properties) {
            this.transformationMetadata.set(className, [metadata])
        } else {
            properties.push(metadata)
        }
    }

    findProperties(
        klass: ClassConstructor<any>,
        namedOnly?: boolean
    ): PropertyMetadata[] | undefined {
        const klassName = klass.name ?? klass.constructor.name
        const properties = this.propertyMetadata.get(klassName)

        if (!properties) {
            return undefined
        }

        const filteredProperty = namedOnly
            ? properties.filter(property => property.name)
            : properties

        const parentKlass = klass.prototype
            ? Object.getPrototypeOf(klass.prototype)
            : undefined
        if (parentKlass !== undefined) {
            const parentProperties = this.findProperties(parentKlass, namedOnly)

            if (parentProperties !== undefined) {
                return [...filteredProperty, ...parentProperties]
            }
        }

        return filteredProperty
    }

    findMapProperties<T, K>(
        klass: ClassConstructor<T>
    ): Array<MapPropertyMetadata<T, K>> | undefined {
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

    findTransformations<T, K>(
        klass: ClassConstructor<T>,
        scope: TransformationScope
    ): Array<TransformationMetadata<T, K>> | undefined {
        const klassName = klass.name ?? klass.constructor.name

        return this.transformationMetadata
            .get(klassName)
            ?.filter(metadata => metadata.scope === scope)
    }

}
