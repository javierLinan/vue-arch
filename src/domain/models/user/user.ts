import { Role } from '@/domain/access-control/role'

export interface User {
  id: string
  firstName: string
  lastName: string
  roles: Role[]
}
