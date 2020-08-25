import { Property } from '../../lib'

import { BaseModel } from './base-model'
import { Transformable } from './transformable'

export class NestedModel {

    @Property({ name: 'BASE_MODEL', type: BaseModel })
    baseModel: BaseModel

    @Property({ type: BaseModel })
    baseModelArray: BaseModel[]

}

export class NestedTransformableModel {

    @Property({ name: 'foo', type: Transformable })
    transformable: Transformable

}
