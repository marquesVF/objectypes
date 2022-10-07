import Ajv from 'ajv/dist/jtd'
import { ObjectSchema } from './schema-generation/generate-object-schema'

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
  schema: ObjectSchema
}

export function parseObject<T>(
  classConstructor: ClassConstructor<T>,
  stringObject: string
): ParseResult<T> {
  const schema = findMetadataAndGenerateSchema(classConstructor)
  const x = JSON.stringify(schema)
  const parseResult = runParser<T>(schema, stringObject)

  if (!parseResult) {
    return {
      isObjectValid: false,
      errors: [],
      schema,
    }
  }

  return {
    isObjectValid: true,
    parseResult,
    schema,
  }
}

const ajv = new Ajv({ removeAdditional: true })

function runParser<T>(jsonSchema: ObjectSchema, stringObject: string) {
  const compiledSchema = ajv.compileParser<T>(jsonSchema)
  const data = compiledSchema(stringObject)

  return data
}
