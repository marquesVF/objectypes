import { findClassMappingMetadata } from './metadata/mapping'
import { findClassPropertiesMetadata } from './metadata/property'
import { Hashable, ClassConstructor, MapPropertyMetadata } from './types'

function processValue<T, K>(
  property: MapPropertyMetadata<T, K>,
  obj: Hashable
): K {
  const { mapPropertyKey, mapTransformer } = property

  if (mapPropertyKey) {
    return obj[mapPropertyKey]
  }

  if (!mapTransformer) {
    throw new Error('Invalid mapping. No property or transformation found.')
  }

  return mapTransformer.transform(obj as T)
}

export function mapObject<T, K>(
  targetKlass: ClassConstructor<Hashable & T>,
  objKlass: ClassConstructor<K>,
  obj: Hashable & K
): T {
  const targetObj = new targetKlass()
  const mappedProperties = findClassMappingMetadata<T, unknown>(
    targetKlass
  )?.filter(property => property.mapTarget.name === objKlass.name)

  // eslint-disable-next-line no-unused-expressions
  mappedProperties?.forEach(property => {
    const value = processValue(property, obj)

    Reflect.set(targetObj, property.propertyKey, value)
  })

  // Get regular properties ignoring mappedProperties
  const mappedKeys = mappedProperties?.map(mapped => mapped.propertyKey)
  const properties = findClassPropertiesMetadata(targetKlass)?.filter(
    property => {
      if (mappedKeys) {
        // Avoid duplicated properties
        return !mappedKeys.includes(property.propertyKey)
      }

      return true
    }
  )

  // eslint-disable-next-line no-unused-expressions
  properties?.forEach(property => {
    const { propertyKey } = property

    Reflect.set(targetObj, propertyKey, obj[propertyKey])
  })

  return targetObj
}
