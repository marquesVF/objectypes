import { ClassConstructor, PropertyMetadata } from '../types'

export function validateValueDefinition(
  propertyMetadata: PropertyMetadata,
  targetClass: ClassConstructor<any>,
  value?: any
) {
  const { nullable, propertyName, defaultValue } = propertyMetadata
  const valueShouldBePresent = !nullable && defaultValue === undefined

  if (value === undefined && valueShouldBePresent) {
    throw new Error(
      `Property '${propertyName}' is missing. Couldn't build ${targetClass.name} object.`
    )
  }
}
