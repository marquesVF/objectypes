import { JSONSchemaType } from 'ajv'

const cachedSchemas = new Map<string, JSONSchemaType<object>>()

export function findSchemaInCache<T>(
  className: string
): JSONSchemaType<T> | undefined {
  return cachedSchemas.get(className)
}

export function saveSchemaInCache<T extends object>(
  className: string,
  schema: JSONSchemaType<T>
) {
  cachedSchemas.set(className, schema as JSONSchemaType<object>)
}
