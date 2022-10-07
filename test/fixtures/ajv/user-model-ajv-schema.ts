import { JSONSchemaType, JTDSchemaType } from 'ajv/dist/core'

import { UserModel } from './user-model'

export const userModelJSONSchema: JSONSchemaType<UserModel> = {
  additionalProperties: false,
  properties: {
    age: { type: 'number' },
    currentCart: {
      type: 'object',
      additionalProperties: 'false',
      properties: {
        cartId: { type: 'string' },
        totalItems: { type: 'number' },
      },
      required: [],
    },
    email: { type: 'string' },
    favoriteStoreNames: { type: 'array', items: {} },
  },
  required: ['currentCart'],
}

export const userModelJTDSchema: JTDSchemaType<UserModel> = {
  // export const userModelJTDSchema = {
  additionalProperties: false,
  properties: {
    currentCart: {
      additionalProperties: false,
      properties: {
        cartId: { type: 'string' },
        // ID: { type: 'string' },
        totalItems: { type: 'float64' },
      },
    },
    email: { type: 'string' },
    favoriteStoreNames: { elements: { type: 'string' } },
    isEmailConfirmed: { type: 'boolean' },
    isActionSuccessful: { elements: { type: 'boolean' } },
    name: { type: 'string' },
    rating: { type: 'float64' },
  },
  optionalProperties: {
    age: { type: 'float64' },
    orderIndexes: { elements: { type: 'float64' } },
  },
}
