import { saveMetadata } from '../../utils/metadata'

import { NumberOptions } from './types'

export function Number(options?: NumberOptions): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const className = target.constructor.name
    const propertyName = String(key)
    const expectedType = 'number'

    saveMetadata(className, { propertyName, expectedType, options })
  }
}
