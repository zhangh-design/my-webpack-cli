import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import inject from '@plugins/inject.js'
import { Message, Input, Button, Container, Header, Aside, Main, Footer } from 'element-ui'
import { FastTextInput, FastButton, FastPanel, FastBorderLayout } from 'fast-element-ui'
import 'fast-element-ui/lib/theme-default/index.css'
import '@assets/css/main.css'
import a from './views/a.js'

console.log('aaaaaa ', a)
Vue.use(inject)
Vue.use(FastTextInput, Input)
Vue.use(FastButton, Button)
Vue.use(FastPanel, [Container, Header, Aside, Main, Footer, FastBorderLayout])
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
