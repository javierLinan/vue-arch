<template>
  <ul>
    <li
      v-for="todo in todos"
      :key="todo.id"
      :class="{ completed: todo.completed }"
      @click="() => completeTodo(todo.id)"
    >
      {{ todo.text }} - {{ todo.description }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TYPES } from '@/types'
import { Inject } from '@/domain/di/inject'
import { Id } from '@/domain/models/todo/id'
import { GetTodosQry } from '@/application/queries/get-todos-qry'
import { CompleteTodoCmd } from '@/application/commands/complete-todo/complete-todo-cmd'
import { StateManager } from '@/application/state-manager/state-manager'

@Component({ name: 'TodoList' })
export default class TodoList extends Vue {
  @Inject(TYPES.QRY_GET_TODOS)
  readonly getTodosQry!: GetTodosQry

  @Inject(TYPES.CMD_COMPLETE_TODO)
  readonly completeTodoCmd!: CompleteTodoCmd

  @Inject(TYPES.STATE_MANAGER)
  readonly stateManager!: StateManager

  async mounted() {
    await this.getTodosQry.execute()
  }

  async completeTodo(id: Id) {
    await this.completeTodoCmd.execute(id)
  }

  get todos() {
    return this.stateManager.state.todos
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
