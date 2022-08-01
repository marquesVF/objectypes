import { saveMetadata } from '../../utils/metadata'

import { SharedOptions } from './types'

export function BooleanProperty(options?: SharedOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'boolean'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}
