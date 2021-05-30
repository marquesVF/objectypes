import { BuildTransformation, Property, BuildTransformer } from '../../lib'

class DateFormatter implements BuildTransformer<string> {
  transform(value: string): string {
    return value.replace(/[-]/g, '/')
  }
}

export class StatementMovement {
  @BuildTransformation(new DateFormatter())
  @Property({ name: 'date', nullable: true })
  date?: string

  @BuildTransformation(new DateFormatter())
  @Property({ name: 'valueDate', nullable: true })
  valueDate?: string

  @Property()
  index: number
}

export class Statement {
  @Property({
    name: 'extractions.data',
    nullable: true,
    type: StatementMovement,
  })
  movement?: StatementMovement[]
}
