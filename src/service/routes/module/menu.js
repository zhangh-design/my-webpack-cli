export default [
  {
    path: '/api',
    name: 'api',
    meta: { title: '接口' },
    component: () => import(/* webpackChunkName:"views/api" */ '@/views/api/index.vue')
  }
]
