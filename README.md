# objectypes

An easy and type-safe way of handling typescript and JSON objects properly. With objectypes, you can convert and manipulate such objects in a descritive manner with decorators.

## Installation

Run `npm i --save objectypes` to add it to your project.

## Decorators

##### `@Property`
- Parameters:
    - **name**: describe the JSON object property name to use in the JSON object extraction.
    - **type**: apply `extractObject` to nested property (recursively if an array).

## Methods

#### extractObject

Convert a typescript to a JSON object.

- Example:

```typescript
class NestedModel {
    @Property({ name: 'CODE' })
    code: string
}

class FooModel {
    @Property()
    id: string

    @Property({ name: 'originalName' })
    name: string

    @Property({ name: 'NESTED', type: NestedModel })
    nested: NestedModel
}

const foo: FooModel = {
    id: '1',
    name: 'foo',
    nested: {
        code: '1234'
    }
}

/*
 * {
 *     "id": "1",
 *     "originalName": "foo",
 *     "NESTED": {
 *         "CODE": "1234"
 *     }
 * }
 */
extractObject(foo, FooModel)
```