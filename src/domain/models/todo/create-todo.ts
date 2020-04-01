import { IsNotEmpty, MinLength } from 'class-validator'
import { FormData } from '@/domain/forms/form-data'
import { Injectable } from '@/domain/di/injectable'

@Injectable()
export class CreateTodo implements FormData {
  constructor() {
    this.$clear()
  }

  @IsNotEmpty()
  text: string

  @IsNotEmpty()
  @MinLength(10)
  description: string

  $clear() {
    this.text = ''
    this.description = ''
  }

  $update(partial: Partial<{ text: string; description: string }>) {
    for (const key in partial) {
      this[key] = partial[key]
    }
  }
}
