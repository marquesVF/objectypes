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
        // TODO validate presence
        for (const { name, propertyKey } of propertyMetadata) {
            const value = content[propertyKey]

            resultingObject[name] = value
        }
    }

    return resultingObject
}
