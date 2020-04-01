import { TYPES } from '@/types'
import { Injectable } from '@/domain/di/injectable'
import { Inject } from '@/domain/di/inject'
import { Validator } from '@/domain/validation/validator'
import { FormData } from './form-data'
import { Form } from './form'

@Injectable()
export class FormFactory {
  constructor(@Inject(TYPES.VALIDATOR) private readonly validator: Validator) {}
  createForm<T extends FormData>(data: T) {
    const form = new Form(this.validator, data)

    return new Proxy(form, {
      has(target, key) {
        if (key[0] === '_') {
          return false
        }
        return key in target
      },
      get(target, prop) {
        // eslint-disable-next-line no-prototype-builtins
        if (target._formData.hasOwnProperty(prop)) {
          return target._formData[prop]
        } else {
          return Reflect.get(target, prop)
        }
      },
      set(target, prop, value) {
        // eslint-disable-next-line no-prototype-builtins
        if (target._formData.hasOwnProperty(prop)) {
          form.update({ [prop]: value } as Partial<T>)
          return true
        } else {
          return Reflect.set(target, prop, value)
        }
      }
    })
  }
}
