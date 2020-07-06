import { PropTransformation, Property } from '../../lib'

export class Transformable {

    @PropTransformation(
        (value: Date): number => value.getTime(),
        'extract'
    )
    @Property({ name: 'time' })
    timeDate: Date

}
