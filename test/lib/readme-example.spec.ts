import { buildObject } from '../../lib'
import { APIResponse } from '../fixtures/readme-example'

describe('README example', () => {
  it('successfully build an object', () => {
    const jsonObject = {
      user: [
        {
          name: 'John  ',
          age: 19,
          likes: 2,
        },
        {
          name: 'Maria',
          age: 30,
          likes: 0,
        },
        {
          name: 'Peter',
          age: 28,
          posts: [
            {
              title: 'Comment here some lines from musics you like',
              createdAt: '2021-10-14T20:40:07.609Z',
              comments: ["Such a lonely day and it's mine"],
            },
          ],
          likes: 100,
        },
      ],
    }
    const expectedTypedObject: APIResponse = {
      userData: [
        {
          name: 'John',
          age: 19,
          likes: 2,
        },
        {
          name: 'Maria',
          age: 30,
          likes: 0,
        },
        {
          name: 'Peter',
          age: 28,
          posts: [
            {
              title: 'Comment here some lines from musics you like',
              createdAt: new Date('2021-10-14T20:40:07.609Z'),
              comments: ["Such a lonely day and it's mine"],
            },
          ],
          likes: 100,
        },
      ],
    }
    const typedObject = buildObject(APIResponse, jsonObject)

    expect(expectedTypedObject).toMatchObject(typedObject)
  })
})
