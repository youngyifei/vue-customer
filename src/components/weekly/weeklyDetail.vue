<template>
  <div>
    <a>2016年12月第1周周报</a><span>{{$route.params.id}}</span>
    <OneDay v-for="(item, index) in dateItem" :dateStr="item" :colorIndex="index" ></OneDay>
  </div>
</template>
<script>
  import OneDay from './oneDay'
  export default {
    name: 'weekly-detail',
    components: {
      OneDay
    },
    data () {
      return {
        dateItem: ['2016-12-05', '2016-12-06', '2016-12-07', '2016-12-08', '2016-12-09']
      }
    }
  }
</script>