import { ObjectSchema } from '../schema-generation/generate-object-schema'

const cachedSchemas = new Map<string, ObjectSchema>()

export function findSchemaInCache(className: string): ObjectSchema | undefined {
  return cachedSchemas.get(className)
}

export function saveSchemaInCache(className: string, schema: ObjectSchema) {
  cachedSchemas.set(className, schema)
}
