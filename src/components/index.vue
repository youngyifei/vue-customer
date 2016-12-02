<template>
  <div class='index'>
    <img src="../assets/logo.png" style="bord">
    <hello></hello>
  </div>
</template>

<script>
  import Hello from './Hello'
  export default {
    name: 'index',
    components: {
      Hello
    }
  }
</script>
<style scoped>
  
.index{
  text-align: center;
}
</style>