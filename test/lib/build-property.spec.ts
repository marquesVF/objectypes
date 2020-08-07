import { BaseModel } from '../fixtures/base-model'
import { buildObject } from '../../lib'

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
})
