/**
 * 菜单
 */
import Vue from 'vue'

const state = {
  // 菜单
  menu: null
}
const getters = {
  getMenuInfo: state => {
    // return { ...state.menu }
    return [
      { name: '系统', code: 'system', id: 2 },
      { name: '接口', code: 'api', id: 1 }
    ]
  }
}
const actions = {
  getMenu ({ commit, state }) {
    const userId = this.getters['login/getUserInfo'].id
    return new Promise((resolve, reject) => {
      Vue.prototype.$api['menu/getMenu']({ restful: { userId } })
        .then(resData => {
          commit('UPDATE_MENU', resData.data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
const UPDATE_MENU = 'UPDATE_MENU'
const mutations = {
  [UPDATE_MENU] (state, data) {
    state.menu = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
