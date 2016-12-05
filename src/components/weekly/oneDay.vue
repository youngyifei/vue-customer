<template>
  <div class="oneday">
    <div class="oneday-title" :style="{ 'background-color': tColor[colorIndex]}" :class="{ 'show': tShow , 'only-title': !tShow }" @click="toggle">{{dateStr}}</div>
    <transition name="fade">
  	  <div class="oneday-body" v-show="show"  :style="{ 'border-color': tColor[colorIndex]}" >
        <mt-cell :title="'公司处理事务'">
          <mt-switch v-model="isCompanyTransaction" ></mt-switch>
        </mt-cell>
        <a class="mint-cell" v-show="isCompanyTransaction" >
          <div class="mint-cell-wrapper">
            <textarea label="公司处理事务" placeholder="公司处理事务" v-model="companyTransaction" rows="2"></textarea>
          </div>
        </a>
        <mt-cell :title="'拜访客户'">
          <mt-switch v-model="isVisitCustomer"></mt-switch>
        </mt-cell>
        <mt-cell :title="'其它'">
          <mt-switch v-model="isOther"></mt-switch>
       </mt-cell>
       <a class="mint-cell" v-show="isOther" >
          <div class="mint-cell-wrapper">
            <textarea label="其它" placeholder="其它" v-model="other" rows="2"></textarea>
          </div>
        </a>
       <div v-show="isVisitCustomer" class="oneday-value"  >
          <div v-show="isVisitCustomer">
            拜访客户
          </div>
       </div>
       <p v-show="false">{{WorkContent}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'OneDay',
    props: ['dateStr', 'colorIndex'],
    computed: {
      WorkContent () {
        let type = []
        if (this.isCompanyTransaction) {
          type.push(1)
        }
        if (this.isVisitCustomer) {
          type.push(2)
        }
        if (this.isOther) {
          type.push(3)
        }
        let OneDayContent = {
          WeeklyId: '',
          Date: this.dateStr,
          WorkType: type.toString(),
          WorkContent: this.companyTransaction,
          Other: this.other
        }
        this.$emit('change', this.colorIndex, OneDayContent)
        return OneDayContent
      }
    },
    data () {
      return {
        isCompanyTransaction: false,
        isVisitCustomer: false,
        isOther: false,
        companyTransaction: '',
        other: '',
        tColor: ['#D9D6CF', '#D5D9BA', '#D9D6CF', '#D5D9BA', '#D9D6CF'],
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
  textarea{
    border: 0px;
    width: 100%;
    min-height: 40px;
    font-size: inherit;
    margin-top: 5px;
  }
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
		-webkit-box-shadow: 0 1px 4px rgb(173,173,173);
	}
</style>