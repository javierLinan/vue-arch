import { Subject } from '@/domain/observer/subject'
import { State } from './state'

export interface StateManager extends Subject {
  state: State
  patch(state: Partial<State>): void
}
