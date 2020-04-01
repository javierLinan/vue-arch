<template>
  <div>
    <form @submit="event => event.preventDefault()">
      <app-input :value="form.data.text" @input="updateTodo({ text: $event })">Todo</app-input>
      <app-input :value="form.data.description" @input="updateTodo({ description: $event })"
        >Description</app-input
      >
      <app-button @clicked="createTodo">Crear</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TYPES } from '@/types'
import AppInput from '@/ui/components/AppInput.vue'
import AppButton from '@/ui/components/AppButton.vue'
import { Inject } from '@/domain/di/inject'
import { Form } from '@/domain/forms/form'
import { CreateTodo as CreateTodoModel } from '@/domain/models/todo/create-todo'
import { CreateTodoCmd } from '@/application/commands/create-todo/create-todo-cmd'
import { FormFactory } from '@/domain/forms/form-factory'

@Component({ name: 'CreateTodo', components: { AppButton, AppInput } })
export default class CreateTodo extends Vue {
  @Inject(TYPES.CMD_CREATE_TODO)
  createTodoCmd!: CreateTodoCmd

  @Inject(TYPES.MODEL_CREATE_TODO)
  createTodoModel!: CreateTodoModel

  @Inject(TYPES.FORM_FACTORY)
  formFactory!: FormFactory

  form: Form<CreateTodoModel> = this.formFactory.createForm(this.createTodoModel)

  async createTodo() {
    await this.createTodoCmd.execute(this.form)
    this.form.clear()
  }

  async updateTodo(partial: Partial<CreateTodoModel>) {
    await this.form.update(partial)
  }
}
</script>
