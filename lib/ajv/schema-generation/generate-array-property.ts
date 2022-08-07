import { PropertyMetadata } from '../utils/metadata'

export function generateArrayProperty(metadata: PropertyMetadata) {
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
