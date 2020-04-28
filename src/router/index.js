/**
 * @desc vue Router 路由管理
 */
import Vue from 'vue'
import Router from 'vue-router'
import { ROUTER_DEFAULT_CONFIG } from '@/config/index.js'
import {
  routerBeforeEachFunc,
  routerAfterEachFunc,
  routerOnReady
} from '@/config/interceptors/router.js'

Vue.use(Router)

// 不需要按模块化划分的路由
const constRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:"views/login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'mainframe',
    component: () => import(/* webpackChunkName:"views/frame" */ '@/views/frame/index.vue'),
    children: []
  },
  {
    path: '*', // 404 页面
    component: () => import(/* webpackChunkName:"views/404" */ '@/views/error-page/404.vue')
  }
]

// 初始化 router 实例
const instance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes: constRouterMap
})
// 设置拦截器
instance.onReady(routerOnReady)
instance.beforeEach(routerBeforeEachFunc)
instance.afterEach(routerAfterEachFunc)

export default instance
