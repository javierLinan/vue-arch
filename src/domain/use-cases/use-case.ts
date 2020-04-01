import { Runner } from '@/domain/runner/runners/runner'

export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean
  abstract async internalExecute(param: Param): Promise<Result>
  protected abstract runner: Runner

  async execute(param: Param): Promise<Result> {
    return (await this.runner.run(this, param)) as Promise<Result>
  }
}
