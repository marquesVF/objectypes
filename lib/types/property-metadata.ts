import { PropertyOptions } from './property-options'

export interface PropertyMetadata extends PropertyOptions {
  expectedTypeName: string
  propertyName: string
  propertyKey: string
  target: Object
}
