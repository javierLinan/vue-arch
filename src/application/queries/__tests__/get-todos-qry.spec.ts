import { instance, mock, verify, when } from 'ts-mockito'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { BaseRunner } from '@/domain/runner/runners/base-runner'
import { GetTodosQry } from '@/application/queries/get-todos-qry'
import { StateManager } from '@/application/state-manager/state-manager'

describe('GetTodosQry', () => {
  it('should get the todos', () => {
    const { stateManager, getTodosQry } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ id: 1, completed: false, text: 'irrelevant', description: 'irrelevant' }],
      errors: [],
      user: null
    })

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
  })

  it("should find the todos and get them if there weren't any previously", () => {
    const { stateManager, getTodosQry, todoRepository } = setup()
    when(stateManager.state)
      .thenReturn({
        todos: [],
        errors: [],
        user: null
      })
      .thenReturn({
        todos: [{ id: 1, completed: false, text: 'irrelevant', description: 'irrelevant' }],
        errors: [],
        user: null
      })
    when(todoRepository.findAll()).thenReturn([
      { id: 1, completed: false, text: 'irrelevant', description: 'irrelevant' }
    ])

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
    verify(todoRepository.findAll()).once()
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const todoRepository = mock<TodoRepository>()
  const runner = mock<BaseRunner>()
  return {
    stateManager,
    todoRepository,
    getTodosQry: new GetTodosQry(instance(runner), instance(stateManager), instance(todoRepository))
  }
}
