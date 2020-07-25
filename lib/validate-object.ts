import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './utils/metadata'

import { path } from 'ramda'

export function validateObject<T>(
    klass: ClassConstructor<T>,
    obj: unknown
): string[] {
    const errors: string[] = []
    const properties = Metadata.getInstance().findProperties(klass)

    if (properties) {
        properties.forEach(property => {
            const { name, propertyKey, nullable, type } = property
            const jsonPropertyName = name ?? propertyKey

            const value = path([jsonPropertyName], obj)

            if (value === undefined && !nullable) {
                // eslint-disable-next-line max-len
                errors.push(jsonPropertyName)
            }

            if (type && !nullable) {
                if (Array.isArray(value)) {
                    value.forEach(val => errors.push(...validateObject(type, val)))
                } else {
                    errors.push(...validateObject(type, value))
                }
            }
        })
    }

    return errors
}
