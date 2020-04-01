import { VueConstructor } from 'vue'
import { TYPES } from '@/types'
import { Injectable } from '@/domain/di/injectable'
import { Inject } from '@/domain/di/inject'
import { VueAppRouter } from '@/infrastructure/vue-app-router'

@Injectable()
export class Application {
  constructor(
    @Inject(TYPES.VUE) private readonly vue: VueConstructor,
    @Inject(TYPES.APP_ROUTER) private readonly appRouter: VueAppRouter
  ) {}

  create(app: VueConstructor) {
    this.vue.config.productionTip = false

    return new this.vue({
      router: this.appRouter.router,
      render: create => create(app)
    }).$mount('#app')
  }
}
