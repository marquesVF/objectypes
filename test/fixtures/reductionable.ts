import { Property } from '../../lib'
import { BuildReduction } from '../../lib/decorators/build-reduction'

export class ReducibleObject {

    @Property()
    @BuildReduction({
        reduce: (obj: any) => `${obj.firstProp} ${obj.secondProp}`
    })
    combinedProp: string

}
