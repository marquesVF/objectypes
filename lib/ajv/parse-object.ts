import { JSONSchemaType } from 'ajv'

import { ClassConstructor } from './types'
import { findMetadataAndGenerateSchema } from './utils/class-metadata'

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
  classConstructor: ClassConstructor<T>
): ParseResult<T> {
  const jsonSchema = findMetadataAndGenerateSchema(classConstructor)

  return {
    isObjectValid: true,
    parseResult: {} as T,
    schema: jsonSchema,
  }
}
