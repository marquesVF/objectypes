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

  const isDuplicated =
    existingMetadata.find(metadata => metadata.propertyName === key) !==
    undefined
  if (isDuplicated) {
    return
  }

  existingMetadata.push(metadata)
}

export function findMetadata<T>(
  key: string
): Array<PropertyMetadata<T>> | undefined {
  return metadataStorage.get(key) as Array<PropertyMetadata<T>> | undefined
}
