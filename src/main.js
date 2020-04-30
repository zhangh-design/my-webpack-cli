import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import inject from '@plugins/inject.js'

import '@assets/css/main.css'

Vue.use(inject)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
