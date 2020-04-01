import { CreateTodoCmd } from '@/application/commands/create-todo/create-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '@/application/state-manager/state-manager'
import { TodoRepository } from '@/domain/models/todo/todo-repository'
import { CreateTodo } from '@/domain/models/todo/create-todo'
import { FormFactory } from '@/domain/forms/form-factory'
import { ClassValidator } from '@/infrastructure/class-validator/class-validator'
import { ClassValidationErrorMapper } from '@/infrastructure/class-validator/class-validation-error-mapper'
import { BaseRunner } from '@/domain/runner/runners/base-runner'

const formFactory = new FormFactory(new ClassValidator(new ClassValidationErrorMapper()))

describe('CreateTodoCmd', () => {
  it('should create a new todo with an initial id', () => {
    const { stateManager, createTodoCmd } = setup()
    const createTodo = new CreateTodo()
    const form = formFactory.createForm(createTodo)

    createTodoCmd.internalExecute(form)

    const [actual] = capture(stateManager.patch).last()
    expect(actual).toEqual({ todos: [{ completed: false, text: 'foo', id: 1 }] })
  })

  it('should create a new todo with a consecutive id', () => {
    const { stateManager, createTodoCmd } = setup()
    const createTodo = new CreateTodo()
    const form = formFactory.createForm(createTodo)

    createTodo.text = 'foo'
    when(stateManager.state).thenReturn({
      todos: [{ completed: false, text: 'irrelevant', description: 'irrelevant', id: 3 }],
      errors: [],
      user: null
    })

    createTodoCmd.internalExecute(form)

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toContainEqual({ completed: false, text: 'foo', id: 4 })
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const todoRepository = mock<TodoRepository>()
  const runner = mock<BaseRunner>()

  when(stateManager.state).thenReturn({ todos: [], errors: [], user: null })
  return {
    stateManager,
    createTodoCmd: new CreateTodoCmd(
      instance(runner),
      instance(stateManager),
      instance(todoRepository)
    )
  }
}
