export default [
  {
    name: 'doLogin',
    method: 'GET',
    desc: '用户登录',
    path: '/api/login',
    mockPath: '/api/login',
    params: { name: '', pswd: '' },
    validator: {
      name: { required: true, type: String, sqlXss: true, not: '', msg: '用户名不能为空!' },
      pswd: { required: true, type: String, sqlXss: true, not: '', msg: '密码不能为空!' }
    }
  }
]
