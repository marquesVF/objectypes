import { Property } from '../../lib'

export class BaseModel {
  @Property({ name: 'ID' })
  id: string
}
