import { ClassConstructor, PropertyMetadata } from '../../types'

import { findParentClass } from './utils'

const propertyMetadata: Map<string, PropertyMetadata[]> = new Map()

export function saveClassPropertyMetadata(
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

  return parentClassPropertiesMetadata
    ? [...classProperties, ...parentClassPropertiesMetadata]
    : classProperties
}

function findParentClassPropertiesMetadata(
  klass: ClassConstructor<any>,
  namedOnly?: boolean
) {
  const parentClass = findParentClass(klass)
  if (parentClass === undefined) {
    return
  }

  return findClassPropertiesMetadata(parentClass, namedOnly)
}

function filterClassPropertiesIfNamed(
  properties: PropertyMetadata[],
  namedOnly?: boolean
) {
  return namedOnly ? properties.filter(property => property.name) : properties
}
