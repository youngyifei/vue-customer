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
/* eslint-disable no-new */
MintUI.Indicator.open({
  text: '正在初始化数据...',
  spinnerType: 'fading-circle'
})
function start () {
  function getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURI(r[2])
    } else {
      return null
    }
  }
  function errorTodo () {
    MintUI.Indicator.close()
    MintUI.MessageBox.confirm('加载失败，是否重新加载').then(action => {
      start()
    })
  }
  let wxid = getQueryString('wxid')
  axios.get('/api/WUApi/GetUserInfoByWxId?wxId=' + wxid)
  .then(response => {
    console.log(response)
    if (response.status === 200) {
      let roleId = response.data.RoleName
      let userName = response.data.userName
      let workNo = response.data.WorkNo
      let img = response.data.Img
      let deparmentName = response.data.DeparmentName
      MintUI.Indicator.close()
      Vue.mixin({
        data () {
          return {
            axios: axios,
            wxId: wxid,
            roleId: roleId,
            userName: userName,
            workNo: workNo,
            userImg: img,
            deparmentName: deparmentName
          }
        }
      })
      new Vue({
        router,
        ...App
      }).$mount('#app')
    } else {
      errorTodo()
    }
  })
  .catch(response => {
    errorTodo()
  })
}
start()
