import 'reflect-metadata'

import { ClassConstructor } from './types'
import { Metadata } from './core/metadata'
import { isTypeValid } from './core/type-validator'

import { path } from 'ramda'

export function validateObject<T>(
    klass: ClassConstructor<T>,
    obj: unknown
): string[] {
    const errors: string[] = []
    const properties = Metadata.getInstance().findProperties(klass)

    if (properties) {
        properties.forEach(property => {
            const { name, propertyKey, nullable, type, target } = property

            const jsonPropertyName = name ?? propertyKey

            const value = path([jsonPropertyName], obj)

            // Property presence validation
            if (value === undefined && !nullable) {
                // eslint-disable-next-line max-len
                errors.push(jsonPropertyName)
            }

            // Nested object property validation
            if (type && !nullable) {
                if (Array.isArray(value)) {
                    value.forEach(val =>
                        errors.push(...validateObject(type, val)))
                } else {
                    errors.push(...validateObject(type, value))
                }
            }

            // Property primitive type validation
            if (!type && value !== undefined) {
                if (!isTypeValid(target, propertyKey, value)) {
                    errors.push(jsonPropertyName)
                }
            }
        })
    }

    return errors
}
