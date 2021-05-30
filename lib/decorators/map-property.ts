import { Metadata } from '../core/metadata'
import { ClassConstructor, MapPropertyMetadata, MapTransformer } from '../types'

export function MapProperty<T>(
  klass: ClassConstructor<T>,
  propKey: keyof T
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name
    const metadata: MapPropertyMetadata<T, unknown> = {
      mapTarget: klass,
      mapPropertyKey: propKey.toString(),
      propertyKey: propertyKey as string
    }

    Metadata.getInstance().registerMapMetadata(klassName, metadata)
  }
}

export function MapAndTransformProperty<T, K>(
  klass: ClassConstructor<T>,
  transformer: MapTransformer<T, K>
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name
    const metadata: MapPropertyMetadata<T, unknown> = {
      mapTarget: klass,
      mapTransformer: transformer,
      propertyKey: propertyKey as string
    }

    Metadata.getInstance().registerMapMetadata(klassName, metadata)
  }
}
