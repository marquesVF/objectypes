/* eslint-disable no-useless-constructor */
import { buildObject } from './build-object/build-object'
import { extractObject } from './extract-object'
import { validateObject } from './validate-object'
import { ClassConstructor, ErrorSummary, Hashable } from './types'
import { ValidationErrors } from './types/validation-errors'

export class ObjectHandler<T extends Hashable> {
  constructor(private readonly klass: ClassConstructor<T>) {}

  private buildValidationErrorResult(errors: ValidationErrors): ErrorSummary {
    const { presenceErrors, typeErrors } = errors
    const presenceErrorSummary =
      presenceErrors.length > 0
        ? `properties ('${presenceErrors.join(`, `)}') are missing`
        : undefined
    const typeErrorSummary =
      typeErrors.length > 0
        ? typeErrors
            .map(errors => {
              const { expectedType, propertyKey, propertyType } = errors

              return (
                `'${propertyKey}' type '${propertyType}' is not` +
                ` assignable to ${expectedType}`
              )
            })
            .join(', ')
        : undefined
    const finalSumarry = presenceErrorSummary
      ? presenceErrorSummary
      : typeErrorSummary ?? ''
    const errorSummary =
      presenceErrorSummary && typeErrorSummary
        ? `${presenceErrorSummary}. ${typeErrorSummary}`
        : finalSumarry

    return { presenceErrors, typeErrors, summary: errorSummary }
  }

  validate(obj: unknown): ErrorSummary | undefined {
    const errors = validateObject(this.klass, obj)
    const { presenceErrors, typeErrors } = errors
    const valid = presenceErrors.length === 0 && typeErrors.length === 0

    if (!valid) {
      return this.buildValidationErrorResult(errors)
    }

    return undefined
  }

  build(jsonObj: object): T {
    return buildObject(this.klass, jsonObj)
  }

  extract(obj: T): object {
    return extractObject(obj, this.klass)
  }
}
