# objectypes

An easy and type-safe way of handling typescript and JSON objects properly. With objectypes, you can convert and manipulate such objects in a descritive manner with decorators.

## Installation

Run `npm i --save objectypes` to add it to your project.

## Usage Guide

#### extractObject

Convert a typescript object to a JSON object.

- Parameters:
    - **name**: describe the JSON object property name to use in the JSON object extraction.

- Example:

```typescript
class FooModel {
    @Property()
    id: string

    @Property({ name: 'originalName' })
    name: string
}

const foo = {
    id: '1'
    name: 'foo'
}

/*
 * {
 *     "id": "1",
 *      "originalName": "foo"
 * }
 */
extractObject(foo, FooModel)
}
```