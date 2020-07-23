# objectypes

An easy and type-safe way to transform and validate json objects and typed objects in a type-safe and descriptive manner.

## Installation

Run `npm i --save objectypes` to add it to your project.

## Decorators

### `@Property`
Indicate what properties should be validated by `objectypes` methods.

- Parameters:
    - **name**?: describe the json object property name to use in the json object extraction. You can use an object path notation so `objectype` will extract or build the object with the expected structure. For example:
    ```typescript
    import { Property, extractObject } from 'objectypes'

    class ComplexModel {
        @Property({ name: 'data.complex '})
        complexData: string
    }
    const typedObj: ComplexModel = {
        complexData: 'foo'
    }

    // {
    //     "data": {
    //         "complex": "foo"
    //     }
    // }
    extractObject(typedObj, ComplexModel)
    ```
    - **type**?: apply `extractObject` to nested property (recursively if an array).
    - **nullable**?: a flag to indicate if a property can be missing or have a null value in the json representation. It is used by the `buildObject` method when validating property presence. 

- Example:

```typescript
import { Property } from 'objectypes'

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

    @Property({ name: 'FOO', nullable: true })
    foo?: string
}
```

### `@MapProperty`
Specify how an attribute of an object **A** is mapped to another object **B** if the property name is different. If the property name is the same, there's no need to use this decorator. Use `@Property` instead.

- Parameters:
    - **klass**: target class of the mapping.
    - **propKey**: property name in the target class mapped to the current property being decorated.

- Example:
```typescript
import { Property, MapProperty } from 'objectypes'

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

### `@PropTransformation`
*obs: it only works with extractObject in current implementation

Sets a transformation function in the form `<T, K>(value: T) => K` in which a property of type `T` is transformed into a type `K`.

- Parameters:
    - **fn**: transformation function.
    - **scope**: can be either `extract` or `build` for `extractObject` and `buildObject` respectively.

- Example:
```typescript
import { extractObject } from 'objectypes'

class Transformable {
    @PropTransformation(
        (value: Date): number => value.getTime(),
        'extract'
    )
    @Property({ name: 'time' })
    timeDate: Date
}

const transformableObj: Transformable = {
    timeDate: new Date('2020-07-06T20:28:18.256Z')
}

// {
//     time: 1594067298256
// }
extractObject(transformableObj, Transformable)
```

## Methods

### extractObject

Convert a typescript object to a json object.

- Parameters:
    - **obj**: a typed object.
    - **objKlass**: a typed object class with decorated properties.

- Example:
```typescript
import { extractObject } from 'objectypes'

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
import { mapObject } from 'objectypes'

const vendorObject: VendorModel = {
    vendorName: 'Pink Floyd',
    comment: 'another brick on the wall'
}

// It returns a VendorClient object
// {
//     vendor: "Pink Floyd",
//     comment: "another brick on the wall"   
// }
mapObject(VendorClient, VendorModel, vendorObject)
```

### buildObject

Validate the presence of all required attributes in a json object and transform it into a typed object.

It raises an error if a required property is missing in the json object. You can flag a property as optional with the `nullable` option set to `true`.

You can consider `buildObject` as the inverse of `extractObject`.

By default, when specifing the property name (e.g. `@Property({ name: 'FOO' })`), if the json object doesn't have the property under the specified name, `buildObject` will look for the typed class property name instead.

- Parameters:
    - **targetKlass**: typed class to map the json properties
    - **jsonObj**: json object

- Example:
```typescript
import { buildObject } from 'objectypes'

// Suppose this json object came in a HTTP request body payload.
// This is a common scenario in many applications.
const json = {
    "id": "1",
    "originalName": "foo",
    "NESTED": {
        "CODE": "1234"
    },
    "foo": "hello world"
}

// It returns a FooModel object
// {
//     id: '1',
//     name: 'foo',
//     nested: {
//        code: '1234'
//     },
//     foo: 'hello world'
// }
buildObject(FooModel, json)
```

### validate

Validate the presence of all required attributes in an unknown object. It returns an array of string describing the validation errors.

- Parameters:
    - **klass**: target  class to validate against
    - **obj**: object from unknown type

### isValid

Validate the presence of all required attributes in an unknown object returning a boolean value.

- Parameters:
    - **klass**: target  class to validate against
    - **obj**: object from unknown type

### Using the JsonMapper class

You can also use a class based approach to handle object validation and transformation.

- Example:
```typescript
import { JsonMapper } from 'objectypes'

function handleRequestPaylaod(value: unknown): VendorModel {
    const mapper = new JsonMapper(VendorModel)

    if (mapper.validate(value)) {
        return mapper.build(value)
    } else {
        throw new Error(mapper.validationErrorSummary())
    }
}
```
