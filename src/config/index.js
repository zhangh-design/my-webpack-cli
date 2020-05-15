/**
 * @desc 项目配置
 */
export const WINDOW_TITLE_UPDATE = true // 是否允许在路由 BeforeEach 钩子中修改标题
// CONST 默认参数配置 sep：命名空间分隔符
export const CONST_DEFAULT_CONFIG = {
  sep: '/'
}
// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash', // 路由模式 hash、history
  transitionOnLoad: true,
  scrollBehavior: () => ({ y: 0 })
}
// api 接口模型配置参数
export const USER_API_CONFIG = {
  mockBasePath: 'https://yapi.tianli.shop/mock/438/',
  mock: true, // mock 总开关
  console_request_enable: true,
  console_response_enable: true
}
// axios实例配置参数
export const USER_AXIOS_CONFIG = {
  baseURL: 'http://www.xxxx.com/',
  timeout: 30000
}
