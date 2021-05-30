import { ClassConstructor, MapPropertyMetadata } from '../../types'

type MapPropertyMetadataArray = Array<MapPropertyMetadata<any, any>>

const mapPropertyMetadata: Map<string, MapPropertyMetadataArray> = new Map()

export function saveMappingMetadata<T, K>(
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

export function findMappingProperties<T, K>(
  klass: ClassConstructor<T>
): Array<MapPropertyMetadata<T, K>> | undefined {
  const klassName = klass.name ?? klass.constructor.name
  const properties = mapPropertyMetadata.get(klassName)

  if (!properties) {
    return undefined
  }

  const parentKlass = klass.prototype
    ? Object.getPrototypeOf(klass.prototype)
    : undefined
  if (parentKlass !== undefined) {
    const parentProperties = findMappingProperties(parentKlass)

    if (parentProperties !== undefined) {
      return [...properties, ...parentProperties]
    }
  }

  return properties
}
