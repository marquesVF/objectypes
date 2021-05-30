import { BaseModel } from '../fixtures/base-model'
import { NestedModel } from '../fixtures/nested-model'
import { validateObject } from '../../lib'
import { VendorModel } from '../fixtures/vendor-model'
import { ComplexModel } from '../fixtures/complex-mode'
import { PrimitiveModel } from '../fixtures/primitive-model'

describe('validateObject method', () => {
  describe('when there is a valid JSON object', () => {
    const jsonObject = {
      ID: 'foo',
    }

    it('should return no errors', () => {
      const { presenceErrors, typeErrors } = validateObject(
        BaseModel,
        jsonObject
      )

      expect(presenceErrors).toHaveLength(0)
      expect(typeErrors).toHaveLength(0)
    })

    describe('when there is a nested object', () => {
      const nestedObject = {
        BASE_MODEL: {
          ID: 'foo',
        },
        baseModelArray: [
          {
            ID: 'smile',
          },
        ],
      }

      it('should return no errors', () => {
        const { presenceErrors, typeErrors } = validateObject(
          NestedModel,
          nestedObject
        )

        expect(presenceErrors).toHaveLength(0)
        expect(typeErrors).toHaveLength(0)
      })
    })

    describe('when there is complex property names', () => {
      const jsonObject = {
        data: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          Complex_Prop: 'foo',
          // eslint-disable-next-line @typescript-eslint/camelcase
          Deep_Nested: {
            Prop: 'nested foo',
          },
        },
      }

      it('should validate correctly', () => {
        const { presenceErrors, typeErrors } = validateObject(
          ComplexModel,
          jsonObject
        )

        expect(presenceErrors).toHaveLength(0)
        expect(typeErrors).toHaveLength(0)
      })
    })
  })

  describe('when there is a JSON object with missing property and invalid type', () => {
    const jsonObject = {
      vendorName: 'mark',
      price: '34',
      confirmed: 'it should be a boolean value',
    }

    it('should return presence and type errors', () => {
      const { presenceErrors, typeErrors } = validateObject(
        VendorModel,
        jsonObject
      )

      expect(presenceErrors).toHaveLength(1)
      expect(typeErrors).toHaveLength(1)
    })
  })

  describe('when there is a nested object with missing property', () => {
    const nestedObject = {
      sameModel: {
        id: 'foo',
      },
      baseModelArray: [
        {
          ID: 'smile',
        },
      ],
    }

    it('should return presence errors', () => {
      const { presenceErrors, typeErrors } = validateObject(
        NestedModel,
        nestedObject
      )

      expect(presenceErrors).toHaveLength(1)
      expect(typeErrors).toHaveLength(0)
    })
  })

  describe('when model has primitive types', () => {
    describe('when json object has unexpected property types but convertable', () => {
      const model = {
        counter: '10',
        createdAt: '2020-08-14T17:34:42.475Z',
      }

      it('should not return any type error', () => {
        const { typeErrors } = validateObject(PrimitiveModel, model)

        expect(typeErrors).toHaveLength(0)
      })
    })
  })
})
