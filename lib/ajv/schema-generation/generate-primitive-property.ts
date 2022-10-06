import { PropertyMetadata } from '../utils/metadata'

export function generatePrimitiveProperty<T>(metadata: PropertyMetadata<T>) {
  if (!['number', 'string', 'boolean'].includes(metadata.expectedType)) {
    return
  }

  return {
    // FIXME metadata.options might include decorator options, and they aren't a valid json schema property
    ...metadata.options,
    type: metadata.expectedType,
  }
}
