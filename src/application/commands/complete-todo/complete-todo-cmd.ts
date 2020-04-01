import { TYPES } from '@/types'
import { Injectable } from '@/domain/di/injectable'
import { Command } from '@/domain/use-cases/command'
import { Inject } from '@/domain/di/inject'
import { Id } from '@/domain/models/todo/id'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { TodoNotFoundError } from '@/domain/models/todo/todo-not-found-error'
import { Todo } from '@/domain/models/todo/todo'
import { BaseRunner } from '@/domain/runner/runners/base-runner'
import { StateManager } from '@/application/state-manager/state-manager'

@Injectable()
export class CompleteTodoCmd extends Command<Id> {
  constructor(
    @Inject(TYPES.RUNNER_BASE) protected readonly runner: BaseRunner,
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.REPOSITORY_TODO) private readonly todoRepository: TodoRepository
  ) {
    super()
  }

  async internalExecute(id: Id): Promise<void> {
    const todos = this.stateManager.state.todos
    const foundTodo = todos.find(todo => todo.id === id)

    if (foundTodo === undefined) {
      throw new TodoNotFoundError()
    }

    this.todoRepository.update(id, { ...foundTodo, completed: !foundTodo.completed })
    this.updateState(id, todos)
  }

  private updateState(id: number, todos: Todo[]) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
    this.stateManager.patch({ todos: updatedTodos as Todo[] })
  }
}
