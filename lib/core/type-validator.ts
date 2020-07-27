import { TypeError } from '../types/validation-errors'

export function isTypeValid(
    target: Object,
    propertyKey: string,
    value: unknown
): TypeError | undefined {
    const propertyType = typeof value
    const expectedType = Reflect
        .getMetadata('design:type', target, propertyKey)
        .name
        .toLowerCase()

    if (expectedType === propertyType) {
        return
    }

    return { expectedType, propertyKey, propertyType }
}
