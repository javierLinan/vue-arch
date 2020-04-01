import { Link } from './link'
import { Injectable } from '@/domain/di/injectable'

@Injectable()
export class EmptyLink implements Link {
  setNext(): Link {
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async next() {}
}
