import { Property } from '../../lib'

export class ModelProperty {
  @Property()
  title: string

  @Property({ nullable: true })
  comment?: string
}

export class RequestPayloadModel {
  @Property()
  name: string

  @Property({ type: ModelProperty })
  baseModel: ModelProperty

  @Property({ name: 'MODEL_PROPS', type: ModelProperty })
  modelProps: ModelProperty[]
}

export class ModelWithBoolean {
  @Property()
  name: string

  @Property()
  flag: boolean
}

export class ModelWithOptionalBoolean {
  @Property({ nullable: true })
  flag?: boolean
}

export class ModelWithOptionalBooleanWithFalseDefault {
  @Property({ nullable: true, defaultValue: false })
  flag: boolean
}
