import { ClassConstructor } from '../types'

export function findParentClass(klass: ClassConstructor<any>) {
  return klass.prototype ? Object.getPrototypeOf(klass.prototype) : undefined
}
