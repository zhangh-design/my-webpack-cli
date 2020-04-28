/**
 * vuex 状态管理插件
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 动态载入 module 模块
import modules from '@service/store/index.js'
// HTML5 的本地存储插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state,rootState }, address){
 *      //rootState.title
 *  }
 * }
 */
const state = {
  title: ''
}
export default new Vuex.Store({
  state,
  modules,
  strict: process.env.NODE_ENV !== 'production',
  // sessionStorage 只在当前窗口有效，关闭浏览器窗口缓存随即丢失
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
