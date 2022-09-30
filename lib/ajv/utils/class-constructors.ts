import { LazyClassConstructor } from '../types'

export function getClassName<T extends object>(
  lazyClassConstructor: LazyClassConstructor<T>
): string {
  const classConstructor = lazyClassConstructor()
  const classInstance = new classConstructor()

  return classInstance.constructor.name
}
