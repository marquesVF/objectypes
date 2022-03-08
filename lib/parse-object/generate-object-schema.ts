import { PropertyMetadata } from '../types'

export function generateObjectSchema(propertyMetadata: PropertyMetadata[]) {
  if (!propertyMetadata.length) {
    return
  }

  const requiredProperties = extractRequiredPropertyNames(propertyMetadata)
}

function extractProperties(propertyMetadata: PropertyMetadata[]) {
  return propertyMetadata.map(property => {
    const propertySchema = {}
    const { propertyName, expectedTypeName } = property

    Reflect.set(propertySchema, propertyName, {
      type: expectedTypeName,
    })
  })
}

function extractRequiredPropertyNames(propertyMetadata: PropertyMetadata[]) {
  return propertyMetadata
    .filter(property => property.nullable !== true)
    .map(property => property.name ?? property.propertyKey)
}
