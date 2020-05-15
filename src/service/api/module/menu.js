/**
 * @desc 公共接口
 */
export default [
  {
    name: 'getMenu',
    method: 'GET',
    desc: '菜单',
    path: '/api/{userId}/menu',
    mockPath: '/api/{userId}/menu',
    restful: { userId: 1 },
    restfulValidator: {
      userId: { not: '', msg: '用户参数不能为空' }
    }
  }
]
