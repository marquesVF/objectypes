import { buildObject } from '../../lib'
import { ReducibleObject } from '../fixtures/reductionable'

describe('object reduction', () => {
    const jsonObject = {
        firstProp: 'hello',
        secondProp: 'world'
    }
    const expectedObj: ReducibleObject = {
        combinedProp: 'hello world'
    }

    it('should use both properties in the transformation', () => {
        const result = buildObject(ReducibleObject, jsonObject)

        expect(result).toEqual(expectedObj)
    })
})
