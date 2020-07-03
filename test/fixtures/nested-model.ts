import { Property } from '../../lib'

import { BaseModel } from './base-model'

export class NestedModel {

    @Property({ name: 'BASE_MODEL', type: BaseModel })
    baseModel: BaseModel

    @Property({ type: BaseModel })
    baseModelArray: BaseModel[]

}
