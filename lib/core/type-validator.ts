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

    if (expectedType === 'date' && typeof value === 'string') {
        if (!isNaN(new Date(value).getTime())) {
            return
        }
    }

    if (expectedType === 'number'
        && ['string', 'number'].includes(typeof value)
    ) {
        if (!isNaN(Number(value))) {
            return
        }
    }

    if (expectedType === propertyType) {
        return
    }

    return { expectedType, propertyKey, propertyType }
}
