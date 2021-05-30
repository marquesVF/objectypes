export type ReductionFn<T> = (obj: any) => T

export interface Reducer<T> {
  reduce: ReductionFn<T>
}

export interface ReductionMetadata<T> {
  propertyKey: string
  reducer: Reducer<T>
}
