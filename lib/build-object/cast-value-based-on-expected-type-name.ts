import { PropertyMetadata } from '../types'

import { castValue } from './cast-value'

export function castValueBasedOnExpectedTypeName(
  propertyMetadata: PropertyMetadata,
  value?: any
) {
  const { name, expectedTypeName, propertyKey, defaultValue } = propertyMetadata
  const valueWithDefaultValue = value ?? defaultValue
  const objPropName = name ?? propertyKey

  try {
    const castedValue = castValue(expectedTypeName, valueWithDefaultValue)

    return castedValue
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line max-len
      `Property ${objPropName} type is not assignable to ${expectedTypeName}. Found ${valueWithDefaultValue}`
    )
  }
}
