<template>
  <div id="app">
    <div id="app-bar" style="z-index:20;">
      <mt-header title="大客户系统" style="height:50px;">
        <mt-button icon="more" slot="right" @click="popupTaggle" >菜单</mt-button>
        <router-link to="/" slot="left">
          <mt-button icon="back" >返回</mt-button>
        </router-link>
      </mt-header>
      <mt-popup v-model="popupVisible" position="right" style="height:100%;width:200px;">
        <div style="height:100%;">
          <mt-cell title="我的报单" href="/#/" is-link></mt-cell>
          <mt-cell title="我的客户" href="/#/" is-link></mt-cell>
          <mt-cell title="我的周报" href="/#/weekly" is-link></mt-cell>
          <mt-cell title="我的信息" href="/#/"  is-link></mt-cell>
        </div>
      </mt-popup>
    </div>
    <div style="padding:50px 0px 0px 0px;width:100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    data () {
      return {
        bottomNav: 'movies',
        bottomNavColor: 'movies',
        popupVisible: false,
        data: {
          token: '74E56A42-4786-4F86-87FC-7685294F34BC',
          workCode: 'WA01658',
          key: ''}
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      handleClose () {
      },
      popupTaggle () {
        this.popupVisible = !this.popupVisible
        this.$http.get('/api/WUApi/GetRoleList')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  #app-bar{
    position: fixed;
    width: 100%;
    top:0px;
    left:0px;
    transition: all .45s cubic-bezier(.23,1,.32,1);
  }
  #app-nav{
    position: fixed;
    width: 100%;
    bottom:0px;
    left:0px;
    transition: all .45s cubic-bezier(.23,1,.32,1);
  }
  .demo-flat-button {
    margin: 12px;
  }
  .mint-searchbar-inner{
    height: 17px !important;
  }
  .mint-searchbar input[type=search] {
    width: 100%;
  }
</style>
