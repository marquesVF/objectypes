import { Property } from '../../lib'

export class DefaultPropModel {
  @Property()
  code: string

  @Property({ nullable: true })
  phoneNumber?: string

  @Property({ defaultValue: 'default value' })
  name?: string
}
