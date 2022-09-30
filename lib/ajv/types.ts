export type ClassConstructor<T> = new () => T
export type LazyClassConstructor<T> = () => ClassConstructor<T>
