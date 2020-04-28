/**
 * 登录
 */
import Vue from 'vue'

const state = {
  // 用户基本信息
  data: {
    name: '',
    coder: '',
    role: '',
    dept: ''
  },
  // 是否已登陆
  isLogin: false,
  // 系统用户访问令牌
  token: ''
}
const getters = {}
const actions = {
  exitAxtion ({ commit, state }) {},
  loginAction ({ commit, state }, { name, pswd }) {
    console.info('bbbbbbbbbb', name, pswd, Vue.prototype.$api)
    Vue.prototype.$api['login/doLogin']({ params: { name, pswd } })
      .then(resData => {
        console.log('resData', resData)
      }).catch((error) => { console.info('111111111111111111', error) })
  }
}
const mutations = {}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
