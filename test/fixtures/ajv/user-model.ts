import { BooleanProperty } from '../../../lib/ajv/decorators/properties/boolean'
import { NumberProperty } from '../../../lib/ajv/decorators/properties/number'
import {
  StringArrayProperty,
  StringProperty,
} from '../../../lib/ajv/decorators/properties/string'

export class UserModel {
  @StringProperty({ maxLength: 30 })
  name: string

  @StringProperty()
  email: string

  @BooleanProperty()
  isEmailConfirmed: boolean

  @NumberProperty({ minimum: 0, maximum: 5 })
  rating: number

  @StringArrayProperty({ minLength: 5 })
  favoriteStoreNames: string[]

  @NumberProperty({ nullable: true })
  age?: number
}
