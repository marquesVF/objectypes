import { PropertyOptions } from '../decorators/properties/types'

export type PropertyMetadata<T> = PropertyOptions<T> & {
  propertyName: string
}

const metadataStorage = new Map<string, Array<PropertyMetadata<unknown>>>()

export function saveMetadata<T>(key: string, metadata: PropertyMetadata<T>) {
  const existingMetadata = metadataStorage.get(key)
  if (!existingMetadata) {
    metadataStorage.set(key, [metadata])

    return
  }

  existingMetadata.push(metadata)
}

export function findMetadata(key: string) {
  return metadataStorage.get(key)
}
