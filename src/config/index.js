/**
 * @desc 项目配置
 */

// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash', // 路由模式 hash、history
  transitionOnLoad: true,
  scrollBehavior: () => ({ y: 0 })
}
// api 接口模型配置参数
export const USER_API_CONFIG = {
  mockBasePath: 'https://yapi.tianli.shop/mock/438/',
  mock: true,
  console_request_enable: true,
  console_response_enable: true
}
// axios实例配置参数
export const USER_AXIOS_CONFIG = {
  baseURL: 'http://www.xxxx.com/',
  timeout: 30000
}
