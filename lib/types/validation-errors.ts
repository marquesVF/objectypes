export interface TypeError {
    propertyKey: string
    propertyType: string
    expectedType: string
}

export interface ValidationErrors {
    presenceErrors: string[]
    typeErrors: TypeError[]
}
