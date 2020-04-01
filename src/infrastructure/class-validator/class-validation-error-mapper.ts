import { ValidationErrorMapper } from '@/domain/validation/validation-error-mapper'
import { ValidationError } from '@/domain/validation/validation-error'
import { ValidationError as ClassValidationError } from 'class-validator'
import { Injectable } from '@/domain/di/injectable'

@Injectable()
export class ClassValidationErrorMapper implements ValidationErrorMapper {
  toValidationError(rawError: ClassValidationError): ValidationError {
    const { property } = rawError
    const messages: string[] = []

    for (const constraint in rawError.constraints) {
      messages.push(rawError.constraints[constraint])
    }

    return {
      property,
      messages
    }
  }
}
