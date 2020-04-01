import { Todo } from '@/domain/models/todo/todo'
import { ValidationError } from '@/domain/validation/validation-error'
import { User } from '@/domain/models/user/user'

export class State {
  todos: Todo[] = []
  errors: ValidationError[] = []
  user: User = null
}
