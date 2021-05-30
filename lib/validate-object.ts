import { path } from 'ramda'

import { ClassConstructor } from './types'
import { Metadata } from './core/metadata'
import { isTypeValid } from './core/type-validator'
import { ValidationErrors, TypeError } from './types/validation-errors'

export function validateObject<T>(
  klass: ClassConstructor<T>,
  obj: unknown
): ValidationErrors {
  const presenceErrors: string[] = []
  const typeErrors: TypeError[] = []
  const properties = Metadata.getInstance().findProperties(klass)

  if (properties) {
    properties.forEach(property => {
      const { name, propertyKey, nullable, type, target } = property

      const jsonPropertyName = name ?? propertyKey

      const value = path(jsonPropertyName.split('.'), obj)

      // Property presence validation
      if (value === undefined && !nullable) {
        // eslint-disable-next-line max-len
        presenceErrors.push(jsonPropertyName)
      }

      // Nested object property validation
      if (type && !nullable) {
        const validateNestedObject = (val: unknown) => {
          const { presenceErrors, typeErrors } = validateObject(type, val)
          presenceErrors.push(...presenceErrors)
          typeErrors.push(...typeErrors)
        }

        if (Array.isArray(value)) {
          value.forEach(validateNestedObject)
        } else {
          validateNestedObject(value)
        }
      }

      // Property primitive type validation
      if (!type && value !== undefined) {
        const typeError = isTypeValid(target, propertyKey, value)
        if (typeError) {
          typeErrors.push(typeError)
        }
      }
    })
  }

  return { presenceErrors, typeErrors }
}
