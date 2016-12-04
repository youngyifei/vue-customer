<template>
  <div class="background">
    <Search @change="show">
        <mt-cell v-for="item in result" :title="item.title" :label="item.label" :to="'/weeklyDetail/'+item.id" is-link></mt-cell>
    </Search>
  </div>
</template>

<script>
  import Search from './search'
  export default {
    name: 'weekly',
    components: {
      Search
    },
    data () {
      return {
        value: '',
        result: [
          {title: '2016年11月第1周周报', label: '个人啊实打实大师打算打算大叔大婶打算', id: '1'},
          {title: '2016年11月第1周周报', label: '个人', id: '2'},
          {title: '2016年11月第1周周报', label: '个人', id: '3'},
          {title: '2016年11月第1周周报', label: '个人', id: '4'},
          {title: '2016年11月第1周周报', label: '个人', id: '5'}
        ]
      }
    },
    methods: {
      show (value) {
        this.value = value
        console.log(this.value)
      }
    }
  }
</script>