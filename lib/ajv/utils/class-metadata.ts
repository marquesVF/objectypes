import { generateClassJsonSchema } from '../schema-generation/generate-schema'
import { ClassConstructor } from '../types'

import { getClassName } from './class-constructors'
import { findMetadata } from './metadata'

export function findMetadataAndGenerateSchema<T>(
  classConstructor: ClassConstructor<T>
) {
  const className = getClassName(classConstructor)
  const metadata = findMetadata(className)
  if (!metadata) {
    throw new Error('Unknown error while parsing: no metadata found')
  }

  return generateClassJsonSchema(className, metadata)
}
