import { ObjectHandler } from '../../lib'
import { BaseModel } from '../fixtures/base-model'

describe('ObjectHandler', () => {
    const objectHandler = new ObjectHandler(BaseModel)

    describe('when validating unkown but valid objects', () => {
        const jsonObject = {
            ID: 'foo'
        }
        const { valid, presenceErrors, typeErrors } = objectHandler
            .validate(jsonObject)

        it('should return no errors ', () => {
            expect(valid).toBeTruthy()
            expect(presenceErrors).toHaveLength(0)
            expect(typeErrors).toHaveLength(0)
        })
    })

    describe('when validating unknow and invalid objects', () => {
        const invalidJsonObject = {
            id: 'foo'
        }
        const { valid, presenceErrors, typeErrors } = objectHandler
            .validate(invalidJsonObject)

        it('should return an array of errors', () => {
            expect(valid).toBeFalsy()
            expect(presenceErrors).toHaveLength(1)
            expect(typeErrors).toHaveLength(0)
        })
    })
})
