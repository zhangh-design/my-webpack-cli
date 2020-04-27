/**
 * @desc 项目配置
 */

// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash', // 路由模式 hash、history
  transitionOnLoad: true,
  scrollBehavior: () => ({ y: 0 })
}
