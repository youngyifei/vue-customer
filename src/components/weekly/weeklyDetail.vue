<template>
  <div>
    <a>2016年12月第1周周报</a><span>{{$route.params.id}}</span>
    <OneDay v-for="(item, index) in dateItem" :dateStr="item" :colorIndex="index" @change="weeklyContentE" ></OneDay>
    <mt-button type="primary" size="large">保存周报</mt-button>
</div>
</template>
<script>
  import OneDay from './oneDay'
  import Calendar from '../date/calendar'
  export default {
    name: 'weekly-detail',
    components: {
      OneDay,
      Calendar
    },
    data () {
      return {
        dateItem: ['2016-12-05', '2016-12-06', '2016-12-07', '2016-12-08', '2016-12-09'],
        weeklyContent: [
          {}, {}, {}, {}, {}
        ]
      }
    },
    methods: {
      weeklyContentE (index, OneDayContent) {
        this.weeklyContent[index] = OneDayContent
      }
    }
  }
</script>