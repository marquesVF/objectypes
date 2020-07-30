import { ValidationErrors } from './validation-errors'

export interface ValidationErrorResult extends ValidationErrors {
    errorSummary: string
}

export interface ValidationResult {
    valid: boolean
    errors?: ValidationErrorResult
}
