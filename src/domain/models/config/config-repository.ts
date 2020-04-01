import { Config } from './config'

export interface ConfigRepository {
  findSelf(): Config
}
