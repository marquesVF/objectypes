import { PropertyMetadata } from '../utils/metadata'

export function generateArrayProperty<T>(metadata: PropertyMetadata<T>) {
  if (metadata.type !== 'array') {
    return
  }

  return {
    type: 'array',
    items: {
      type: metadata.itemPropertyOptions.type,
    },
  }
}
