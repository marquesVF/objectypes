import { PropTransformation, Property } from '../../lib'

export class Transformable {

    @PropTransformation({
        scope: 'extract',
        transform: (value: Date): number => value.getTime()
    })
    @Property({ name: 'time' })
    timeDate: Date

}
