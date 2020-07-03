import { Property } from '../../lib'

import { BaseModel } from './base-model'

export class ChildModel extends BaseModel {

    @Property()
    name: string

    @Property({ name: 'Creation_Date' })
    createdAt: Date

}
