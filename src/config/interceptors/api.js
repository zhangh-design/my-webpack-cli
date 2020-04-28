/**
 * @desc axios-api-query ajax请求拦截器
 */

// 请求开始发送
const apiRequestStartHandler = function () {}

// 请求结束
const apiRequestEndHandler = function () {}

// 请求出现拦截器无法捕获的异常 例如：timeout请求超时
const apiRequestInterceptErrorHandler = function (message) {}

export { apiRequestStartHandler, apiRequestEndHandler, apiRequestInterceptErrorHandler }
