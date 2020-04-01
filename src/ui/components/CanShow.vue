<template>
  <div>
    <slot v-if="canShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Inject } from '@/domain/di/inject'
import { TYPES } from '@/types'
import { AccessControl } from '@/domain/access-control/access-control'
import { UserRepository } from '@/domain/models/user/user-repository'

@Component({ name: 'CanShow' })
export default class CanShow extends Vue {
  @Prop({ type: String, default: '' })
  perform

  @Prop({ type: Object, default: null })
  data

  @Inject(TYPES.REPOSITORY_USER)
  userRepository!: UserRepository

  @Inject(TYPES.ACCESS_CONTROL)
  accessControl!: AccessControl

  get canShow() {
    const user = this.userRepository.getSelf()
    return this.accessControl.checkAction(user, this.perform, this.data)
  }
}
</script>

<style scoped></style>
