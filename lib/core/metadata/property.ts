import { ClassConstructor, PropertyMetadata } from '../../types'

const propertyMetadata: Map<string, PropertyMetadata[]> = new Map()

export function savePropertyMetadata(
  className: string,
  metadata: PropertyMetadata
) {
  const properties = propertyMetadata.get(className)

  if (!properties) {
    propertyMetadata.set(className, [metadata])
  } else {
    properties.push(metadata)
  }
}

export function findClassPropertiesMetadata(
  klass: ClassConstructor<any>,
  namedOnly?: boolean
): PropertyMetadata[] | undefined {
  const klassName = klass.name ?? klass.constructor.name
  const properties = propertyMetadata.get(klassName)

  if (!properties) {
    return undefined
  }

  const filteredProperty = namedOnly
    ? properties.filter(property => property.name)
    : properties

  const parentKlass = klass.prototype
    ? Object.getPrototypeOf(klass.prototype)
    : undefined
  if (parentKlass !== undefined) {
    const parentProperties = findClassPropertiesMetadata(parentKlass, namedOnly)

    if (parentProperties !== undefined) {
      return [...filteredProperty, ...parentProperties]
    }
  }

  return filteredProperty
}
