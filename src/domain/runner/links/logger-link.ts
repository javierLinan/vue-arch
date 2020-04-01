import { BaseLink } from './base-link'
import { Context } from './context'
import { TYPES } from '@/types'
import { Injectable } from '@/domain/di/injectable'
import { Inject } from '@/domain/di/inject'
import { Logger } from '@/domain/use-cases/logger'

@Injectable()
export class LoggerLink extends BaseLink {
  constructor(@Inject(TYPES.LOGGER) private readonly logger: Logger) {
    super()
  }

  async next(context: Context) {
    this.logger.group(context.useCase.constructor.name)
    this.logger.group('Parameters')
    this.logger.log(`${JSON.stringify(context.param) ?? '-'}`)
    this.logger.groupEnd()
    this.logger.group('Result')
    this.logger.object(context.result ?? '-')
    this.logger.groupEnd()
    this.logger.groupEnd()
    this.nextLink.next(context)
  }
}
