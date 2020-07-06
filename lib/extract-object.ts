import { assocPath } from 'ramda'

import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './core/metadata'
import { Hashable } from './types/hashable'

export function extractObject<T>(
    obj: Hashable & T,
    objKlass: ClassConstructor<T>
): object {
    let resultingObject: Hashable = {}
    const metadataStorage = Metadata.getInstance()
    const propertyMetadata = metadataStorage.findProperties(objKlass)
    const transformationMetadata = metadataStorage.findTransformations(objKlass)

    if (propertyMetadata) {
        for (const { name, propertyKey, type } of propertyMetadata) {
            let value = obj[propertyKey]

            if (value !== undefined) {
                if (type) {
                    if (Array.isArray(value)) {
                        value = value.map(val => extractObject(val, type))
                    } else {
                        value = extractObject(value, type)
                    }
                }

                const transformation = transformationMetadata?.find(metadata =>
                    metadata.propertyKey === propertyKey)
                if (transformation) {
                    // TODO improve error handling since it may raise errors in runtine
                    value = transformation.fn(value)
                }

                const resultingProperty = name ?? propertyKey

                resultingObject = assocPath(
                    resultingProperty.split('.'),
                    value,
                    resultingObject
                )
            }
        }
    }

    return resultingObject
}
