import { saveMetadata } from '../../utils/metadata'

import { StringOptions } from './types'

export function StringProperty(options?: StringOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'string'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}
