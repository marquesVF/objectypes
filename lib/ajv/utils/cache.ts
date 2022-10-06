export function createCache<T>() {
  const cachedSchemas = new Map<string, T>()

  return {
    find: (key: string) => cachedSchemas.get(key),
    save: (key: string, data: T) => cachedSchemas.set(key, data),
  }
}
