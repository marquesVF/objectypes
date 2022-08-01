import { JSONSchemaType } from 'ajv'

import { generateJsonSchemaFromMetadata } from './schema-generation/generate-json-schema-from-metadata'
import { findMetadata } from './utils/metadata'

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

export function parseObject<T>(
  targetClass: T & { [key: string]: any }
): ParseResult<T> {
  const className = targetClass.constructor.name
  const metadata = findMetadata(className)
  if (!metadata) {
    throw new Error('Unkown error while parsing: no metadata found')
  }

  const jsonSchema = generateJsonSchemaFromMetadata(metadata)

  console.log(metadata)
  console.log(jsonSchema)

  return {
    isObjectValid: true,
    parseResult: {} as T,
    schema: jsonSchema,
  }
}
