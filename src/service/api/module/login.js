export default [
  {
    name: 'doLogin',
    method: 'POST',
    desc: '用户登录',
    path: '/api/login',
    mockPath: '/api/login',
    data: { name: '', pswd: '' },
    validator: {
      name: [
        { required: true, type: String, not: '', msg: '用户名不能为空!' },
        { sqlXss: true, msg: '用户名含有特殊字符!' }
      ],
      pswd: [
        {
          required: true,
          type: String,
          sqlXss: true,
          not: '',
          msg: '密码不能为空!'
        },
        { sqlXss: true, msg: '密码含有特殊字符!' }
      ]
    }
  }
]
