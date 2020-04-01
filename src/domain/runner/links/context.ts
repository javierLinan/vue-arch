import { UseCase } from '@/domain/use-cases/use-case'

export interface Context {
  result: unknown
  param: unknown
  useCase: UseCase<unknown, unknown>
}
