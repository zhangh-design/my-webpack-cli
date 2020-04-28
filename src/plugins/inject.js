/**
 * @desc Vue 原型注入自定义属性
 */
import { api } from './api.js'

export default {
  install: (Vue, options = {}) => {
    Object.defineProperty(Vue.prototype, '$api', { value: api })
  }
}
