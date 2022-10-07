import { ObjectSchema } from '../../../lib/ajv/schema-generation/generate-object-schema'
import { UserModel } from './user-model'

export const userModelObjectSchema: ObjectSchema<UserModel> = {
  email: { type: 'string', nullable: false },
  currentCart: { type: 'object', nullable: false },
  favoriteStoreNames: { type: 'stringArray', nullable: false },
  isActionSuccessful: { type: 'booleanArray', nullable: false },
  isEmailConfirmed: { type: 'boolean', nullable: false },
  name: { type: 'string', nullable: false },
}
