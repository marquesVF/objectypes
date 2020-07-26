import { Metadata } from './core/metadata'
import { Hashable, ClassConstructor } from './types'

import { path } from 'ramda'

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
                || path<any>([propertyKey], jsonObj)

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
