import { path } from 'ramda'

import { Hashable, PropertyMetadata } from '../types'

export function extractValueFromJSONObject(
  propertyMetadata: PropertyMetadata,
  jsonObject: Hashable
) {
  const { name, propertyKey } = propertyMetadata
  const objectPropertyName = name ?? propertyKey

  if (!objectPropertyName.includes('.')) {
    return jsonObject[objectPropertyName] ?? jsonObject[propertyKey]
  }

  const namePath = objectPropertyName.split('.')
  const valueFromPath = path<any>(namePath, jsonObject)

  return valueFromPath ?? path<any>([propertyKey], jsonObject)
}
