<template>
  <section>
    <todo-list />
    <create-todo />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoList from '@/ui/features/TodoList.vue'
import CreateTodo from '@/ui/features/CreateTodo.vue'

@Component({
  name: 'TodoListPage',
  components: {
    TodoList,
    CreateTodo
  }
})
export default class TodoListPage extends Vue {}
</script>
