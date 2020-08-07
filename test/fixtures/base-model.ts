import { Property, Hashable } from '../../lib'

export class BaseModel {

    @Property({ name: 'ID' })
    id: string

    @Property({
        nullable: true,
        builder: (obj: Hashable) => `${obj.title} ${obj.content}`
    })
    description?: string

}
