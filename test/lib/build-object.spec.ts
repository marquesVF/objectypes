/* eslint-disable max-len */
import { RequestPayloadModel } from '../fixtures/request-payload-mode'
import { buildObject } from '../../lib/build-object'
import { OptionalModel } from '../fixtures/optional-model'

describe('buildObject method', () => {
    describe('when dealing with a valid JSON object', () => {
        it('should convert and successfuly validate the resulting typescript object', () => {
            const jsonObject = {
                name: 'John',
                baseModel: {
                    title: 'title property'
                },
                MODEL_PROPS: [
                    {
                        title: 'something',
                        comment: 'this one has a comment'
                    },
                    {
                        title: 'another something'
                    }
                ]
            }
            const requestPayload = buildObject(RequestPayloadModel, jsonObject)

            const resultingObject: RequestPayloadModel = {
                name: 'John',
                baseModel: {
                    title: 'title property'
                },
                modelProps: [
                    {
                        title: 'something',
                        comment: 'this one has a comment'
                    },
                    {
                        title: 'another something'
                    }
                ]
            }

            expect(requestPayload).toEqual(resultingObject)
        })

        describe('when json object has no property with the specified name', () => {
            const uppercaseName = { NAME: 'foo' }
            const lowercaseName = { name: 'foo' }

            it('should handle when json property has the specified name', () => {
                const result = buildObject(OptionalModel, uppercaseName)

                expect(result.name).toBe('foo')
            })

            it('should handle when json property has NOT the specified name', () => {
                const result = buildObject(OptionalModel, lowercaseName)

                expect(result.name).toBe('foo')
            })
        })
    })

    describe('when dealing with an invalid JSON object', () => {
        const invalidJsonObject = {
            name: 'John',
            model: [{
                title: 'something'
            }]
        }

        function test() {
            buildObject(RequestPayloadModel, invalidJsonObject)
        }

        it('should rise a error when missing a property', () => {
            expect(test).toThrowError(`Property 'baseModel' is missing. Couldn't build an RequestPayloadModel object.`)
        })
    })

    describe('when string field is empty', () => {
        const model = {
            NAME: ''
        }

        it('should build a valid object regardless', () => {
            const obj = buildObject(OptionalModel, model)

            expect(obj.name).toEqual('')
        })
    })
})
