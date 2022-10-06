export type ClassConstructor<T> = new () => T & { [key in keyof T]: unknown }
