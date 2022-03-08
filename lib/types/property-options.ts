import { ClassConstructor } from './class-constructor'

export interface PropertyOptions {
  defaultValue?: any
  name?: string
  nullable?: true
  type?: ClassConstructor<any>
}
