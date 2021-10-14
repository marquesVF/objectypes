import { Property, BuildTransformation } from '../../lib'

export class OptionalBuildModel {
  @BuildTransformation({
    transform: (value: string) => value.replace(/\./g, ''),
  })
  @Property({ nullable: true })
  code?: string

  @Property({ defaultValue: 'No name informed' })
  name: string
}
