import { path } from 'ramda'

import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './utils/metadata'
import { Hashable } from './types/hashable'

export function buildObject<T>(
    targetKlass: ClassConstructor<Hashable & T>,
    jsonObj: Hashable
): T {
    const targetObj = new targetKlass()
    const properties = Metadata.getInstance().findProperties(targetKlass)

    if (properties) {
        for (const { propertyKey, name, type, nullable } of properties) {
            const objPropName = name ?? propertyKey

            const value = path<any>(objPropName.split('.'), jsonObj)

            if (value === undefined && !nullable) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `Property '${objPropName}' is missing. Couldn't build an ${targetKlass.name} object.`
                )
            }

            if (type && !nullable) {
                const nestedValue = Array.isArray(value)
                    ? value.map(val => buildObject(type, val))
                    : buildObject(type, value)

                Reflect.set(targetObj, propertyKey, nestedValue)
            } else {
                Reflect.set(targetObj, propertyKey, value)
            }
        }
    }

    return targetObj
}
