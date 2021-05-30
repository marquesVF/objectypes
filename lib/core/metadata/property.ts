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
  const className = klass.name ?? klass.constructor.name
  const properties = propertyMetadata.get(className)

  if (!properties) {
    return undefined
  }

  const parentClassPropertiesMetadata = findParentClassPropertiesMetadata(
    klass,
    namedOnly
  )

  const classProperties = filterClassPropertiesIfNamed(properties, namedOnly)

  if (parentClassPropertiesMetadata !== undefined) {
    return [...classProperties, ...parentClassPropertiesMetadata]
  }

  return classProperties
}

function findParentClassPropertiesMetadata(
  klass: ClassConstructor<any>,
  namedOnly?: boolean
) {
  const parentKlass = findParentClass(klass)
  if (parentKlass === undefined) {
    return
  }

  const parentProperties = findClassPropertiesMetadata(parentKlass, namedOnly)

  return parentProperties
}

function filterClassPropertiesIfNamed(
  properties: PropertyMetadata[],
  namedOnly?: boolean
) {
  return namedOnly ? properties.filter(property => property.name) : properties
}

function findParentClass(klass: ClassConstructor<any>) {
  return klass.prototype ? Object.getPrototypeOf(klass.prototype) : undefined
}
