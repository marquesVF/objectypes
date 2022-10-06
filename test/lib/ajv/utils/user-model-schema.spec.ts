import { parseObject } from '../../../../lib/ajv/parse-object'
import { UserModel } from '../../../fixtures/ajv/user-model'

describe('UserModel Schema spec', () => {
  describe('when generating a JSON schema', () => {
    const userParser = parseObject(UserModel)

    it('generates the expected schema', () => {
      expect(userParser.schema).toHaveProperty('additionalProperties', false)
      expect(userParser.schema).toHaveProperty('type', 'object')
      expect(userParser.schema.properties).toBeDefined()
      expect(userParser.schema.properties).toHaveProperty('rating', {
        minimum: 0,
        maximum: 5,
        type: 'number',
      })
      expect(userParser.schema.properties).toHaveProperty('age', {
        nullable: true,
        type: 'number',
      })
      expect(userParser.schema.properties).toHaveProperty('name', {
        maxLength: 30,
        type: 'string',
      })
      expect(userParser.schema.properties).toHaveProperty('email', {
        type: 'string',
      })
      expect(userParser.schema.properties).toHaveProperty('isEmailConfirmed', {
        type: 'boolean',
      })
      expect(userParser.schema.properties).toHaveProperty(
        'favoriteStoreNames',
        {
          type: 'array',
          items: {
            type: 'string',
          },
        }
      )
      expect(userParser.schema.properties).toHaveProperty('orderIndexes', {
        type: 'array',
        items: {
          type: 'number',
        },
      })
      expect(userParser.schema.properties).toHaveProperty(
        'isActionSuccessful',
        {
          type: 'array',
          items: {
            type: 'boolean',
          },
        }
      )
      expect(userParser.schema.properties).toHaveProperty('currentCart', {
        additionalProperties: false,
        properties: {
          cartId: { type: 'string' },
        },
        required: ['cartId'],
        type: 'object',
      })
      expect(userParser.schema).toHaveProperty('required', [
        'name',
        'email',
        'isEmailConfirmed',
        'rating',
        'favoriteStoreNames',
        'isActionSuccessful',
        'currentCart',
      ])
    })

    it('reuses the already generated schema object', () => {
      const anotherUserParser = parseObject(UserModel)

      expect(
        Object.is(anotherUserParser.schema, userParser.schema)
      ).toBeTruthy()
    })
  })
})
