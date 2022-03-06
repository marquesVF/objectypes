import { ClassConstructor, PropertyMetadata } from '../types'

export function validateValueDefinition(
  propertyMetadata: PropertyMetadata,
  targetClass: ClassConstructor<any>,
  value?: any
) {
  const { nullable, name, propertyKey, defaultValue } = propertyMetadata
  const objPropName = name ?? propertyKey
  const valueShouldBePresent = !nullable && defaultValue === undefined

  if (value === undefined && valueShouldBePresent) {
    throw new Error(
      `Property '${objPropName}' is missing. Couldn't build ${targetClass.name} object.`
    )
  }
}
