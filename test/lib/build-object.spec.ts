/* eslint-disable max-len */
import { RequestPayloadModel } from '../fixtures/request-payload-mode'
import { buildObject } from '../../lib/build-object'
import { OptionalModel } from '../fixtures/optional-model'
import { PrimitiveModel } from '../fixtures/primitive-model'
import { Statement } from '../fixtures/nested-in-array-model'

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
            expect(test).toThrowError(`Property 'baseModel' is missing. Couldn't build RequestPayloadModel object.`)
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

    describe('when model has primitive types', () => {
        describe('when json object has unexpected property types but convertable', () => {
            const model = {
                counter: '0',
                createdAt: '2020-08-14T17:34:42.475Z'
            }

            it('should build the object with expected primitive types', () => {
                const builder = () => buildObject(PrimitiveModel, model)

                expect(builder).not.toThrowError()

                const result = builder()

                expect(typeof result.counter).toEqual('number')
                expect(typeof result.createdAt).toEqual('object')
                expect(Date.parse(result.createdAt.toString())).toBeTruthy()
            })
        })

        describe('when json object has not convertable properties', () => {
            describe('when the expected property type is a number', () => {
                const model = {
                    counter: 'foo',
                    createdAt: '2020-08-14T17:34:42.475Z'
                }
                const builder = () => buildObject(PrimitiveModel, model)

                it('should throw an error', () => {
                    expect(builder).toThrowError()
                })
            })

            describe('when the expected property type is a date', () => {
                const model = {
                    counter: '54',
                    createdAt: '2020-08-99'
                }
                const builder = () => buildObject(PrimitiveModel, model)

                it('should throw an error', () => {
                    expect(builder).toThrowError()
                })
            })
        })
    })

    describe('when nested object is in an array', () => {
        const payload = {
            extractions: {
                data: [
                    {
                        date: '02-09-2019',
                        valueDate: '02-09-2019',
                        index: '0'
                    },
                    {
                        date: '03/09/2019',
                        valueDate: '03/09/2019',
                        index: '1'
                    }
                ]
            }
        }

        const expected = {
            movement: [
                {
                    date: '02/09/2019',
                    valueDate: '02/09/2019',
                    index: 0
                },
                {
                    date: '03/09/2019',
                    valueDate: '03/09/2019',
                    index: 1
                }
            ]
        }

        it('should build successfuly', () => {
            const result = buildObject(Statement, payload)

            expect(result).toEqual(expected)
        })
    })
})
