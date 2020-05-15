/**
 * 登录
 */
import Vue from 'vue'

const state = {
  // 用户基本信息
  data: null,
  // 是否已登陆
  isLogin: false
}
const getters = {
  getUserInfo: state => {
    return { ...state.data }
  },
  getLoginStatus: state => {
    return state.isLogin
  }
}
const actions = {
  exitAxtion ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('HANDLE_EXIT')
      resolve()
    })
  },
  loginAction ({ commit, state }, { name, pswd }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$api['login/doLogin']({ data: { name, pswd }, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } })
        .then(resData => {
          commit('UPDATE_DATA', resData.data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
const UPDATE_DATA = 'UPDATE_DATA'
const HANDLE_EXIT = 'HANDLE_EXIT'
const mutations = {
  // 更新用户信息
  [UPDATE_DATA] (state, data) {
    state.data = data
    state.isLogin = true
  },
  [HANDLE_EXIT] (state) {
    localStorage.clear()
    state.data = null
    state.isLogin = false
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
