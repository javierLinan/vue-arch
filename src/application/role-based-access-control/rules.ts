import { Role } from '@/domain/access-control/role'
import { Rule } from './rule'

export const rules: Record<Role, Rule> = {
  [Role.GUEST]: {
    static: ['login-page:visit', 'home-page:visit']
  },
  [Role.REGISTERED]: {
    static: ['todo-list-page:visit', 'home-page:visit', 'logout'],
    dynamic: {
      'user-settings-page:visit': ({ userId, routeParamUserId }) => {
        if (!userId || !routeParamUserId) return false
        return userId === routeParamUserId
      }
    }
  },
  [Role.MANAGER]: {
    static: ['manager-page:visit']
  },
  [Role.ADMIN]: {
    static: ['manager-page:visit', 'user-settings-page:visit']
  }
}
