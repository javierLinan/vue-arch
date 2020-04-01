import { FormData } from '@/domain/forms/form-data'
import { ValidationError } from './validation-error'

export interface Validator {
  validate(model: FormData): Promise<ValidationError[]>
}
