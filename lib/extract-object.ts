import { assocPath } from 'ramda'

import { Metadata } from './core/metadata'
import { Hashable, ClassConstructor } from './types'

export function extractObject<T>(
    obj: Hashable & T,
    objKlass: ClassConstructor<T>
): object {
    let resultingObject: Hashable = {}
    const metadataStorage = Metadata.getInstance()
    const propertyMetadata = metadataStorage.findProperties(objKlass)
    const transformations = metadataStorage
        .findTransformations(objKlass, 'extract')

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

                const transformMetadata = transformations
                    ?.find(metadata => metadata.propertyKey === propertyKey)
                if (transformMetadata) {
                    // TODO improve error handling since it may raise errors in runtine
                    value = transformMetadata.transformer.transform(value)
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
