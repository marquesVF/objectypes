import { PropertyOptions } from './property-options'

export interface PropertyMetadata extends PropertyOptions {
  propertyKey: string
  target: Object
}
