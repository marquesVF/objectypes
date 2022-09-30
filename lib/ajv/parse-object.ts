import { JSONSchemaType } from 'ajv'

import { generateJsonSchemaFromMetadata } from './schema-generation/generate-json-schema-from-metadata'
import {
  findSchemaInCache,
  saveSchemaInCache,
} from './schema-management/schema-caching'
import { LazyClassConstructor } from './types'
import { getClassName } from './utils/class-constructors'
import { findMetadata, PropertyMetadata } from './utils/metadata'

type SuccessfulParse<T> = {
  isObjectValid: true
  parseResult: T
}

type FailedParse = {
  isObjectValid: false
  errors: string[]
}

type ParseResult<T> = (SuccessfulParse<T> | FailedParse) & {
  schema: JSONSchemaType<T>
}

export function parseObject<T extends object>(
  lazyClassConstructor: LazyClassConstructor<T>
): ParseResult<T> {
  const className = getClassName(lazyClassConstructor)
  const metadata = findMetadata<T>(className)
  if (!metadata) {
    throw new Error('Unkown error while parsing: no metadata found')
  }

  const jsonSchema = processSchema(className, metadata)

  return {
    isObjectValid: true,
    parseResult: {} as T,
    schema: jsonSchema,
  }
}

function processSchema<T extends object>(
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
