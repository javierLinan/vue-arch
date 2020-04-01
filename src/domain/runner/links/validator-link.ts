import { BaseLink } from './base-link'
import { Context } from './context'
import { Injectable } from '@/domain/di/injectable'
import { Form } from '@/domain/forms/form'
import { FormData } from '@/domain/forms/form-data'

@Injectable()
export class ValidatorLink extends BaseLink {
  async next(context: Context) {
    const form = context.param as Form<FormData>

    await form.validate()

    context.param = form

    this.nextLink.next(context)
  }
}
