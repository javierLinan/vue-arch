import { TYPES } from '@/types'
import { Command } from '@/domain/use-cases/command'
import { Inject } from '@/domain/di/inject'
import { Todo } from '@/domain/models/todo/todo'
import { Injectable } from '@/domain/di/injectable'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { Form } from '@/domain/forms/form'
import { CreateTodo } from '@/domain/models/todo/create-todo'
import { StateManager } from '@/application/state-manager/state-manager'
import { BaseRunner } from '@/domain/runner/runners/base-runner'

@Injectable()
export class CreateTodoCmd extends Command<Form<CreateTodo>> {
  constructor(
    @Inject(TYPES.RUNNER_BASE) protected readonly runner: BaseRunner,
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.REPOSITORY_TODO) private readonly todoRepository: TodoRepository
  ) {
    super()
  }

  async internalExecute(form: Form<CreateTodo>): Promise<void> {
    this.stateManager.patch({ errors: form.errors })

    form.validate()

    if (form.errors.length === 0) {
      const todos = this.stateManager.state.todos
      const { text, description } = form.data()
      const currentId =
        todos
          .map(todo => todo.id)
          .slice()
          .sort()
          .reverse()[0] ?? 0
      const newTodo: Todo = {
        id: currentId + 1,
        completed: false,
        text,
        description
      }

      this.todoRepository.create(newTodo)
      this.stateManager.patch({ todos: [...todos, newTodo] })
    }
  }
}
