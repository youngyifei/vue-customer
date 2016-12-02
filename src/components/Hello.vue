<template>
  <div class="hello">
    <h2>周报</h2>
    <ul>
      <li><a href="/#/weekly" >周报查询</a></li>
      <li><a href="/#/weekly" >新增周报</a></li>
      <br>
      <br>
      <li><a href="/#/weekly" >编辑本周周报</a></li>
    </ul>
    <h2>客户</h2>
    <ul>
      <li><a href="/#/weekly" >客户查询</a></li>
      <li><a href="/#/weekly" >新增客户</a></li>
      <li><a href="/#/weekly" >客户编辑</a></li>
    </ul>
    <h2>报单</h2>
    <ul>
      <li><a href="/#/weekly" >报单查询</a></li>
      <li><a href="/#/weekly" >新增报单</a></li>
      <li><a href="/#/weekly" >报单编辑</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '欢迎使用客户系统！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
