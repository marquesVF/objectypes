import { Transformable } from '../fixtures/transformable'
import { extractObject } from '../../lib'

describe('property transformation', () => {
    const transformableObj: Transformable = {
        timeDate: new Date('2020-07-06T20:28:18.256Z')
    }
    const jsonObj = {
        time: 1594067298256
    }

    describe('when extracting the object', () => {
        it('should apply the transformation', () => {
            const result = extractObject(transformableObj, Transformable)

            expect(result).toEqual(jsonObj)
        })
    })
})
