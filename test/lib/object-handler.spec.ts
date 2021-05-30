import { ObjectHandler } from '../../lib'
import { BaseModel } from '../fixtures/base-model'

describe('ObjectHandler', () => {
  const objectHandler = new ObjectHandler(BaseModel)

  describe('when validating unkown but valid objects', () => {
    const jsonObject = {
      ID: 'foo',
    }
    const errors = objectHandler.validate(jsonObject)

    it('should return no errors ', () => {
      expect(errors).toBeUndefined()
    })
  })

  describe('when validating unknow and invalid objects', () => {
    const invalidJsonObject = {
      id: 'foo',
    }
    const errors = objectHandler.validate(invalidJsonObject)

    it('should return an error object', () => {
      expect(errors).toBeDefined()
      expect(errors?.presenceErrors).toHaveLength(1)
      expect(errors?.typeErrors).toHaveLength(0)
      expect(errors?.summary.length).toBeGreaterThan(0)
    })
  })
})
