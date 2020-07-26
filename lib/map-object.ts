import { Metadata } from './core/metadata'
import { Hashable, ClassConstructor } from './types'

export function mapObject<T, K>(
    targetKlass: ClassConstructor<Hashable & T>,
    objKlass: ClassConstructor<K>,
    obj: Hashable & K
): T {
    const targetObj = new targetKlass()
    const mappedProperties = Metadata.getInstance()
        .findMapProperties<T>(targetKlass)
        ?.filter(property => property.mapTarget.name === objKlass.name)

    // eslint-disable-next-line no-unused-expressions
    mappedProperties?.forEach(property => {
        const { mapPropertyKey, propertyKey } = property
        const value = obj[mapPropertyKey]

        Reflect.set(targetObj, propertyKey, value)
    })

    // Get regular properties ignoring mappedProperties
    const mappedKeys = mappedProperties?.map(mapped => mapped.propertyKey)
    const properties = Metadata.getInstance()
        .findProperties(targetKlass)
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
