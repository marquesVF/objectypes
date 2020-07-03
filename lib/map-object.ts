import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './metadata'
import { Hashable } from './types/hashable'

export function mapObject<T, K>(
    targetClass: ClassConstructor<Hashable & T>,
    objClass: ClassConstructor<K>,
    obj: Hashable & K
): T {
    const targetObj = new targetClass()
    const mappedProperties = Metadata.getInstance()
        .findMapProperties<T>(targetClass)
        ?.filter(property => property.mapTarget.name === objClass.name)

    // eslint-disable-next-line no-unused-expressions
    mappedProperties?.forEach(property => {
        const { mapPropertyKey, propertyKey } = property
        const value = obj[mapPropertyKey]

        Reflect.set(targetObj, propertyKey, value)
    })

    // Get regular properties ignoring mappedProperties
    const mappedKeys = mappedProperties?.map(mapped => mapped.propertyKey)
    const properties = Metadata.getInstance()
        .findProperties(targetClass)
        ?.filter(property => {
            if (mappedKeys) {
                // Avoid duplicated properties
                return !mappedKeys.includes(property.propertyKey)
            }

            return true
        })

    // eslint-disable-next-line no-unused-expressions
    properties?.forEach(property => {
        const { propertyKey } = property

        Reflect.set(targetObj, propertyKey, obj[propertyKey])
    })

    return targetObj
}
