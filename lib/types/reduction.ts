export type ReductionFn<T> = (obj: object) => T

export interface Reducer<T> {
    reduce: ReductionFn<T>
}

export interface ReductionMetadata<T> {
    propertyKey: string
    reducer: Reducer<T>
}
