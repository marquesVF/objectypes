import { ObjectHandler } from '../../lib'
import { BaseModel } from '../fixtures/base-model'

describe('ObjectHandler', () => {
    const objectHandler = new ObjectHandler(BaseModel)

    describe('when validating unkown but valid objects', () => {
        const jsonObject = {
            ID: 'foo'
        }
        const { valid, errors } = objectHandler
            .validate(jsonObject)

        it('should return no errors ', () => {
            expect(valid).toBeTruthy()
            expect(errors).toBeUndefined()
        })
    })

    describe('when validating unknow and invalid objects', () => {
        const invalidJsonObject = {
            id: 'foo'
        }
        const { valid, errors } = objectHandler
            .validate(invalidJsonObject)

        it('should return an error object', () => {
            expect(valid).toBeFalsy()
            expect(errors).not.toBeUndefined()
            expect(errors?.presenceErrors).toHaveLength(1)
            expect(errors?.typeErrors).toHaveLength(0)
        })
    })
})
