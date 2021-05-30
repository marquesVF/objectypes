import { Property } from '../../lib'

export class PrimitiveModel {
  @Property()
  counter: number

  @Property()
  createdAt: Date

  @Property({ nullable: true })
  someNumber?: number
}
