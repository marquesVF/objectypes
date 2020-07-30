/* eslint-disable no-useless-constructor */
import { Hashable } from './types/hashable'
import { buildObject } from './build-object'
import { extractObject } from './extract-object'
import { validateObject } from './validate-object'
import { ClassConstructor, ValidationResult, ValidationErrorResult }
    from './types'
import { ValidationErrors } from './types/validation-errors'

export class ObjectHandler<T> {

    constructor(
        private readonly klass: ClassConstructor<T>
    ) { }

    private buildValidationErrorResult(
        errors: ValidationErrors
    ): ValidationErrorResult {
        const { presenceErrors, typeErrors } = errors
        const presenceErrorSummary = presenceErrors.length > 0
            ? `properties ('${presenceErrors.join(`, `)}') are missing`
            : undefined
        const typeErrorSummary = typeErrors.length > 0
            ? typeErrors.map(errors => {
                const { expectedType, propertyKey, propertyType } = errors

                return `'${propertyKey}' type '${propertyType}' is not`
                    + ` assignable to ${expectedType}`
            })
                .join(', ')
            : undefined
        const finalSumarry = presenceErrorSummary
            ? presenceErrorSummary
            : typeErrorSummary ?? ''
        const errorSummary = presenceErrorSummary && typeErrorSummary
            ? `${presenceErrorSummary}. ${typeErrorSummary}`
            : finalSumarry

        return { presenceErrors, typeErrors, errorSummary }
    }

    validate(obj: Hashable): ValidationResult {
        const errors = validateObject(this.klass, obj)
        const { presenceErrors, typeErrors } = errors
        const valid = presenceErrors.length === 0 && typeErrors.length === 0

        if (!valid) {
            return { valid, errors: this.buildValidationErrorResult(errors) }
        }

        return { valid }
    }

    build(jsonObj: object): T {
        return buildObject(this.klass, jsonObj)
    }

    extract(obj: T): object {
        return extractObject(obj, this.klass)
    }

}
