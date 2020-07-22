/* eslint-disable max-len */
import { RequestPayloadModel } from '../fixtures/request-payload-mode'
import { buildObject } from '../../lib/build-object'

describe('buildObject method', () => {
    describe('when dealing with a valid JSON object', () => {
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

        it('should convert and successfuly validate the resulting typescript object', () => {
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
})
