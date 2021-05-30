/* eslint-disable max-len */
import { ChildModel } from '../fixtures/child-model'
import { extractObject } from '../../lib'
import { NestedModel, NestedTransformableModel } from '../fixtures/nested-model'

describe('extractObject method', () => {
  const today = new Date()
  const childModel: ChildModel = {
    id: '01',
    createdAt: today,
    name: 'vini',
  }

  describe('when extracting an object model with heritance to a json successfully', () => {
    const jsonObject = extractObject(childModel, ChildModel)

    it('should extract model class properties', () => {
      expect(jsonObject).toHaveProperty('name', childModel.name)
      expect(jsonObject).toHaveProperty('Creation_Date', childModel.createdAt)
    })

    it('should extract inherited properties', () => {
      expect(jsonObject).toHaveProperty('ID', childModel.id)
    })
  })

  describe('when extracting an object model with composition', () => {
    it('should extract nested classes even in an arrary', () => {
      const nestedModel: NestedModel = {
        baseModel: {
          id: 'baseModel',
        },
        baseModelArray: [
          {
            id: 'baseModelArray',
          },
        ],
      }
      const jsonObject = extractObject(nestedModel, NestedModel)

      const extractedObject = {
        BASE_MODEL: {
          ID: 'baseModel',
        },
        baseModelArray: [
          {
            ID: 'baseModelArray',
          },
        ],
      }

      expect(jsonObject).toEqual(extractedObject)
    })

    describe('when nested class has transformations', () => {
      const nestedTransformable: NestedTransformableModel = {
        transformable: {
          code: '3234',
          timeDate: new Date('2020-08-25T13:39:37.760Z'),
        },
      }
      const jsonObject = extractObject(
        nestedTransformable,
        NestedTransformableModel
      )
      const extractedObject = {
        foo: {
          code: '3234',
          time: 1598362777760,
        },
      }

      expect(jsonObject).toEqual(extractedObject)
    })
  })

  describe('when passing namedOnly option flag as true', () => {
    const expectedObj = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      Creation_Date: childModel.createdAt,
      ID: childModel.id,
    }
    const jsonObject = extractObject(childModel, ChildModel, {
      namedOnly: true,
    })

    it('should only export named properties', () => {
      expect(jsonObject).toEqual(expectedObj)
    })
  })
})
