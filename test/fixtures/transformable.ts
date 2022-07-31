import { Property, BuildTransformation } from '../../lib'
import { BuildTransformer } from '../../lib/types'

class CodeTransformation implements BuildTransformer<string> {
  transform(value: string): string {
    return value.replace('-', '')
  }
}

export class Transformable {
  @BuildTransformation(new CodeTransformation())
  @Property()
  code: string

  @Property({ name: 'time' })
  timeDate: Date
}
