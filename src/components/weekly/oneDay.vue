<template>
  <div class="oneday">
    <div class="oneday-title" :style="{ 'background-color': tColor[colorIndex]}" :class="{ 'show': tShow , 'only-title': !tShow }" @click="toggle">{{dateStr}}</div>
    <transition name="fade">
  	  <div class="oneday-body" v-show="show"  :style="{ 'border-color': tColor[colorIndex]}" >
        <mt-cell :title="'公司处理事务'">
          <mt-switch v-model="isCompanyTransaction" ></mt-switch>
        </mt-cell>
        <mt-cell :title="'拜访客户'">
          <mt-switch v-model="isVisitCustomer"></mt-switch>
        </mt-cell>
        <mt-cell :title="'其它'">
          <mt-switch v-model="isOther"></mt-switch>
       </mt-cell>
       <div v-show="isOther||isCompanyTransaction||isVisitCustomer" class="oneday-value"  >
          <div v-show="isCompanyTransaction">
            <mt-field label="公司处理事务" placeholder="公司处理事务" type="textarea" rows="3"></mt-field>
          </div>
          <div v-show="isVisitCustomer">
            拜访客户
          </div>
          <div v-show="isOther">
            <mt-field label="其它" placeholder="其它" type="textarea" rows="4"></mt-field>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'OneDay',
    props: ['dateStr', 'colorIndex'],
    data () {
      return {
        isCompanyTransaction: false,
        isVisitCustomer: false,
        isOther: false,
        dayValue: {
          companyTransaction: '',
          other: ''
        },
        tColor: ['#26c6da', '#42a5f5', '#f06292', '#ba68c8', '#9575cd'],
        show: true,
        tShow: true
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      }
    },
    watch: {
      show () {
        if (!this.show) {
          setTimeout(() => {
            this.tShow = this.show
          }, 500)
        } else {
          this.tShow = this.show
        }
      }
    }
  }
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		  opacity: 0
	}
	.oneday{
		margin:5px 0px;
	}
	.show{
		border-radius: 5px 5px 0px 0px;
	}
	.only-title{
		border-radius: 5px 5px 5px 5px;
	}
	.oneday-body{
		border-color: #d0cfcf;
		border-style: solid;
		border-width: 0px 1px 1px 1px;
	}
	.oneday-title{
		background-color: #d0cfcf;
		padding: 10px 10px;
	}
	.oneday-value{
		margin: 5px 5px;
		padding: 5px;
		-webkit-box-shadow: 0 1px 4px rgb(59,59,59);
	}
</style>