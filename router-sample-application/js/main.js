import Auth from 'auth'
import Vue from 'vue'
import router from 'routes'

// ルーターのインスタンスをrootとなるVueインスタンスに渡す
const app = new Vue({
  data: {
    Auth: Auth
  },
  router: router
}).$mount('#app')