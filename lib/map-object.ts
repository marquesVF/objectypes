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
  sourceObjectClass: ClassConstructor<K>,
  sourceObject: Hashable & K
): T {
  const targetObject = new targetClass()
  const mappingMetadata = getMappingMetadata(
    targetClass,
    sourceObjectClass.name
  )
  if (!mappingMetadata) {
    return targetObject
  }

  processMappingProperties(mappingMetadata, sourceObject, targetObject)
  processRegularProperties(
    mappingMetadata,
    targetClass,
    sourceObject,
    targetObject
  )

  return targetObject
}

function getMappingMetadata<T>(
  targetClass: ClassConstructor<Hashable & T>,
  sourceObjectClassName: string
) {
  const mappingMetadata = findClassMappingMetadata(targetClass)

  return mappingMetadata?.filter(
    property => property.mapTarget.name === sourceObjectClassName
  )
}

function processMappingProperties<T, K>(
  mappingProperties: Array<MapPropertyMetadata<Hashable & T, unknown>>,
  sourceObject: Hashable & K,
  targetObject: Hashable & T
) {
  for (const mappingProperty of mappingProperties) {
    const value = processValue(mappingProperty, sourceObject)

    Reflect.set(targetObject, mappingProperty.propertyKey, value)
  }
}

function processRegularProperties<T, K>(
  mappingProperties: Array<MapPropertyMetadata<Hashable & T, unknown>>,
  targetClass: ClassConstructor<Hashable & T>,
  sourceObject: Hashable & K,
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

  processProperties(classProperties, targetObject, sourceObject)
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
  sourceObject: Hashable
) {
  for (const classProperty of classProperties) {
    const { propertyKey } = classProperty

    Reflect.set(targetObject, propertyKey, sourceObject[propertyKey])
  }
}

function processValue<T, K>(
  mapProperty: MapPropertyMetadata<T, K>,
  sourceObject: Hashable
): K {
  const { mapPropertyKey, mapTransformer } = mapProperty

  if (mapPropertyKey) {
    return sourceObject[mapPropertyKey]
  }

  if (!mapTransformer) {
    throw new Error('Invalid mapping. No property or transformation found.')
  }

  return mapTransformer.transform(sourceObject as T)
}
