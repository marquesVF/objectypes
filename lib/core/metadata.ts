import { ClassConstructor } from '../types/class-constructor'
import { ReductionMetadata } from '../types'

// TODO refactor this class - too many similar code
export class Metadata {
  private static _instance = new Metadata()

  // eslint-disable-next-line max-len
  readonly reducerMetadata: Map<string, Array<ReductionMetadata<any>>> =
    new Map()

  static getInstance(): Metadata {
    return Metadata._instance
  }

  registerBuildReduction<T>(className: string, metadata: ReductionMetadata<T>) {
    const properties = this.reducerMetadata.get(className)

    if (!properties) {
      this.reducerMetadata.set(className, [metadata])
    } else {
      properties.push(metadata)
    }
  }

  findReductions<T>(
    klass: ClassConstructor<T>
  ): Array<ReductionMetadata<any>> | undefined {
    const klassName = klass.name ?? klass.constructor.name

    return this.reducerMetadata.get(klassName)
  }
}
