<template>
  <div class="background">
    <mt-search v-model="value" class="search">
      <div style="padding-top:0px;">
        <mt-cell v-for="item in result" :title="item.title" :label="item.label" is-link></mt-cell>
      </div>
    </mt-search>
  </div>
</template>

<script>
  export default {
    name: 'weekly',
    data () {
      return {
        value: '',
        result: [
          {title: '2016年11月第1周周报', label: '个人啊实打实大师打算打算大叔大婶打算'},
          {title: '2016年11月第1周周报', label: '个人'},
          {title: '2016年11月第1周周报', label: '个人'},
          {title: '2016年11月第1周周报', label: '个人'},
          {title: '2016年11月第1周周报', label: '个人'}
        ]
      }
    }
  }
</script>
<style scoped>
.background{
	position: relative;
}
.mint-search{
	height: calc(100vh - 66px);
}
.mint-search-list{
	padding-top: 50px !important;
}
</style>