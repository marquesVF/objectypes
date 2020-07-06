import { assocPath } from 'ramda'

import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './core/metadata'
import { Hashable } from './types/hashable'

export function extractObject<T>(
    obj: Hashable & T,
    objKlass: ClassConstructor<T>
): object {
    let resultingObject: Hashable = {}
    const propertyMetadata = Metadata.getInstance().findProperties(objKlass)

    if (propertyMetadata) {
        for (const { name, propertyKey, type } of propertyMetadata) {
            let value = obj[propertyKey]

            if (type && value !== undefined) {
                if (Array.isArray(value)) {
                    value = value.map(val => extractObject(val, type))
                } else {
                    value = extractObject(value, type)
                }
            }

            const resultingProperty = name ?? propertyKey

            resultingObject = assocPath(
                resultingProperty.split('.'),
                value,
                resultingObject
            )
        }
    }

    return resultingObject
}
