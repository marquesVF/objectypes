import { Property, PropertyBuilder, Hashable } from '../../lib'

import { ChildModel } from './child-model'

export class ChieldModelBuilder implements PropertyBuilder {

    build(obj: Hashable): object {
        return {
            id: obj.id,
            name: obj.name,
            createdAt: new Date(obj.createdAt)
        }
    }

}

export class BuildPropertyModel {

    @Property()
    foo: string

    @Property({ type: ChildModel, builder: new ChieldModelBuilder() })
    childModel: ChildModel

}
