import { UseCase } from '@/domain/use-cases/use-case'
import { Link } from '@/domain/runner/links/link'

export abstract class Runner {
  abstract chain: Link

  async run(useCase: UseCase<unknown, unknown>, param: unknown): Promise<unknown> {
    const context = { useCase, result: undefined, param }
    await this.chain.next(context)
    return context.result
  }
}
