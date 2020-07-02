import { PropertyMetadata } from './types/property-metadata'

export class Metadata {

    private static _instance = new Metadata()

    readonly propertyMetadata: Map<string, PropertyMetadata[]> = new Map()

    static getInstance(): Metadata {
        return Metadata._instance
    }

    registerMetadata(klassName: string, metadata: PropertyMetadata) {
        const properties = this.propertyMetadata.get(klassName)

        if (!properties) {
            this.propertyMetadata.set(klassName, [metadata])
        } else {
            properties.push(metadata)
        }
    }

}
