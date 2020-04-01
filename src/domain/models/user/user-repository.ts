import { User } from './user'

export interface UserRepository {
  getSelf(): User
}
