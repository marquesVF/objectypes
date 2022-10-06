import { ClassConstructor } from '../types'

export function getClassName<T>(classConstructor: ClassConstructor<T>): string {
  const classInstance = new classConstructor()

  return classInstance.constructor.name
}
