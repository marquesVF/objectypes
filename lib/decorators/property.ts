import { PropertyOptions } from '../types/property-options'
import { PropertyMetadata } from '../types'
import { saveClassPropertyMetadata } from '../metadata/property'

export function Property(options?: PropertyOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const klassName = target.constructor.name
    const expectedTypeName = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey
    ).name
    const metadata: PropertyMetadata = {
      defaultValue: options?.defaultValue,
      expectedTypeName,
      name: options?.name,
      nullable: options?.nullable,
      propertyKey: propertyKey as string,
      target,
      type: options?.type,
    }

    saveClassPropertyMetadata(klassName, metadata)
  }
}
