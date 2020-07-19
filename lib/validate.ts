import { path } from 'ramda'

import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './utils/metadata'
import { ValidationResult } from './types/validation-result'

export function validate<T>(
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
                errors.push(`'${jsonPropertyName} is missing'`)
            }

            if (type && !nullable) {
                if (Array.isArray(value)) {
                    value.forEach(val => errors.push(...validate(type, val)))
                } else {
                    errors.push(...validate(type, value))
                }
            }
        })
    }

    return errors
}

export function isValid<T>(
    klass: ClassConstructor<T>,
    obj: unknown
): ValidationResult {
    const errors = validate(klass, obj)
    const valid = errors.length === 0

    return { valid, errors: valid ? undefined : errors }
}
