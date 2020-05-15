/**
 * @desc 公共模块
 */
export default [
  {
    path: '/helper',
    name: 'helper',
    component: () => import(/* webpackChunkName:"views/helper" */ '@/views/helper/index.vue')
  }
]
