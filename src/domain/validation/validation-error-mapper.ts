import { ValidationError } from './validation-error'

export interface ValidationErrorMapper {
  toValidationError(rawValidationError: unknown): ValidationError
}
