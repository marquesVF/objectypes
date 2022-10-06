import { schemaCache } from '../caches'
import { PropertyMetadata } from '../utils/metadata'

import { generateObjectSchemaFromMetadata } from './generate-object-schema-from-metadata'

export function generateClassJsonSchema<T>(
  className: string,
  metadata: Array<PropertyMetadata<T>>
) {
  const cachedSchema = schemaCache.find(className)
  if (cachedSchema) {
    return cachedSchema
  }

  const jsonSchema = generateObjectSchemaFromMetadata(metadata)
  schemaCache.save(className, jsonSchema)

  return jsonSchema
}
