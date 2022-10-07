import { saveMetadata } from '../../utils/metadata'

import { ArrayOptions, NumberOptions } from './types'

export function NumberProperty(options?: NumberOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'number'

    saveMetadata(className, { propertyName, type: expectedType, options })
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
      type: expectedType,
      propertyName,
      options: {
        nullable,
      },
      itemPropertyOptions: {
        type: 'number',
        options: numberOptions,
      },
    })
  }
}
