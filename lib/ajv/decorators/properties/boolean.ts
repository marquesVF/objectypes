import { saveMetadata } from '../../utils/metadata'

import { ArrayOptions, SharedOptions } from './types'

export function BooleanProperty(options?: SharedOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'boolean'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}

export function BooleanArrayProperty(
  options: ArrayOptions = {}
): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'array'

    saveMetadata(className, {
      expectedType,
      propertyName,
      options,
      itemPropertyOptions: {
        expectedType: 'boolean',
      },
    })
  }
}
