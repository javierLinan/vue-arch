import { Injectable } from '@/domain/di/injectable'
import { LoggerLink } from '@/domain/runner/links/logger-link'
import { ExecutorLink } from '@/domain/runner/links/executor-link'
import { Inject } from '@/domain/di/inject'
import { TYPES } from '@/types'
import { Runner } from './runner'

@Injectable()
export class BaseRunner extends Runner {
  chain = this.executorLink.setNext(this.loggerLink)

  constructor(
    @Inject(TYPES.LINK_EXECUTOR) private readonly executorLink: ExecutorLink,
    @Inject(TYPES.LINK_LOGGER) private readonly loggerLink: LoggerLink
  ) {
    super()
  }
}
