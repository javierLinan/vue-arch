import { Inject } from '@/domain/di/inject'
import { ValidationError } from '@/domain/validation/validation-error'
import { Validator } from '@/domain/validation/validator'
import { TYPES } from '@/types'
import { FormData } from './form-data'

export class Form<T extends FormData> {
  _formData: T
  _errors: ValidationError[]
  _touched: Set<string>

  constructor(@Inject(TYPES.VALIDATOR) private readonly validator: Validator, formData: T) {
    this._formData = formData
    this._errors = []
    this._touched = new Set()
  }

  get pristine() {
    return this._touched.size === 0
  }

  get errors() {
    return this._errors
  }

  async update(partial: Partial<T>) {
    this._formData.$update(partial)

    for (const dataKey in partial) {
      this._touched.add(dataKey)
    }

    this._errors = await this.validator.validate(this._formData)
  }

  async clear() {
    this._formData.$clear()
    this._errors = await this.validator.validate(this._formData)
    this._touched = new Set()
  }

  async validate() {
    this._errors = await this.validator.validate(this._formData)
    for (const dataKey of Object.keys(this._formData)) {
      this._touched.add(dataKey)
    }
  }

  error(dataKey: string) {
    const error = this._errors.find(
      error => error.property === dataKey && this._touched.has(dataKey)
    )

    return (error && error.messages) || []
  }

  firstError(dataKey: string) {
    const error = this._errors.find(
      error => error.property === dataKey && this._touched.has(dataKey)
    )

    return (error && error.messages[0]) || []
  }

  data() {
    return this._formData
  }
}
