import { BaseModel } from '../fixtures/base-model'
import { NestedModel } from '../fixtures/nested-model'
import { isValid } from '../../lib/validate'

describe('isConvertable method', () => {
    describe('when there is a valid JSON object', () => {
        const jsonObject = {
            ID: 'foo'
        }

        it('should return true', () => {
            const { valid } = isValid(BaseModel, jsonObject)

            expect(valid).toBeTruthy()
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

            it('should return true', () => {
                const { valid } = isValid(NestedModel, nestedObject)

                expect(valid).toBeTruthy()
            })
        })
    })

    describe('when there is an ivalid JSON object', () => {
        const jsonObject = {
            name: 'mark'
        }

        it('should return false', () => {
            const { valid, errors } = isValid(BaseModel, jsonObject)

            expect(valid).toBeFalsy()
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
                const { valid, errors } = isValid(NestedModel, nestedObject)

                expect(valid).toBeFalsy()
                expect(errors).toHaveLength(2)
            })
        })
    })
})
