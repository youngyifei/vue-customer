<template>
  <div class="background">
    <mt-search v-model="value" class="search">
      <div style="padding-top:0px;">
        <slot></slot>
      </div>
    </mt-search>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        value: ''
      }
    },
    watch: {
      value () {
        this.$emit('change', this.value)
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