import { ClassConstructor } from './types/class-constructor'
import { Metadata } from './metadata'

type Hashable = { [key: string]: any }

export function extractObject<T>(
    content: Hashable & T,
    target: ClassConstructor<T>
): object {
    const propertyMetadata = Metadata.getInstance()
        .propertyMetadata
        .get(target.name)

    const resultingObject: Hashable = {}

    if (propertyMetadata) {
        // TODO validate presence
        for (const { name, propertyKey } of propertyMetadata) {
            const value = content[propertyKey]

            resultingObject[name] = value
        }
    }

    return resultingObject
}
