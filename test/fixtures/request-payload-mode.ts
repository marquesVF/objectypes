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
