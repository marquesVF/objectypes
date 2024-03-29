import { PropertyMetadata } from '../types'

import { castValue } from './cast-value'

export function processValueType(
  propertyMetadata: PropertyMetadata,
  value?: any
) {
  const { name, target, propertyKey, defaultValue } = propertyMetadata
  const valueWithDefaultValue = value ?? defaultValue
  const objPropName = name ?? propertyKey
  const expectedType = Reflect.getMetadata(
    'design:type',
    target,
    propertyKey
  ).name

  try {
    const castedValue = castValue(expectedType, valueWithDefaultValue)

    return castedValue
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line max-len
      `Property ${objPropName} type is not assignable to ${expectedType}. Found ${valueWithDefaultValue}`
    )
  }
}
