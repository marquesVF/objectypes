import { ValidationErrors } from './validation-errors'

export interface ErrorSummary extends ValidationErrors {
    summary: string
}

