# objectypes

A type-safe library to transform and validate objects.

Find more details about objectypes usage in the [API Reference](/docs/APIReference.md).

## Installation

Make sure these `compilerOptions` flags are in the `tsconfig.json` file.

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```

Run `npm i --save objectypes` to add it to your project.

## Quick Start

Suppose you are requesting data from an API and you want to validate and have a type safe object from the JSON the API returns.

A JSON example:

```json
{
  "userData": [
    {
      "name": "John  ",
      "age": 19,
      "likes": 2
    },
    {
      "name": "Maria",
      "age": 30,
      "likes": 0
    },
    {
      "name": "Peter",
      "age": 28,
      "posts": [
        {
          "title": "Comment here some lines from musics you like",
          "createdAt": "2021-10-14T20: 40: 07.609Z",
          "comments": ["Such a lonely day and it's mine"]
        }
      ],
      "likes": 100
    }
  ]
}
```

The target Typescript type:

```typescript
import { BuildTransformation, Property } from 'objectypes'

class Post {
  @Property()
  title: string

  @Property()
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
  @Property({ name: 'userData', type: User })
  users: User[]
}
```
