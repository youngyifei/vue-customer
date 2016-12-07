<template>
	<div class="wu-paper">
		<div class="paper-toolbar" v-if="hasTool">{{title}}</div>
		<div class="paper-content">
			<slot>
			
			</slot>
		</div>
	</div>
</template>
<script>
  export default {
    name: 'paper',
    props: {
      hasTool: {
        type: Boolean,
        default: false
      },
      title: {
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
.wu-paper {
    transition: all .45s cubic-bezier(.23,1,.32,1);
    color: rgba(0,0,0,.87);
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647); 
    border-radius: 2px;
    margin:24px 0px;
}
.paper-toolbar {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    background-color: #e8e8e8;
    cursor: pointer;
}
.paper-content{
	-webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
    padding: 10px 20px 20px 24px;
}
</style>