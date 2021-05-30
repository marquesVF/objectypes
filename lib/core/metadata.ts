import { ClassConstructor } from '../types/class-constructor'
import { MapPropertyMetadata } from '../types/map-property-metadata'
import {
  TransformationMetadata,
  TransformationScope,
} from '../types/transformation'
import { ReductionMetadata } from '../types'

// TODO refactor this class - too many similar code
export class Metadata {
  private static _instance = new Metadata()

  // eslint-disable-next-line max-len
  readonly mapPropertyMetadata: Map<
    string,
    Array<MapPropertyMetadata<any, any>>
  > = new Map()
  // eslint-disable-next-line max-len
  readonly transformationMetadata: Map<
    string,
    Array<TransformationMetadata<any, any>>
  > = new Map()
  // eslint-disable-next-line max-len
  readonly reducerMetadata: Map<string, Array<ReductionMetadata<any>>> =
    new Map()

  static getInstance(): Metadata {
    return Metadata._instance
  }

  registerMapMetadata<T, K>(
    className: string,
    metadata: MapPropertyMetadata<T, K>
  ) {
    const properties = this.mapPropertyMetadata.get(className)

    if (!properties) {
      this.mapPropertyMetadata.set(className, [metadata])
    } else {
      properties.push(metadata)
    }
  }

  registerTransformationMetadata<T, K>(
    className: string,
    metadata: TransformationMetadata<T, K>
  ) {
    const properties = this.transformationMetadata.get(className)

    if (!properties) {
      this.transformationMetadata.set(className, [metadata])
    } else {
      properties.push(metadata)
    }
  }

  registerBuildReduction<T>(className: string, metadata: ReductionMetadata<T>) {
    const properties = this.reducerMetadata.get(className)

    if (!properties) {
      this.reducerMetadata.set(className, [metadata])
    } else {
      properties.push(metadata)
    }
  }

  findMapProperties<T, K>(
    klass: ClassConstructor<T>
  ): Array<MapPropertyMetadata<T, K>> | undefined {
    const klassName = klass.name ?? klass.constructor.name
    const properties = this.mapPropertyMetadata.get(klassName)

    if (!properties) {
      return undefined
    }

    const parentKlass = klass.prototype
      ? Object.getPrototypeOf(klass.prototype)
      : undefined
    if (parentKlass !== undefined) {
      const parentProperties = this.findMapProperties(parentKlass)

      if (parentProperties !== undefined) {
        return [...properties, ...parentProperties]
      }
    }

    return properties
  }

  findTransformations<T, K>(
    klass: ClassConstructor<T>,
    scope: TransformationScope
  ): Array<TransformationMetadata<T, K>> | undefined {
    const klassName = klass.name ?? klass.constructor.name

    return this.transformationMetadata
      .get(klassName)
      ?.filter(metadata => metadata.scope === scope)
  }

  findReductions<T>(
    klass: ClassConstructor<T>
  ): Array<ReductionMetadata<any>> | undefined {
    const klassName = klass.name ?? klass.constructor.name

    return this.reducerMetadata.get(klassName)
  }
}
