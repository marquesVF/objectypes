import { BuildTransformation, Property, ExtractTransformation } from '../../lib'
import { BuildTransformer, ExtractTransformer } from '../../lib/types'

class DateTransformation implements BuildTransformer<Date> {

    transform(value: unknown): Date {
        if (typeof value !== 'string') {
            throw new Error(
                `'${value}' has not a valid value. Expected a string.`
            )
        }

        return new Date(value)
    }

}

class EpochTransformation implements ExtractTransformer<Date, number> {

    transform(value: Date): number {
        return value.getTime()
    }

}

export class Transformable {

    @ExtractTransformation(new EpochTransformation())
    @BuildTransformation(new DateTransformation())
    @Property({ name: 'time' })
    timeDate: Date

}
