import { Injectable } from '@/domain/di/injectable'
import { Validator } from '@/domain/validation/validator'
import { ValidationErrorMapper } from '@/domain/validation/validation-error-mapper'
import { FormData } from '@/domain/forms/form-data'
import { Inject } from '@/domain/di/inject'
import { validate, ValidationError as ClassValidatorError } from 'class-validator'
import { TYPES } from '@/types'

@Injectable()
export class ClassValidator implements Validator {
  constructor(
    @Inject(TYPES.MAPPER_VALIDATION_ERROR)
    private readonly validationErrorMapper: ValidationErrorMapper
  ) {}

  async validate(model: FormData) {
    const classValidationErrors: ClassValidatorError[] = await validate(model)
    return classValidationErrors.map(this.validationErrorMapper.toValidationError)
  }
}
