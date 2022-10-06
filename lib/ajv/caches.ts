import { ObjectSchema } from './schema-generation/generate-object-schema'
import { createCache } from './utils/cache'

export const schemaCache = createCache<ObjectSchema>()
