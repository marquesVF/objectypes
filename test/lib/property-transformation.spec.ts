import { Transformable } from '../fixtures/transformable'
import { extractObject, buildObject } from '../../lib'
import { OptionalBuildModel } from '../fixtures/optional-build-model'

describe('property transformation', () => {
    const extractedObject = {
        time: 1594067298256,
        code: '1111'
    }

    const transformableObj: Transformable = {
        code: '1111',
        timeDate: new Date('2020-07-06T20:28:18.256Z')
    }

    describe('when extracting the object', () => {
        it('should apply the extract transformation', () => {
            const result = extractObject(transformableObj, Transformable)

            expect(result).toEqual(extractedObject)
        })
    })

    describe('when building the object', () => {
        describe('when object is valid', () => {
            const jsonObject = {
                time: '2020-07-06T20:28:18.256Z',
                code: '11-11'
            }

            it('should apply the build transformation', () => {
                const result = buildObject(Transformable, jsonObject)

                expect(result).toEqual(transformableObj)
            })
        })

        describe('when object is invalid', () => {
            const invalidObject = {
                time: 34
            }

            it('should throw an error', () => {
                const result = () => buildObject(Transformable, invalidObject)

                expect(result).toThrowError()
            })
        })

        describe('when typed object has a transformation for a optional property', () => {
            it('should not execute the transformation if property is undefined', () => {
                const builder = () => buildObject(OptionalBuildModel, { })

                expect(builder).not.toThrowError()
            })
        })
    })
})
