# objectypes

A type-safe library to transform and validate objects.

## Installation
Make sure these `compilerOptions` flags are in the `tsconfig.json` file.

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```

Run `npm i --save objectypes` to add it to your project.

## Quick Start

### Using objectypes with express

Validate incoming data to your API is really easy with objectypes:

```typescript
import express, { Request, Response, json } from 'express'
import { Property, ObjectHandler } from 'objectypes'

class UserDto {

    @Property()
    name: string

    @Property()
    email: string

    @Property()
    contactedAt: Date

}

const app = express()
app.use(json())

app.post('/users', (req: Request, res: Response) => {
    const userValidator = new ObjectHandler(UserDto)
    const errors = userValidator.validate(req.body)

    if (errors) {
        res.status(400).send({ errors: errors.summary })
    } else {
        const user = userValidator.build(req.body)

        res.send(user)
    }
})

app.listen(3000)
console.log('Listening on port 3000')
```

## API Reference

### Decorators

#### `@Property`
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

#### `@MapProperty`
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

const vendor: VendorModel = {
    vendorName: 'a name',
    comment: 'a comment'
}

// {
//     vendor: 'a name',
//     comment: 'a comment'
// }
mapObject(VendorClient, VendorModel, vendor)
```

#### `@MapAndTransformProperty`
Similar to `@MapProperty`. But instead of mapping a property by its name, you can pass a class that implements the `MapTransformer<T, K>` interface. Such class will take a target object `T`, process it and return a value of type `K`. `K` should be the type of property.

- Parameters:
    - **klass**: target class of the mapping.
    - **transformer**: a `MapTransformer` object.

- Example:
```typescript
class LogSummaryTransformer implements MapTransformer<BuildLog, string > {
    transform(obj: BuildLog): string {
        const { builded, logs } = obj

        return builded ? logs.join(' ') : 'No logs'
    }
}

class BuildLog {

    @Property()
    builded: boolean

    @Property()
    logs: string[]

}

class LogSummary {

    @MapAndTransformProperty(Log, new LogSummaryTransformer())
    @Property()
    buildSummary: string

}

const log: Log = {
    builded: true,
    logs: ['hello', 'world']
}

// {
//     buildSummary: 'hello world'
// }
mapObject(LogSummary, BuildLog, log)
```

#### `@BuildTransformation`

Sets a transformation function in the form `<T>(value: unknown) => T` in which an unknown property is transformed into a type `T`.

- Parameter:
    - **transformer**: a `BuildTransformer` object.

- Example:
```typescript
import { extractObject, BuildTransformer } from 'objectypes'

class SanitizerTransformation implements BuildTransformer<string> {
    transform(value: string): string {
        return value.replace('-', '')
    }
}

class Transformable {
    @BuildTransformation(new SanitizerTransformation())
    @Property()
    code: string
}

const jsonObject = {
    code: '34-534'
}

// {
//     code: '34534'
// }
buildObject(Transformable, jsonObject)
```

#### `@ExtractTransformation`

Sets a transformation function in the form `<T, K>(value: T) => K` to transform a property from type `T` to type `K`.

- Parameter:
    - **transformer**: a `ExtractTransformer` object.

- Example:
```typescript
import { extractObject } from 'objectypes'

class Transformable {
    @ExtractTransformation({
        transform: (value: Date): number => value.getTime()
    })
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

### Methods

#### extractObject

Convert a typescript object to a json object.

- Parameters:
    - **obj**: a typed object.
    - **objKlass**: a typed object class with decorated properties.
    - **options**: a ExtractOptions object.
        - **namedOnly**?: a `boolean` flag to indicate that only properties with specified names should be extracted. For example: `@Property({ name: 'Name' })`.

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

#### mapObject

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

#### buildObject

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

#### validateObject

Validate the presence of all required attributes in an unknown object. It returns an object with two arrays of presence and type errors found in the validation. If no error was found, both arrays will be empty.

- Parameters:
    - **klass**: target  class to validate against
    - **obj**: object from unknown type

### Using the ObjectHandler class

You can also use a class based approach to handle object validation and transformation.

- Example:
```typescript
import { ObjectHandler } from 'objectypes'

function handleRequestPaylaod(value: unknown): VendorModel {
    const handler = new ObjectHandler(VendorModel)
    const errors = handler.validate(value)

    if (errors) {
        throw new Error(errors.summary)
    }

    return handler.build(value)
}
```
