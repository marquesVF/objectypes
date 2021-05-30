import { ClassConstructor, MapPropertyMetadata } from '../../types'

import { findParentClass } from './utils'

type MapPropertyMetadataArray = Array<MapPropertyMetadata<any, any>>

const mapPropertyMetadata: Map<string, MapPropertyMetadataArray> = new Map()

export function saveClassMappingMetadata<T, K>(
  className: string,
  metadata: MapPropertyMetadata<T, K>
) {
  const properties = mapPropertyMetadata.get(className)

  if (!properties) {
    mapPropertyMetadata.set(className, [metadata])
  } else {
    properties.push(metadata)
  }
}

export function findClassMappingMetadata<T, K>(
  klass: ClassConstructor<T>
): Array<MapPropertyMetadata<T, K>> | undefined {
  const klassName = klass.name ?? klass.constructor.name
  const mappingProperties = mapPropertyMetadata.get(klassName)

  if (!mappingProperties) {
    return undefined
  }

  const parentClassMappingMetadata = findParentClassMappingMetadata(klass)

  return parentClassMappingMetadata
    ? [...mappingProperties, ...parentClassMappingMetadata]
    : mappingProperties
}

function findParentClassMappingMetadata(klass: ClassConstructor<any>) {
  const parentClass = findParentClass(klass)

  if (parentClass === undefined) {
    return
  }

  return findClassMappingMetadata(parentClass)
}
