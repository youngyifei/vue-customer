import Vue from 'vue'
import VueRouter from 'vue-router'
import Weekly from './components/weekly'
import Index from './components/index'
Vue.use(VueRouter)
const routes = [
  { path: '/index', title: '客户系统', component: Index },
  { path: '/weekly', title: '我的周报', component: Weekly },
  { path: '*', redirect: '/index' }
]
const router = new VueRouter({
  routes
})
export default router
