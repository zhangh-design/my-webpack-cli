/**
 * @desc axios-api-query ajax请求拦截器
 */
import Vue from 'vue'
import NProgress from 'nprogress'
import { hasIn } from 'lodash-es'

// 请求开始发送
const apiRequestStartHandler = function () {
  NProgress.start()
}

// 请求结束
const apiRequestEndHandler = function () {
  NProgress.done()
}

// 请求出现拦截器无法捕获的异常 例如：timeout请求超时
const apiRequestInterceptErrorHandler = function (message) {
  if (hasIn(Vue.prototype, '$message')) {
    Vue.prototype.$message({ showClose: true, message: '错误：' + message, type: 'error' })
  }
  NProgress.done()
}

export { apiRequestStartHandler, apiRequestEndHandler, apiRequestInterceptErrorHandler }
