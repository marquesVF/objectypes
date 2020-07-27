import { ValidationErrors } from './validation-errors'

export interface ValidationResult extends ValidationErrors {
    valid: boolean
}
