import { Property } from '../../lib'

export class ComplexModel {
  @Property({ name: 'data.Complex_Prop' })
  complexProp: string

  @Property({ name: 'data.Deep_Nested.Prop' })
  deepNestedProp: string
}
