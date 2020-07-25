/* eslint-disable max-len */
import { ObjectHandler } from '../../lib'
import { BaseModel } from '../fixtures/base-model'

describe('ObjectHandler', () => {
    const objectHandler = new ObjectHandler(BaseModel)

    describe('when validating unkown but valid objects', () => {
        const jsonObject = {
            ID: 'foo'
        }
        const { valid, validationErrors } = objectHandler.validate(jsonObject)

        it('should return no errors ', () => {
            expect(valid).toBeTruthy()
            expect(validationErrors).toHaveLength(0)
        })
    })

    describe('when validating unknow and invalid objects', () => {
        const invalidJsonObject = {
            id: 'foo'
        }
        const { valid, validationErrors } = objectHandler
            .validate(invalidJsonObject)

        it('should return an array of errors', () => {
            expect(valid).toBeFalsy()
            expect(validationErrors).toHaveLength(1)
        })
    })
})
