/**
 * @desc 公共模块
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName:"views/login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'mainframe',
    component: () =>
      import(/* webpackChunkName:"views/frame" */ '@/views/frame/index.vue'),
    children: [
      {
        path: '/api',
        component: () =>
          import(/* webpackChunkName:"views/api" */ '@/views/api/index.vue')
      },
      {
        path: '/system',
        component: () =>
          import(
            /* webpackChunkName:"views/system" */ '@/views/system/index.vue'
          )
      }
    ]
  },
  {
    path: '*', // 404 页面
    component: () =>
      import(/* webpackChunkName:"views/404" */ '@/views/error-page/404.vue')
  },
  {
    path: '/helper',
    name: 'helper',
    component: () =>
      import(/* webpackChunkName:"views/helper" */ '@/views/helper/index.vue')
  }
]
