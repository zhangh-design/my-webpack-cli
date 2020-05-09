import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import inject from '@plugins/inject.js'
import { Button, Message, Container, Header, Aside, Main, Footer } from 'element-ui'
import { FastBorderLayout, FastPanel } from 'fast-element-ui'
import 'fast-element-ui/lib/theme-default/index.css'
import '@assets/css/main.css'

Vue.use(inject)
// fast-element-ui
Vue.use(FastBorderLayout)
Vue.use(FastPanel)
// element-ui
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
