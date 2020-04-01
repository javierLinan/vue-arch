<template>
  <section>
    <p>This is home</p>
    <can-show perform="todo-list-page:visit">
      <router-link :to="{ name: 'todo-list-page' }">Go to TODO list page</router-link>
    </can-show>
    <can-show perform="login-page:visit">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </can-show>
    <can-show perform="logout">
      <router-link :to="{ name: 'logout' }">logout</router-link>
    </can-show>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CanShow from '@/ui/components/CanShow.vue'

@Component({ name: 'HomePage', components: { CanShow } })
export default class HomePage extends Vue {}
</script>
