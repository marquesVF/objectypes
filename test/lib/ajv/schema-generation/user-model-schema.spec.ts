import { findMetadataAndGenerateSchema } from '../../../../lib/ajv/utils/class-metadata'
import { UserModel } from '../../../fixtures/ajv/user-model'
import { userModelJTDSchema } from '../../../fixtures/ajv/user-model-ajv-schema'

describe('UserModel Schema spec', () => {
  describe('when generating a JSON schema', () => {
    const userModelSchema = findMetadataAndGenerateSchema(UserModel)

    it('generates the expected schema', () => {
      expect(userModelSchema).toEqual(userModelJTDSchema)
    })

    it('reuses the already generated schema object', () => {
      const firstSchema = findMetadataAndGenerateSchema(UserModel)
      const secondSchema = findMetadataAndGenerateSchema(UserModel)

      expect(Object.is(firstSchema, secondSchema)).toBeTruthy()
    })
  })
})
