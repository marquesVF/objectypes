import { PropertyMetadata } from '../utils/metadata'

export function generateArrayProperty<T>(metadata: PropertyMetadata<T>) {
  if (metadata.expectedType !== 'array') {
    return
  }

  return {
    type: 'array',
    items: {
      type: metadata.itemPropertyOptions.expectedType,
    },
  }
}
