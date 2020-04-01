import { TYPES } from '@/types'
import { Inject } from '@/domain/di/inject'
import { Todo } from '@/domain/models/todo/todo'
import { Injectable } from '@/domain/di/injectable'
import { Query } from '@/domain/use-cases/query'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { BaseRunner } from '@/domain/runner/runners/base-runner'
import { StateManager } from '@/application/state-manager/state-manager'

@Injectable()
export class GetTodosQry extends Query<Todo[]> {
  constructor(
    @Inject(TYPES.RUNNER_BASE) protected readonly runner: BaseRunner,
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.REPOSITORY_TODO) private readonly todoRepository: TodoRepository
  ) {
    super()
  }

  async internalExecute(): Promise<Todo[]> {
    if (this.stateManager.state.todos.length === 0) {
      const todos = this.todoRepository.findAll()
      this.stateManager.patch({ todos })
    }
    return this.stateManager.state.todos
  }
}
