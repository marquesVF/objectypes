import { BaseModel } from '../fixtures/base-model'
import { NestedModel } from '../fixtures/nested-model'
import { validateObject } from '../../lib'
import { VendorModel } from '../fixtures/vendor-model'

describe('validateObject method', () => {
    describe('when there is a valid JSON object', () => {
        const jsonObject = {
            ID: 'foo'
        }

        it('should return no errors', () => {
            const { presenceErrors, typeErrors }
                = validateObject(BaseModel, jsonObject)

            expect(presenceErrors).toHaveLength(0)
            expect(typeErrors).toHaveLength(0)
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
                const { presenceErrors, typeErrors }
                    = validateObject(NestedModel, nestedObject)

                expect(presenceErrors).toHaveLength(0)
                expect(typeErrors).toHaveLength(0)
            })
        })
    })

    describe('when there is an JSON object with missing property and invalid type', () => {
        const jsonObject = {
            vendorName: 'mark',
            price: 34,
            confirmed: 'it should be a boolean value'
        }

        it('should return presence and type errors', () => {
            const { presenceErrors, typeErrors }
                = validateObject(VendorModel, jsonObject)

            expect(presenceErrors).toHaveLength(1)
            expect(typeErrors).toHaveLength(1)
        })
    })

    describe('when there is a nested object with missing property', () => {
        const nestedObject = {
            sameModel: {
                id: 'foo'
            },
            baseModelArray: [{
                ID: 'smile'
            }]
        }

        it('should return presence errors', () => {
            const { presenceErrors, typeErrors }
                = validateObject(NestedModel, nestedObject)

            expect(presenceErrors).toHaveLength(1)
            expect(typeErrors).toHaveLength(0)
        })
    })
})
