import { Property, ExtractTransformation, BuildTransformation } from '../../lib'
import { ExtractTransformer, BuildTransformer } from '../../lib/types'

class CodeTransformation implements BuildTransformer<string> {

    transform(value: string): string  {
        return value.replace('-', '')
    }

}

class EpochTransformation implements ExtractTransformer<Date, number> {

    transform(value: Date): number {
        return value.getTime()
    }

}

export class Transformable {

    @BuildTransformation(new CodeTransformation())
    @Property()
    code: string

    @ExtractTransformation(new EpochTransformation())
    @Property({ name: 'time' })
    timeDate: Date

}
