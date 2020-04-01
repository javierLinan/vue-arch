import { Injectable } from '@/domain/di/injectable'
import { UserRepository } from '@/domain/models/user/user-repository'
import { Role } from '@/domain/access-control/role'

@Injectable()
export class UserFakeRepository implements UserRepository {
  getSelf() {
    return {
      id: '666',
      firstName: 'Curro',
      lastName: 'Jimenez',
      roles: [Role.REGISTERED]
    }
  }
}
