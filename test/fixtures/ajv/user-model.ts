import { Number } from '../../../lib/ajv/decorators/properties/number'

export class UserModel {
  name: string
  email: string
  isEmailConfirmed: boolean

  @Number({ minimum: 0, maximum: 5 })
  rating: number

  @Number({ nullable: true })
  age?: number
}
