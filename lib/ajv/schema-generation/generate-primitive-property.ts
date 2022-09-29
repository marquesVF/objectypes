import { PropertyMetadata } from '../utils/metadata'

export function generatePrimitiveProperty<T>(metadata: PropertyMetadata<T>) {
  if (!['number', 'string', 'boolean'].includes(metadata.expectedType)) {
    return
  }

  return {
    ...metadata.options,
    type: metadata.expectedType,
  }
}
