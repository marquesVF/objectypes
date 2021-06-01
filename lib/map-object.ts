import { findClassMappingMetadata } from './core/metadata/mapping'
import { findClassPropertiesMetadata } from './core/metadata/property'
import {
  Hashable,
  ClassConstructor,
  MapPropertyMetadata,
  PropertyMetadata,
} from './types'

export function mapObject<T, K>(
  targetClass: ClassConstructor<Hashable & T>,
  objectClass: ClassConstructor<K>,
  obj: Hashable & K
): T {
  const targetObj = new targetClass()
  const mappingMetadata = getMappingMetadata(targetClass, objectClass.name)
  if (!mappingMetadata) {
    return targetObj
  }

  processMappingProperties(mappingMetadata, obj, targetObj)
  processRegularProperties(mappingMetadata, targetClass, obj, targetObj)

  return targetObj
}

function getMappingMetadata<T>(
  targetClass: ClassConstructor<Hashable & T>,
  objectClassName: string
) {
  const mappingMetadata = findClassMappingMetadata(targetClass)

  return mappingMetadata?.filter(
    property => property.mapTarget.name === objectClassName
  )
}

function processMappingProperties<T, K>(
  mappingProperties: Array<MapPropertyMetadata<Hashable & T, unknown>>,
  obj: Hashable & K,
  targetObject: Hashable & T
) {
  for (const mappingProperty of mappingProperties) {
    const value = processValue(mappingProperty, obj)

    Reflect.set(targetObject, mappingProperty.propertyKey, value)
  }
}

function processRegularProperties<T, K>(
  mappingProperties: Array<MapPropertyMetadata<Hashable & T, unknown>>,
  targetClass: ClassConstructor<Hashable & T>,
  obj: Hashable & K,
  targetObject: Hashable & T
) {
  const propertyMetadata = findClassPropertiesMetadata(targetClass)
  if (!propertyMetadata) {
    return
  }

  const classProperties = filterNotMappedProperties(
    mappingProperties,
    propertyMetadata
  )

  processProperties(classProperties, targetObject, obj)
}

function filterNotMappedProperties<T>(
  mappingProperties: Array<MapPropertyMetadata<Hashable & T, unknown>>,
  classProperties: PropertyMetadata[]
) {
  const mappingKeys = mappingProperties.map(mapping => mapping.propertyKey)

  return classProperties?.filter(classProperty => {
    if (mappingKeys) {
      return !mappingKeys.includes(classProperty.propertyKey)
    }

    return true
  })
}

function processProperties<T>(
  classProperties: PropertyMetadata[],
  targetObject: Hashable & T,
  obj: Hashable
) {
  for (const classProperty of classProperties) {
    const { propertyKey } = classProperty

    Reflect.set(targetObject, propertyKey, obj[propertyKey])
  }
}

function processValue<T, K>(
  mapProperty: MapPropertyMetadata<T, K>,
  obj: Hashable
): K {
  const { mapPropertyKey, mapTransformer } = mapProperty

  if (mapPropertyKey) {
    return obj[mapPropertyKey]
  }

  if (!mapTransformer) {
    throw new Error('Invalid mapping. No property or transformation found.')
  }

  return mapTransformer.transform(obj as T)
}
