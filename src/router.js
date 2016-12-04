import Vue from 'vue'
import VueRouter from 'vue-router'
import Weekly from './components/weekly'
import Index from './components/index'
import WeeklyDetail from './components/weekly/weeklyDetail'
Vue.use(VueRouter)
const routes = [
  { path: '/index', title: '客户系统', component: Index },
  { path: '/weekly', title: '我的周报', component: Weekly },
  { path: '/weeklyDetail/:id', title: '周报', component: WeeklyDetail },
  { path: '/weeklyDetail', title: '周报', component: WeeklyDetail },
  { path: '*', redirect: '/index' }
]
const router = new VueRouter({
  routes
})
export default router
