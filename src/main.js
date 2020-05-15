import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import inject from '@plugins/inject.js'
import { Message, MessageBox, Input, Button, Container, Header, Aside, Main, Footer, Dropdown } from 'element-ui'
import { FastTextInput, FastButton, FastPanel, FastBorderLayout, FastDoubleWingLayout } from 'fast-element-ui'
import 'fast-element-ui/lib/theme-default/index.css'
import '@assets/css/main.css'
import Vfocus from '@/directives/v-f-focus/index.js'

Vue.use(inject)
Vue.use(FastTextInput, Input)
Vue.use(FastButton, Button)
Vue.use(FastPanel, [Container, Header, Aside, Main, Footer, FastBorderLayout])
Vue.use(FastDoubleWingLayout)
Vue.use(Dropdown)
Vue.use(Vfocus)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
