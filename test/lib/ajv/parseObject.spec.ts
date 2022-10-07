import { parseObject } from '../../../lib/ajv/parse-object'
import { UserModel } from '../../fixtures/ajv/user-model'

describe('UserModel parse object spec', () => {
  const data: Partial<UserModel | {}> = {
    email: 'foo@mail.com',
    favoriteStoreNames: ['foo', 'store'],
    isActionSuccessful: [true, false],
    isEmailConfirmed: true,
    name: 'foo',
    age: 3,
    rating: 4,
    currentCart: {
      ID: '23',
      totalItems: 1,
    },
  }
  const stringData = JSON.stringify(data)

  it('builds successfully', () => {
    const parsedUser = parseObject(UserModel, stringData)

    expect(parsedUser.isObjectValid).toBeTruthy()
  })
})
