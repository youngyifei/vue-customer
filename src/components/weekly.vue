<template>
  <div class="background">
    <Search @change="show">
        <mt-cell v-for="item in filterResult" :title="item.UserName" :label="item.DeparmentName" :to="'/weeklyDetail/'+item.UserId" is-link></mt-cell>
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
    computed: {
      filterResult () {
        let list = this.result.filter(this.userNameFilter)
        if (list.length === 0) {
          list = this.result
        }
        return list
      }
    },
    data () {
      return {
        value: '',
        hasLoad: false,
        result: []
      }
    },
    methods: {
      userNameFilter (value) {
        return value !== undefined && value.UserName.indexOf(this.value) > -1
      },
      show (value) {
        this.value = value
        if (!this.hasLoad) {
          this.hasLoad = true
          this.$http.get('/api/WUApi/GetUnderlingUser?wxId=' + this.wxId)
          .then(response => {
            if (response.status === 200) {
              this.result = response.data
            }
          })
          .catch(response => {
          })
        }
      }
    }
  }
</script>