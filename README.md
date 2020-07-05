# objectypes

An easy and type-safe way to transform and validate json objects and typed objects in a type-safe and descriptive manner.

## Installation

Run `npm i --save objectypes` to add it to your project.

## Decorators

### `@Property`
Indicate what properties should be validated by `objectypes` methods.

- Parameters:
    - **name**?: describe the json object property name to use in the json object extraction.
    - **type**?: apply `extractObject` to nested property (recursively if an array).
    - **nullable**?: a flag to indicate if a property can be missing or have a null value in the json representation. It is used by the `buildObject` method when validating property presence. 

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
Specify how an attribute of an object **A** is mapped to another object **B** if the property name is different. If the property name is the same, there's no need to use this decorator. Use `@Property` instead.

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

Convert a typescript object to a json object.

- Parameters:
    - **obj**: a typed object.
    - **objKlass**: a typed object class with decorated properties.

- Example:
```typescript
const foo: FooModel = {
    id: '1',
    name: 'foo',
    nested: {
        code: '1234'
    }
}

// {
//     "id": "1",
//     "originalName": "foo",
//     "NESTED": {
//         "CODE": "1234"
//     }
// }
extractObject(foo, FooModel)
```

### mapObject

Convert a typed object to another typed object. Even if property names are different.

- Parameters:
    - **targetKlass**: target class to map the `obj` properties
    - **objKlass**: `obj` current class
    - **obj**: typed object

- Example:
```typescript
const vendorObject: VendorModel = {
    vendorName: 'Pink Floyd',
    comment: 'another brick on the wall'
}

// It returns a VendorClient object
// {
//     "vendor": "Pink Floyd",
//     "comment": "another brick on the wall"   
// }
mapObject(VendorClient, VendorModel, vendorObject)
```

### buildObject

Validate the presence of all required attributes in a json object and transform it into a typed object.

It raises an error if a required property is missing in the json object. You can flag a property as optional with the `nullable` option set to `true`.

You can consider `buildObject` as the inverse of `extractObject`.

- Parameters:
    - **targetKlass**: typed class to map the json properties
    - **jsonObj**: json object

- Example:
```typescript
// Suppose this json object came in a HTTP request body payload.
// This is a common scenario in many applications.
const json = {
    "id": "1",
    "originalName": "foo",
    "NESTED": {
        "CODE": "1234"
    }
}

// It returns a FooModel object
// {
//     id: '1',
//     name: 'foo',
//     nested: {
//        code: '1234'
//     }
// }
buildObject(FooModel, json)
```