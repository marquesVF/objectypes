import { path } from 'ramda'

import { Hashable, PropertyMetadata } from '../types'

export function extractValueFromJsonObject(
  propertyMetadata: PropertyMetadata,
  jsonObject: Hashable
) {
  const { propertyName, propertyKey } = propertyMetadata
  if (!propertyName.includes('.')) {
    return jsonObject[propertyName] ?? jsonObject[propertyKey]
  }

  const namePath = propertyName.split('.')
  const valueFromPath = path<any>(namePath, jsonObject)

  return valueFromPath ?? path<any>([propertyKey], jsonObject)
}
