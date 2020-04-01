import { User } from '@/domain/models/user/user'
import { Route } from '@/domain/models/route/route'

export abstract class AccessControl {
  abstract checkRoute(user: User, route: Route): boolean
  abstract checkAction(user: User, action: string, data?: Record<string, unknown>): boolean
}
