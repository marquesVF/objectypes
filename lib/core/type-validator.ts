export function isTypeValid(
    target: Object,
    propertyKey: string,
    value: unknown
): boolean {
    const propertyType = Reflect
        .getMetadata('design:type', target, propertyKey)
        .name
        .toLowerCase()

    return propertyType === typeof value
}
