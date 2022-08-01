import { PropertyMetadata } from '../utils/metadata'

export function generatePrimitiveProperty(metadata: PropertyMetadata) {
  return {
    ...metadata.options,
    type: metadata.expectedType,
  }
}
