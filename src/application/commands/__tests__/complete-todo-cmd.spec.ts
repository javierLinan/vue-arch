import { CompleteTodoCmd } from '@/application/commands/complete-todo/complete-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '@/application/state-manager/state-manager'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { BaseRunner } from '@/domain/runner/runners/base-runner'

describe('CompleteTodoCmd', () => {
  it('should mark as completed a todo that was not completed', () => {
    const { completeTodoCmd, stateManager } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ completed: false, id: 1, text: 'irrelevant', description: 'irrelevant' }],
      errors: [],
      user: null
    })

    completeTodoCmd.internalExecute(1)

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toEqual([{ completed: true, id: 1, text: 'irrelevant' }])
  })

  it('should mark as not completed a todo that was completed', () => {
    const { completeTodoCmd, stateManager } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ completed: true, id: 1, text: 'irrelevant', description: 'irrelevant' }],
      errors: [],
      user: null
    })

    completeTodoCmd.internalExecute(1)

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toEqual([{ completed: false, id: 1, text: 'irrelevant' }])
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  when(stateManager.state).thenReturn({ todos: [], errors: [], user: null })
  const todoRepository = mock<TodoRepository>()
  const runner = mock<BaseRunner>()
  return {
    todoRepository,
    stateManager,
    completeTodoCmd: new CompleteTodoCmd(
      instance(runner),
      instance(stateManager),
      instance(todoRepository)
    )
  }
}
