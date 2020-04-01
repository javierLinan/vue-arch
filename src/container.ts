import { interfaces } from 'inversify'
import { container } from 'inversify-props'
import Vue, { VueConstructor } from 'vue'
import { TYPES } from './types'
import { Application } from './ui/application'
import { StateManager } from './application/state-manager/state-manager'
import { CreateTodoCmd } from './application/commands/create-todo/create-todo-cmd'
import { GetTodosQry } from './application/queries/get-todos-qry'
import { CompleteTodoCmd } from './application/commands/complete-todo/complete-todo-cmd'
import { RoleBasedAccessControl } from './application/role-based-access-control/role-based-access-control'
import { GetRouteGrantedQry } from './application/queries/routes/get-route-granted-qry'
import { Logger } from './domain/use-cases/logger'
import { BaseRunner } from './domain/runner/runners/base-runner'
import { ExecutorLink } from './domain/runner/links/executor-link'
import { LoggerLink } from './domain/runner/links/logger-link'
import { ValidatorLink } from './domain/runner/links/validator-link'
import { TodoRepository } from './domain/models/todo/todo-repository'
import { UserRepository } from './domain/models/user/user-repository'
import { AccessControl } from './domain/access-control/access-control'
import { FormFactory } from './domain/forms/form-factory'
import { CreateTodo } from './domain/models/todo/create-todo'
import { ValidationErrorMapper } from './domain/validation/validation-error-mapper'
import { VueStateManager } from './infrastructure/vue-state-manager'
import { ConsoleLogger } from './infrastructure/console-logger'
import { ClassValidator } from './infrastructure/class-validator/class-validator'
import { TodoLocalRepository } from './infrastructure/todo-local-repository'
import { VueAppRouter } from './infrastructure/vue-app-router'
import { UserFakeRepository } from './infrastructure/user-fake-repository'
import { ClassValidationErrorMapper } from './infrastructure/class-validator/class-validation-error-mapper'

export class Container {
  private static _instance: Container | null = null
  private readonly _container: interfaces.Container

  private constructor() {
    container.bind<Window>(TYPES.WINDOW).toConstantValue(window)
    container.bind<string>(TYPES.LOGIN_PAGE_NAME).toConstantValue('login-page')
    container.bind<VueConstructor>(TYPES.VUE).toConstantValue(Vue)
    container
      .bind<Logger>(TYPES.LOGGER)
      .to(ConsoleLogger)
      .inSingletonScope()
    container
      .bind<ClassValidator>(TYPES.VALIDATOR)
      .to(ClassValidator)
      .inSingletonScope()
    container
      .bind<StateManager>(TYPES.STATE_MANAGER)
      .to(VueStateManager)
      .inSingletonScope()
    container
      .bind<FormFactory>(TYPES.FORM_FACTORY)
      .to(FormFactory)
      .inSingletonScope()
    container
      .bind<Application>(TYPES.APPLICATION)
      .to(Application)
      .inSingletonScope()
    container
      .bind<AccessControl>(TYPES.ACCESS_CONTROL)
      .to(RoleBasedAccessControl)
      .inSingletonScope()
    container
      .bind<VueAppRouter>(TYPES.APP_ROUTER)
      .to(VueAppRouter)
      .inSingletonScope()
    container
      .bind<CreateTodoCmd>(TYPES.CMD_CREATE_TODO)
      .to(CreateTodoCmd)
      .inSingletonScope()
    container
      .bind<CompleteTodoCmd>(TYPES.CMD_COMPLETE_TODO)
      .to(CompleteTodoCmd)
      .inSingletonScope()
    container
      .bind<GetTodosQry>(TYPES.QRY_GET_TODOS)
      .to(GetTodosQry)
      .inSingletonScope()
    container
      .bind<GetRouteGrantedQry>(TYPES.QRY_GET_ROUTE_GRANTED)
      .to(GetRouteGrantedQry)
      .inSingletonScope()
    container
      .bind<BaseRunner>(TYPES.RUNNER_BASE)
      .to(BaseRunner)
      .inSingletonScope()
    container
      .bind<ExecutorLink>(TYPES.LINK_EXECUTOR)
      .to(ExecutorLink)
      .inSingletonScope()
    container
      .bind<LoggerLink>(TYPES.LINK_LOGGER)
      .to(LoggerLink)
      .inSingletonScope()
    container
      .bind<ValidatorLink>(TYPES.LINK_VALIDATOR)
      .to(ValidatorLink)
      .inSingletonScope()
    container
      .bind<TodoRepository>(TYPES.REPOSITORY_TODO)
      .to(TodoLocalRepository)
      .inSingletonScope()
    container
      .bind<UserRepository>(TYPES.REPOSITORY_USER)
      .to(UserFakeRepository)
      .inSingletonScope()
    container
      .bind<CreateTodo>(TYPES.MODEL_CREATE_TODO)
      .to(CreateTodo)
      .inSingletonScope()
    container
      .bind<ValidationErrorMapper>(TYPES.MAPPER_VALIDATION_ERROR)
      .to(ClassValidationErrorMapper)
      .inSingletonScope()

    this._container = container
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container()
    }

    return this._instance._container
  }
}
