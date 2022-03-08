import { PropertyMetadata } from '../types'

import { castValue } from './cast-value'

export function castValueBasedOnExpectedTypeName(
  propertyMetadata: PropertyMetadata,
  value?: any
) {
  const { propertyName, expectedTypeName, defaultValue } = propertyMetadata
  const valueWithDefaultValue = value ?? defaultValue

  try {
    const castedValue = castValue(expectedTypeName, valueWithDefaultValue)

    return castedValue
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line max-len
      `Property ${propertyName} type is not assignable to ${expectedTypeName}. Found ${valueWithDefaultValue}`
    )
  }
}
