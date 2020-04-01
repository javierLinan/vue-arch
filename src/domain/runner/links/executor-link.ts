import { BaseLink } from './base-link'
import { Context } from './context'
import { Injectable } from '@/domain/di/injectable'

@Injectable()
export class ExecutorLink extends BaseLink {
  async next(context: Context) {
    context.result = await context.useCase.internalExecute(context.param)
    this.nextLink.next(context)
  }
}
