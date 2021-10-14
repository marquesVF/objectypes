import { PropertyOptions } from '../types/property-options'
import { PropertyMetadata } from '../types'
import { saveClassPropertyMetadata } from '../core/metadata/property'

export function Property(options?: PropertyOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name
    const metadata: PropertyMetadata = {
      name: options?.name,
      propertyKey: propertyKey as string,
      type: options?.type,
      nullable: options?.nullable,
      target,
      defaultValue: options?.defaultValue,
    }

    saveClassPropertyMetadata(klassName, metadata)
  }
}
