import { Property, BuildTransformation } from '../../lib'

class Post {
  @Property()
  title: string

  @Property({ type: Date })
  createdAt: Date

  @Property({ nullable: true })
  comments?: string[]
}

class PostPublisher {
  @Property({ nullable: true, type: Post })
  posts?: Post[]
}

class User extends PostPublisher {
  @BuildTransformation({ transform: (name: string) => name.trim() })
  @Property()
  name: string

  @Property()
  age: number

  @Property()
  likes: number
}

export class APIResponse {
  @Property({ name: 'user', type: User })
  userData: User[]
}
