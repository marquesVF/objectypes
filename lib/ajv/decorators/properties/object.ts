import { saveMetadata } from '../../utils/metadata'

import { ArrayOptions, ObjectOptions } from './types'

export function ObjectProperty<T extends object>(
  options: ObjectOptions<T>
): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'object'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}

export function ObjectArrayProperty<T extends object>(
  options: ArrayOptions & ObjectOptions<T>
): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'array'
    const { nullable, ...objectOptions } = options

    saveMetadata(className, {
      expectedType,
      propertyName,
      options: {
        nullable,
      },
      itemPropertyOptions: {
        expectedType: 'object',
        options: objectOptions,
      },
    })
  }
}
