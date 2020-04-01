import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Injectable } from '@/domain/di/injectable'
import { Inject } from '@/domain/di/inject'
import { Router } from '@/domain/models/route/router'
import HomePage from '@/ui/views/HomePage.vue'
import LoginPage from '@/ui/views/LoginPage.vue'
import TodoListPage from '@/ui/views/TodoListPage.vue'
import { TYPES } from '@/types'
import { GetRouteGrantedQry } from '@/application/queries/routes/get-route-granted-qry'

Vue.use(VueRouter)

@Injectable()
export class VueAppRouter implements Router<VueRouter> {
  private _router: VueRouter

  get router(): VueRouter {
    return this._router
  }

  set router(value: VueRouter) {
    this._router = value
  }

  constructor(
    @Inject(TYPES.QRY_GET_ROUTE_GRANTED) protected readonly getRouteGrantedQry: GetRouteGrantedQry,
    @Inject(TYPES.LOGIN_PAGE_NAME) protected readonly loginPageName: string
  ) {
    const routes: RouteConfig[] = [
      {
        path: '/',
        name: 'home-page',
        component: HomePage
      },
      {
        path: '/todos',
        name: 'todo-list-page',
        component: TodoListPage
      },
      {
        path: '/login',
        name: this.loginPageName,
        component: LoginPage
      },
      {
        path: '*',
        redirect: '/'
      }
    ]

    this.router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
    this.router.beforeEach(async (to, _from, next) => {
      const { path, name, hash, query, params, fullPath, meta } = to
      const grantedRoute = await this.getRouteGrantedQry.execute({
        path,
        name,
        hash,
        query,
        params,
        fullPath,
        meta
      })

      if (grantedRoute.redirectTo) {
        next(grantedRoute.redirectTo)
      }

      next()
    })
  }
}
