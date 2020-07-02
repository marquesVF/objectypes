/* eslint-disable max-len */
import { FooModel } from '../fixtures/foo-model'
import { extractObject } from '../../lib'

describe('extractObject method', () => {
    describe('when converted a object model with heritance to a json successfully', () => {
        const today = new Date()
        const fooModel = {
            id: '01',
            createdAt: today,
            name: 'vini'
        }
        const jsonObject = extractObject(fooModel, FooModel)

        it('should convert model class properties', () => {
            expect(jsonObject).toHaveProperty('name', fooModel.name)
            expect(jsonObject).toHaveProperty('Creation_Date', fooModel.createdAt)
        })

        it('should coverted inherited properties', () => {
            expect(jsonObject).toHaveProperty('id', fooModel.id)
        })
    })
})
