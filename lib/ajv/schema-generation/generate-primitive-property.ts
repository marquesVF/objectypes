import { PropertyMetadata } from '../utils/metadata'

export function generatePrimitiveProperty(metadata: PropertyMetadata) {
  if (!['number', 'string', 'boolean'].includes(metadata.expectedType)) {
    return
  }

  return {
    ...metadata.options,
    type: metadata.expectedType,
  }
}
