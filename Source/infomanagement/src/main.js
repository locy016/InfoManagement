import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils.js'
import './plugins/element.js'
import './assets/global.css'

Vue.config.productionTip = false

const { ipcRenderer } = window.require('electron')
Vue.prototype.ipcRenderer = ipcRenderer

router.beforeEach((to, form, next) => {
  if (to.matched.auth) {
    if (JSON.parse(localStorage.getItem('studentAuth'))) {
      next()
    } else {
      next({ path: '/sign-in', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
