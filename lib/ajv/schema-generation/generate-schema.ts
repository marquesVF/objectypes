import {
  findSchemaInCache,
  saveSchemaInCache,
} from '../schema-management/schema-caching'
import { PropertyMetadata } from '../utils/metadata'

import { generateJsonSchemaFromMetadata } from './generate-json-schema-from-metadata'

export function generateClassJsonSchema<T>(
  className: string,
  metadata: Array<PropertyMetadata<T>>
) {
  const cachedSchema = findSchemaInCache(className)
  if (cachedSchema) {
    return cachedSchema
  }

  const jsonSchema = generateJsonSchemaFromMetadata(metadata)
  saveSchemaInCache(className, jsonSchema)

  return jsonSchema
}
