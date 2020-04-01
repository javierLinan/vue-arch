import { Id } from './id'

export interface Todo {
  id: Id
  text: string
  description: string
  completed: boolean
}
