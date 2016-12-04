import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import MintUI from 'mint-ui'
import axios from 'axios'
import router from './router'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)
Vue.use(MintUI)
axios.defaults.baseURL = 'http://127.0.0.1:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
Vue.mixin({
  data () {
    return {
      axios: axios
    }
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
