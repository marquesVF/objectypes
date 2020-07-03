# objectypes

An easy and type-safe way of handling typescript and JSON objects properly. With objectypes, you can convert and manipulate such objects in a descritive manner with decorators.

## Installation

Run `npm i --save objectypes` to add it to your project.

## Decorators

### `@Property`
Use it to indicate what properties should be validated by `objectypes` methods.

- Parameters:
    - **name**?: describe the JSON object property name to use in the JSON object extraction.
    - **type**?: apply `extractObject` to nested property (recursively if an array).

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
```

### `@MapProperty`
Used to specify how an attribute of an object **A** is mapped to another object **B** if the property name is different. If the property name is the same, there's no need to use this decorator. Use `@Property` instead.

- Parameters:
    - **klass**: target class of the mapping.
    - **propKey**: property name in the target class mapped to the current property being decorated.

- Example:
```typescript
class VendorModel {

    @Property()
    vendorName: string

    @Property()
    comment: string
}

class VendorClient {

    @MapProperty(VendorModel, 'vendorName')
    vendor: string

    @Property()
    comment: string

}
```

## Methods

### extractObject

Convert a typescript object to a JSON object.

- Parameters:
    - **obj**: a typescript object.
    - **objKlass**: the typescript object class with decorated properties.

- Example:
```typescript
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

### mapObject

Convert a typescript object to another typescript object. Even if property names are different.

- Parameters:
    - **targetKlass**: typescript class mapping target
    - **objKlass**: typescript object class
    - **obj**: typescript object

- Example:
```typescript
const vendorObject: VendorModel = {
    vendorName: 'pink',
    comment: 'another brick on the wall'
}

// A 'VendorClient' object
/* 
 * {
 *     "vendor": "pink",
 *     "comment": "another brick on the wall"   
 * }
 */
mapObject(VendorClient, VendorModel, vendorObject)
```