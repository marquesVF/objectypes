/* eslint-disable complexity */
import { path } from 'ramda'

import { Metadata } from './core/metadata'
import { Hashable, ClassConstructor } from './types'

// TODO refactor this method. Use a class to build an object
export function buildObject<T>(
    targetKlass: ClassConstructor<Hashable & T>,
    jsonObj: Hashable
): T {
    const targetObj = new targetKlass()
    const metadataStorage = Metadata.getInstance()
    const properties = metadataStorage.findProperties(targetKlass)
    const transformations = metadataStorage
        .findTransformations(targetKlass, 'build')

    if (properties) {
        for (const property of properties) {
            const {
                propertyKey,
                name,
                type,
                nullable,
                target,
                builder
            } = property
            const objPropName = name ?? propertyKey

            let value = path<any>(objPropName.split('.'), jsonObj) !== undefined
                ?  path<any>(objPropName.split('.'), jsonObj)
                : path<any>([propertyKey], jsonObj)

            if (builder) {
                if (typeof builder === 'function') {
                    value = builder(jsonObj)
                }
                if (typeof builder === 'object') {
                    value = builder.build(value)
                }
            }

            if (value === undefined && !nullable) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `Property '${objPropName}' is missing. Couldn't build an ${targetKlass.name} object.`
                )
            }

            const expectedType = Reflect
                .getMetadata('design:type', target, propertyKey)
                .name

            if (expectedType === 'Date') {
                value = new Date(value)
            }

            const transformMetadata = transformations
                ?.find(metadata => metadata.propertyKey === propertyKey)
            if (transformMetadata) {
                // TODO improve error handling since it may raise errors in runtine
                value = transformMetadata.transformer.transform(value)
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
