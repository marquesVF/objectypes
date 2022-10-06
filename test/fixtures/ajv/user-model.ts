import {
  BooleanArrayProperty,
  BooleanProperty,
  NumberArrayProperty,
  NumberProperty,
  StringArrayProperty,
  StringProperty,
  ObjectProperty,
} from '../../../lib/ajv/decorators/properties'

export class CartModel {
  @StringProperty({ name: 'ID' })
  cartId: string

  @NumberProperty()
  totalItems: number
}

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

  @BooleanArrayProperty()
  isActionSuccessful: boolean[]

  @ObjectProperty({ type: CartModel })
  currentCart: CartModel

  @NumberArrayProperty({ nullable: true, uniqueItems: true })
  orderIndexes?: number[]

  @NumberProperty({ nullable: true })
  age?: number
}
