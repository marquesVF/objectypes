/* eslint-disable max-len */
import { ChildModel } from '../fixtures/child-model'
import { extractObject } from '../../lib'
import { NestedModel } from '../fixtures/nested-model'

describe('extractObject method', () => {
    describe('when converting an object model with heritance to a json successfully', () => {
        const today = new Date()
        const childModel: ChildModel = {
            id: '01',
            createdAt: today,
            name: 'vini'
        }
        const jsonObject = extractObject(childModel, ChildModel)

        it('should convert model class properties', () => {
            expect(jsonObject).toHaveProperty('name', childModel.name)
            expect(jsonObject).toHaveProperty('Creation_Date', childModel.createdAt)
        })

        it('should convert inherited properties', () => {
            expect(jsonObject).toHaveProperty('ID', childModel.id)
        })
    })

    describe('when converting an object model with composition', () => {
        const nestedModel: NestedModel = {
            baseModel: {
                id: 'baseModel'
            },
            baseModelArray: [{
                id: 'baseModelArray'
            }]
        }
        const jsonObject = extractObject(nestedModel, NestedModel)

        it('should convert nested classes even in an arrary', () => {
            const extractedObject = {
                BASE_MODEL: {
                    ID: 'baseModel'
                },
                baseModelArray: [{
                    ID: 'baseModelArray'
                }]
            }

            expect(jsonObject).toEqual(extractedObject)
        })
    })
})
