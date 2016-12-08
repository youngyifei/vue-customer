<template>
  <div>
    <div v-if="pre">
	  <label>{{title}}</label>
      <pre class="wu-text-pre">{{value}}</pre>
    </div>
    <p v-else class="show-p">
      <span>{{title}}</span><span>{{value}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'wu-text',
    props: {
      pre: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style>
  .wu-text-pre{
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 2px 2px 2px 6px;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
  .show-p{
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
</style>