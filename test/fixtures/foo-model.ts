import { Property } from '../../lib'

export class BaseModel {

    @Property({ name: 'ID' })
    id: string

    @Property({ nullable: true })
    originalName?: string

}

export class FooModel extends BaseModel {

    @Property()
    name: string

    @Property({ name: 'Creation_Date' })
    createdAt: Date

}
