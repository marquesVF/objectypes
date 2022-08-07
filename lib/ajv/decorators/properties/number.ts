import { saveMetadata } from '../../utils/metadata'

import { ArrayOptions, NumberOptions } from './types'

export function NumberProperty(options?: NumberOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'number'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}

export function NumberArrayProperty(
  options: ArrayOptions & NumberOptions = {}
): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'array'
    const { nullable, ...numberOptions } = options

    saveMetadata(className, {
      expectedType,
      propertyName,
      options: {
        nullable,
      },
      itemPropertyOptions: {
        expectedType: 'number',
        options: numberOptions,
      },
    })
  }
}
