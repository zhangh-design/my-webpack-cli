/**
 * @desc 路由拦截器
 */
import NProgress from 'nprogress'

/**
 * @desc 全局前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const routerBeforeEachFunc = function (to, from, next) {
  NProgress.start()
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
const routerOnReady = function () {
}

export { routerBeforeEachFunc, routerAfterEachFunc, routerOnReady }
