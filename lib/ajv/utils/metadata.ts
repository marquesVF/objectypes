import { PropertyOptions } from '../decorators/properties/types'

export type PropertyMetadata = PropertyOptions & {
  propertyName: string
}

const metadataStorage = new Map<string, PropertyMetadata[]>()

export function saveMetadata(key: string, metadata: PropertyMetadata) {
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
