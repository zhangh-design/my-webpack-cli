/**
 * @desc 路由拦截器
 */
import store from '@/store/index.js'
import NProgress from 'nprogress'
const fastConfig = require('../../../fast.config.js')
/**
 * @desc 全局前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const routerBeforeEachFunc = function (to, from, next) {
  NProgress.start()
  // 白名单直接跳转
  if (fastConfig.routerWhiteList.includes(to.name)) {
    NProgress.done()
    return next()
  }
  // 未登录状态且要跳转的页面不是登录页
  if (!store.getters['login/getLoginStatus'] && to.name !== 'login') {
    NProgress.done()
    return next({ path: '/login' })
  }
  // 已登录且要跳转的页面是 to 登录页 from 主页面
  if (store.getters['login/getLoginStatus'] && to.name === 'login') {
    NProgress.done()
    return next({ path: '/' })
  }
  setTimeout(() => {
    next()
  }, 1000)
}

/**
 * @desc 全局后置路由钩子
 * @param {*} to
 * @param {*} from
 * @example window滚动条返回顶部、路由加载完成控制全局进度条
 */
const routerAfterEachFunc = function (to, from) {
  NProgress.done()
  // 进入新路由后，重置滚动条到顶部
  // 如果路由基本配置中已配置 'scrollBehavior' 则可以隐藏下面的代码
  /* if (document.body.scrollHeight > window.innerHeight) {
    window.scrollTo(0, 0)
  } */
}

/**
 * @desc 浏览器刷新
 * @example 在刷新时会执行到 router.onReady 可以处理把数据放入 localstorage 或 cookie 中的操作
 */
const routerOnReady = function () {}

export { routerBeforeEachFunc, routerAfterEachFunc, routerOnReady }
