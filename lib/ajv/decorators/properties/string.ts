import { saveMetadata } from '../../utils/metadata'

import { ArrayOptions, StringOptions } from './types'

export function StringProperty(options?: StringOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'string'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}

export function StringArrayProperty(
  options: ArrayOptions & StringOptions = {}
): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'array'
    const { nullable, ...stringOptions } = options

    saveMetadata(className, {
      type: expectedType,
      propertyName,
      options: {
        nullable,
      },
      itemPropertyOptions: {
        expectedType: 'string',
        options: stringOptions,
      },
    })
  }
}
