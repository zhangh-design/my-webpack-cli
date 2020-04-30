/**
 * 精简 vuex 的 modules 引入
 * 动态载入各个模型
 */
import { camelCase } from 'lodash-es'
const requireModule = require.context('./module', false, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  // Don't register this file as a Vuex module
  if (fileName === './index.js') return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
  modules[moduleName] = {
    ...requireModule(fileName)
  }.default
})
export default modules
