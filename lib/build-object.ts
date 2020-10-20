/* eslint-disable complexity */
import { path } from 'ramda'

import { Metadata } from './core/metadata'
import { Hashable, ClassConstructor } from './types'

export function buildObject<T>(
    targetKlass: ClassConstructor<Hashable & T>,
    jsonObj: Hashable
): T {
    const targetObj = new targetKlass()
    const metadataStorage = Metadata.getInstance()
    const properties = metadataStorage.findProperties(targetKlass)
    const transformations = metadataStorage
        .findTransformations(targetKlass, 'build')
    const reductions = metadataStorage.findReductions(targetKlass)

    if (properties) {
        for (const property of properties) {
            const { propertyKey, name, type, nullable, target } = property
            const objPropName = name ?? propertyKey

            if (reductions) {
                const reductionMetada = reductions
                        ?.find(metadata => metadata.propertyKey === propertyKey)
                if (reductionMetada) {
                    const value = reductionMetada.reducer.reduce(jsonObj)

                    Reflect.set(targetObj, propertyKey, value)
                    continue
                }
            }

            let value = path<any>(objPropName.split('.'), jsonObj) !== undefined
                ?  path<any>(objPropName.split('.'), jsonObj)
                : path<any>([propertyKey], jsonObj)

            if (value === undefined && !nullable) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `Property '${objPropName}' is missing. Couldn't build ${targetKlass.name} object.`
                )
            }

            const expectedType = Reflect
                .getMetadata('design:type', target, propertyKey)
                .name

            try {
                value = castValue(expectedType, value)
            } catch (err) {
                // eslint-disable-next-line max-len
                throw new Error(`Property ${objPropName} type is not assignable to ${expectedType}. Found ${value}`)
            }

            if (value !== undefined) {
                const transformMetadata = transformations
                    ?.find(metadata => metadata.propertyKey === propertyKey)
                if (transformMetadata) {
                    // TODO improve error handling since it may raise errors in runtine
                    value = transformMetadata.transformer.transform(value)
                }
            }

            if (type && value !== undefined) {
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

function castValue(expectedType: string, value?: any): any {
    if (value === undefined) {
        return value
    }

    if (expectedType === 'Number') {
        if (isNaN(value)) {
            throw new Error()
        }

        return Number(value)
    }
    if (expectedType === 'Date') {
        if (!Date.parse(value)) {
            throw new Error()
        }

        return new Date(value)
    }

    return value
}
