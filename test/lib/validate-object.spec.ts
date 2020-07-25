import { BaseModel } from '../fixtures/base-model'
import { NestedModel } from '../fixtures/nested-model'
import { validateObject } from '../../lib'

describe('validateObject method', () => {
    describe('when there is a valid JSON object', () => {
        const jsonObject = {
            ID: 'foo'
        }

        it('should return no errors', () => {
            const errors = validateObject(BaseModel, jsonObject)

            expect(errors).toHaveLength(0)
        })

        describe('when there is a nested object', () => {
            const nestedObject = {
                BASE_MODEL: {
                    ID: 'foo'
                },
                baseModelArray: [{
                    ID: 'smile'
                }]
            }

            it('should return no errors', () => {
                const errors = validateObject(NestedModel, nestedObject)

                expect(errors).toHaveLength(0)
            })
        })
    })

    describe('when there is an ivalid JSON object', () => {
        const jsonObject = {
            name: 'mark'
        }

        it('should return false', () => {
            const errors = validateObject(BaseModel, jsonObject)

            expect(errors).toHaveLength(1)
        })

        describe('when there is an invalid nested object', () => {
            const nestedObject = {
                sameModel: {
                    id: 'foo'
                },
                baseModelArray: [{
                    ID: 'smile'
                }]
            }

            it('should return false', () => {
                const errors = validateObject(NestedModel, nestedObject)

                expect(errors).toHaveLength(2)
            })
        })
    })
})
