import { Injectable } from '@/domain/di/injectable'
import { User } from '@/domain/models/user/user'
import { Route } from '@/domain/models/route/route'
import { AccessControl } from '@/domain/access-control/access-control'
import { rules } from './rules'
import { Role } from '@/domain/access-control/role'

@Injectable()
export class RoleBasedAccessControl extends AccessControl {
  checkRoute(user: User, route: Route) {
    const userRoles = (user && user.roles) || []
    return this.check(userRoles, `${route.name}:visit`, {
      userId: user.id,
      routeParamId: route.params.userId
    })
  }
  checkAction(user: User, action: string, data: Record<string, unknown>) {
    const userRoles = (user && user.roles) || []
    return this.check(userRoles, action, data)
  }
  private check(userRoles: Role[], action: string, data: Record<string, unknown>) {
    for (const role of userRoles) {
      const permissions = rules[role]

      if (!permissions) {
        break
      }

      if (permissions.static.length > 0 && permissions.static.includes(action)) {
        return true
      }

      const condition = (permissions.dynamic || {})[action]

      if (condition && condition(data)) {
        return true
      }
    }

    return false
  }
}
