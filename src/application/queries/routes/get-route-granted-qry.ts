import { TYPES } from '@/types'
import { Inject } from '@/domain/di/inject'
import { Injectable } from '@/domain/di/injectable'
import { Query } from '@/domain/use-cases/query'
import { Route } from '@/domain/models/route/route'
import { BaseRunner } from '@/domain/runner/runners/base-runner'
import { UserRepository } from '@/domain/models/user/user-repository'
import { AccessControl } from '@/domain/access-control/access-control'

@Injectable()
export class GetRouteGrantedQry extends Query<Route, Route> {
  constructor(
    @Inject(TYPES.RUNNER_BASE) protected readonly runner: BaseRunner,
    @Inject(TYPES.ACCESS_CONTROL) private readonly accessControl: AccessControl,
    @Inject(TYPES.REPOSITORY_USER) private readonly userRepository: UserRepository,
    @Inject(TYPES.LOGIN_PAGE_NAME) private readonly loginPageName: string
  ) {
    super()
  }

  async internalExecute(route: Route): Promise<Route> {
    const user = this.userRepository.getSelf()

    if (!this.accessControl.checkRoute(user, route)) {
      route.redirectTo = {
        name: this.loginPageName
      }
    }

    return route
  }
}
