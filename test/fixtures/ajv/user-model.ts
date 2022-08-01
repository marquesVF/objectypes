import { BooleanProperty } from '../../../lib/ajv/decorators/properties/boolean'
import { NumberProperty } from '../../../lib/ajv/decorators/properties/number'
import { StringProperty } from '../../../lib/ajv/decorators/properties/string'

export class UserModel {
  @StringProperty({ maxLength: 30 })
  name: string

  @StringProperty()
  email: string

  @BooleanProperty()
  isEmailConfirmed: boolean

  @NumberProperty({ minimum: 0, maximum: 5 })
  rating: number

  @NumberProperty({ nullable: true })
  age?: number
}
