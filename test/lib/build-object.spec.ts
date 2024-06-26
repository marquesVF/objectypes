/* eslint-disable max-len */
import {
  ModelWithBoolean,
  ModelWithOptionalBoolean,
  ModelWithOptionalBooleanWithFalseDefault,
  RequestPayloadModel,
} from '../fixtures/request-payload-mode'
import { buildObject } from '../../lib/build-object/build-object'
import { OptionalModel } from '../fixtures/optional-model'
import { PrimitiveModel } from '../fixtures/primitive-model'
import { Statement } from '../fixtures/nested-in-array-model'
import { OptionalBuildModel } from '../fixtures/optional-build-model'

describe('buildObject method', () => {
  describe('building boolean values', () => {
    describe('class with required boolean', () => {
      it('builds true value', () => {
        const jsonObject = {
          name: 'John',
          flag: true,
        }
        const requestPayload = buildObject(ModelWithBoolean, jsonObject)

        const resultingObject: ModelWithBoolean = {
          name: 'John',
          flag: true,
        }

        expect(requestPayload).toEqual(resultingObject)
      })

      it('builds false value', () => {
        const jsonObject = {
          name: 'John',
          flag: false,
        }
        const requestPayload = buildObject(ModelWithBoolean, jsonObject)

        const resultingObject: ModelWithBoolean = {
          name: 'John',
          flag: false,
        }

        expect(requestPayload).toEqual(resultingObject)
      })
    })

    describe('class with optional boolean with default', () => {
      it('builds true value', () => {
        const jsonObject = {
          name: 'John',
          flag: true,
        }
        const requestPayload = buildObject(ModelWithOptionalBoolean, jsonObject)

        const resultingObject: ModelWithOptionalBoolean = {
          flag: true,
        }

        expect(requestPayload).toEqual(resultingObject)
      })

      it('builds false value', () => {
        const jsonObject = {
          name: 'John',
          flag: false,
        }
        const requestPayload = buildObject(ModelWithOptionalBoolean, jsonObject)

        const resultingObject: ModelWithOptionalBoolean = {
          flag: false,
        }

        expect(requestPayload).toEqual(resultingObject)
      })

      it('builds false as default value', () => {
        const jsonObject = {}
        const requestPayload = buildObject(
          ModelWithOptionalBooleanWithFalseDefault,
          jsonObject
        )

        const resultingObject: ModelWithOptionalBooleanWithFalseDefault = {
          flag: false,
        }

        expect(requestPayload).toEqual(resultingObject)
      })

      it('uses json value instead of default', () => {
        const jsonObject = {
          flag: true,
        }
        const requestPayload = buildObject(
          ModelWithOptionalBooleanWithFalseDefault,
          jsonObject
        )

        const resultingObject: ModelWithOptionalBooleanWithFalseDefault = {
          flag: true,
        }

        expect(requestPayload).toEqual(resultingObject)
      })
    })
  })

  describe('when dealing with a valid JSON object', () => {
    it('should convert and successfuly validate the resulting typescript object', () => {
      const jsonObject = {
        name: 'John',
        baseModel: {
          title: 'title property',
        },
        MODEL_PROPS: [
          {
            title: 'something',
            comment: 'this one has a comment',
          },
          {
            title: 'another something',
          },
        ],
      }
      const requestPayload = buildObject(RequestPayloadModel, jsonObject)

      const resultingObject: RequestPayloadModel = {
        name: 'John',
        baseModel: {
          title: 'title property',
        },
        modelProps: [
          {
            title: 'something',
            comment: 'this one has a comment',
          },
          {
            title: 'another something',
          },
        ],
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

    describe('when target class has a property with a default value set', () => {
      describe('when the property is present in the JSON object', () => {
        it('should set the target object property with the JSON object value', () => {
          const name = 'JSON object name'
          const jsonObject = { name }
          const targetObject = buildObject(OptionalBuildModel, jsonObject)

          expect(targetObject.name).toEqual(name)
        })
      })

      describe('when the property is not present in the JSON object', () => {
        it('should set the target object property with the default value', () => {
          const targetObject = buildObject(OptionalBuildModel, {})

          expect(targetObject.name).toEqual('No name informed')
        })
      })
    })
  })

  describe('when dealing with an invalid JSON object', () => {
    const invalidJsonObject = {
      name: 'John',
      model: [
        {
          title: 'something',
        },
      ],
    }

    function test() {
      buildObject(RequestPayloadModel, invalidJsonObject)
    }

    it('should rise a error when missing a property', () => {
      expect(test).toThrowError(
        `Property 'baseModel' is missing. Couldn't build RequestPayloadModel object.`
      )
    })
  })

  describe('when string field is empty', () => {
    const model = {
      NAME: '',
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
        createdAt: '2020-08-14T17:34:42.475Z',
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
          createdAt: '2020-08-14T17:34:42.475Z',
        }
        const builder = () => buildObject(PrimitiveModel, model)

        it('should throw an error', () => {
          expect(builder).toThrowError()
        })
      })

      describe('when the expected property type is a date', () => {
        const model = {
          counter: '54',
          createdAt: '2020-08-99',
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
            index: '0',
          },
          {
            date: '03/09/2019',
            valueDate: '03/09/2019',
            index: '1',
          },
        ],
      },
    }

    const expected = {
      movement: [
        {
          date: '02/09/2019',
          valueDate: '02/09/2019',
          index: 0,
        },
        {
          date: '03/09/2019',
          valueDate: '03/09/2019',
          index: 1,
        },
      ],
    }

    it('should build successfuly', () => {
      const result = buildObject(Statement, payload)

      expect(result).toEqual(expected)
    })
  })
})
