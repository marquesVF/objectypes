import { BaseModel } from '../fixtures/base-model'
import { buildObject } from '../../lib'
import { BuildPropertyModel } from '../fixtures/build-property-model'

describe('BuildProperty decorator', () => {
    describe('when property to be build is nullable', () => {
        describe('when json object has the needed properties', () => {
            const jsonObject = {
                ID: 'foo',
                title: 'hello',
                content: 'world'
            }
            const expectedObject: BaseModel = {
                id: 'foo',
                description: 'hello world'
            }

            it('should build the object sucessfully', () => {
                const result = buildObject(BaseModel, jsonObject)

                expect(result).toEqual(expectedObject)
            })
        })
    })

    describe('when property is an object', () => {
        const jsonObject = {
            foo: 'foo property',
            id: 'id',
            name: 'jsonObject',
            createdAt: '2020-08-07T20:31:56.721Z'
        }
        const expectedObject: BuildPropertyModel = {
            foo: 'foo property',
            childModel: {
                id: 'id',
                name: 'jsonObject',
                createdAt: new Date('2020-08-07T20:31:56.721Z')
            }
        }

        it('', () => {
            const result = buildObject(BuildPropertyModel, jsonObject)

            expect(result).toEqual(expectedObject)
        })
    })
})
