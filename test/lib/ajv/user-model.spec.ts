import { parseObject } from '../../../lib/ajv/parse-object'
import { UserModel } from '../../fixtures/ajv/user-model'

describe('UserModel spec', () => {
  describe('when parsing an object', () => {
    it('generates the expected schema', () => {
      const userParser = parseObject(new UserModel())

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
      expect(userParser.schema).toHaveProperty('required', ['rating'])
    })
  })
})
