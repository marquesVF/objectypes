import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './metadata'

type Hashable = { [key: string]: any }

export function extractObject<T>(
    content: Hashable & T,
    klass: ClassConstructor<T>
): object {
    const resultingObject: Hashable = {}
    const propertyMetadata = Metadata.getInstance().findProperties(klass)

    if (propertyMetadata) {
        for (const { name, propertyKey, type } of propertyMetadata) {
            let value = content[propertyKey]
            const resultingProperty = name ?? propertyKey

            if (type && value !== undefined) {
                if (Array.isArray(value)) {
                    value = value.map(val => extractObject(val, type))
                } else {
                    value = extractObject(value, type)
                }
            }

            resultingObject[resultingProperty] = value
        }
    }

    return resultingObject
}
