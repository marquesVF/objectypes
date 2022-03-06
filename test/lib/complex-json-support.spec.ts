import { ComplexModel } from '../fixtures/complex-mode'
import { buildObject } from '../../lib/build-object/build-object'
import { extractObject } from '../../lib'

/* eslint-disable @typescript-eslint/camelcase */
describe('dealing with complex json objects', () => {
  const jsonObject = {
    data: {
      Complex_Prop: 'foo',
      Deep_Nested: {
        Prop: 'nested_foo',
      },
    },
  }
  const typedObject: ComplexModel = {
    complexProp: 'foo',
    deepNestedProp: 'nested_foo',
  }

  describe('when using buildObject', () => {
    it('should generate correctly a typed object', () => {
      const result = buildObject(ComplexModel, jsonObject)

      expect(result).toEqual(typedObject)
    })
  })

  describe('when using extractObject', () => {
    it('should generate correctly a json object', () => {
      const result = extractObject(typedObject, ComplexModel)

      expect(result).toEqual(jsonObject)
    })
  })
})
